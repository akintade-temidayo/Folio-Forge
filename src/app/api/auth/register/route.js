import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { checkRateLimit, getClientAddress, isValidEmail, normalizeEmail, validatePassword } from '@/lib/authSecurity';

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, phone, phoneNumber, password, handle, avatarUrl } = await req.json();
    const cleanName = String(name || '').trim();
    const cleanEmail = normalizeEmail(email);
    const passwordError = validatePassword(password);

    if (!cleanName || !isValidEmail(cleanEmail) || passwordError) {
      return NextResponse.json(
        { message: passwordError || 'Please provide a valid name and email address.' },
        { status: 400 }
      );
    }

    const rateLimit = checkRateLimit(`register:${getClientAddress(req)}`, { limit: 10, windowMs: 60 * 60 * 1000 });
    if (!rateLimit.allowed) {
      return NextResponse.json({ message: 'Too many registration attempts. Please try again later.' }, { status: 429 });
    }

    if (await User.exists({ email: cleanEmail })) {
      return NextResponse.json({ message: 'Unable to create this account.' }, { status: 400 });
    }

    const baseHandle = String(handle || cleanName)
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '')
      .replace(/^-+|-+$/g, '') || 'creator';

    let generatedHandle;
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const candidate = `${baseHandle}${crypto.randomUUID().replace(/-/g, '').slice(0, 6)}`;
      if (!(await User.exists({ handle: candidate }))) {
        generatedHandle = candidate;
        break;
      }
    }

    if (!generatedHandle) {
      return NextResponse.json({ message: 'Unable to create this account.' }, { status: 503 });
    }

    const user = await User.create({
      name: cleanName,
      email: cleanEmail,
      phoneNumber: String(phoneNumber || phone || '').trim(),
      password: await bcrypt.hash(password, 12),
      handle: generatedHandle,
      avatarUrl: String(avatarUrl || '').trim(),
    });

    return NextResponse.json(
      { message: 'Portfolio created successfully!', userId: user._id, handle: user.handle },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Unable to create this account.' }, { status: 500 });
  }
}
