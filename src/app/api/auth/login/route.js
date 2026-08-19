import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { createUserSession } from '@/lib/session';
import { checkRateLimit, clearRateLimit, escapeRegex, getClientAddress, normalizeEmail } from '@/lib/authSecurity';

export async function POST(req) {
  try {
    await connectDB();
    const { email, name, password } = await req.json();
    const identifier = String(email || name || '').trim();

    if (!identifier || typeof password !== 'string') {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const rateLimitKey = `login:${getClientAddress(req)}:${normalizeEmail(identifier)}`;
    const rateLimit = checkRateLimit(rateLimitKey, { limit: 10, windowMs: 15 * 60 * 1000 });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { message: 'Too many sign-in attempts. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) } }
      );
    }

    const user = await User.findOne({
      $or: [
        { email: normalizeEmail(identifier) },
        { name: new RegExp(`^${escapeRegex(identifier)}$`, 'i') },
      ],
    });

    if (!user?.password) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isHashedPassword = user.password.startsWith('$2');
    const isPasswordValid = isHashedPassword
      ? await bcrypt.compare(password, user.password)
      : password === user.password;

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    if (!isHashedPassword) {
      user.password = await bcrypt.hash(password, 12);
      await user.save();
    }

    clearRateLimit(rateLimitKey);
    await createUserSession(user);

    return NextResponse.json({
      message: 'Logged in successfully',
      user: { id: user._id.toString(), name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json({ message: 'Unable to sign in.' }, { status: 500 });
  }
}
