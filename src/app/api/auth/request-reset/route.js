import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { checkRateLimit, createResetCode, getClientAddress, hashResetCode, isValidEmail, normalizeEmail } from '@/lib/authSecurity';

const GENERIC_MESSAGE = 'If an account exists for that email, a reset code has been sent.';

export async function POST(req) {
  try {
    const { email } = await req.json();
    const cleanEmail = normalizeEmail(email);

    if (!isValidEmail(cleanEmail)) {
      return NextResponse.json({ message: GENERIC_MESSAGE });
    }

    const rateLimit = checkRateLimit(
      `password-reset-request:${getClientAddress(req)}:${cleanEmail}`,
      { limit: 5, windowMs: 15 * 60 * 1000 }
    );
    if (!rateLimit.allowed) {
      return NextResponse.json({ message: GENERIC_MESSAGE });
    }

    await connectDB();
    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return NextResponse.json({ message: GENERIC_MESSAGE });
    }

    const now = Date.now();
    if (user.resetCodeLastRequestedAt && now - user.resetCodeLastRequestedAt.getTime() < 60 * 1000) {
      return NextResponse.json({ message: GENERIC_MESSAGE });
    }

    const code = createResetCode();
    user.resetCode = hashResetCode(code);
    user.resetCodeExpiry = new Date(now + 15 * 60 * 1000);
    user.resetCodeAttempts = 0;
    user.resetCodeLastRequestedAt = new Date(now);
    await user.save();

    // Connect an email/SMS provider here in production. Never expose this code to browsers.
    const response = { success: true, message: GENERIC_MESSAGE };
    if (process.env.NODE_ENV !== 'production') response.devCode = code;
    return NextResponse.json(response);
  } catch (error) {
    console.error('Password reset request error:', error);
    return NextResponse.json({ message: GENERIC_MESSAGE });
  }
}
