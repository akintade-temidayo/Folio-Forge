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
    const rawPhone = String(phoneNumber || phone || '').trim();

    // 1. Validate Form Fields
    if (!cleanName) {
      return NextResponse.json({ message: 'Full Name is required.' }, { status: 400 });
    }

    if (!isValidEmail(cleanEmail)) {
      return NextResponse.json({ message: 'Please provide a valid email address.' }, { status: 400 });
    }

    // Pass password through custom security checker
    const passwordError = validatePassword ? validatePassword(password) : null;
    if (passwordError) {
      return NextResponse.json({ message: passwordError }, { status: 400 });
    }

    // 2. Check Rate Limits
    const rateLimit = checkRateLimit(`register:${getClientAddress(req)}`, { limit: 10, windowMs: 60 * 60 * 1000 });
    if (!rateLimit.allowed) {
      return NextResponse.json({ message: 'Too many registration attempts. Please try again later.' }, { status: 429 });
    }

    // 3. Prevent Duplicate Accounts
    const existingUser = await User.exists({ email: cleanEmail });
    if (existingUser) {
      return NextResponse.json({ message: 'An account with this email address already exists.' }, { status: 400 });
    }

    // 4. Generate Unique Handle
    const baseHandle = String(handle || cleanName)
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '')
      .replace(/^-+|-+$/g, '') || 'creator';

    let generatedHandle;
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const candidate = `${baseHandle}${Math.floor(1000 + Math.random() * 9000)}`;
      if (!(await User.exists({ handle: candidate }))) {
        generatedHandle = candidate;
        break;
      }
    }

    if (!generatedHandle) {
      return NextResponse.json({ message: 'Could not generate a unique handle. Please try again.' }, { status: 500 });
    }

    // 5. Hash Password & Save User
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: cleanName,
      email: cleanEmail,
      phoneNumber: rawPhone,
      password: hashedPassword,
      handle: generatedHandle,
      avatarUrl: String(avatarUrl || '').trim(),
    });

    return NextResponse.json(
      { message: 'Portfolio created successfully!', userId: user._id, handle: user.handle },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration API Error:', error);
    return NextResponse.json(
      { message: error.message || 'Server error during account creation.' },
      { status: 500 }
    );
  }
}