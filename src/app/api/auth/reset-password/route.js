import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { checkRateLimit, getClientAddress, hashResetCode, isValidEmail, normalizeEmail, validatePassword } from '@/lib/authSecurity';
import { clearSession } from '@/lib/session';

const INVALID_CODE_MESSAGE = 'Invalid or expired reset code.';

export async function POST(req) {
  try {
    const { email, code, password } = await req.json();
    
    // Ensure thorough decoding and cleaning of email
    const decodedEmail = decodeURIComponent(email || '');
    const cleanEmail = normalizeEmail(decodedEmail);
    const passwordError = validatePassword(password);

    if (!isValidEmail(cleanEmail) || !/^\d{6}$/.test(String(code || '').trim()) || passwordError) {
      return NextResponse.json(
        { message: passwordError || INVALID_CODE_MESSAGE },
        { status: 400 }
      );
    }

    const rateLimit = checkRateLimit(
      `password-reset-submit:${getClientAddress(req)}:${cleanEmail}`,
      { limit: 10, windowMs: 15 * 60 * 1000 }
    );
    if (!rateLimit.allowed) {
      return NextResponse.json({ message: 'Too many attempts. Please request a new code.' }, { status: 429 });
    }

    await connectDB();
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      console.log('Reset Password Error: User not found for email:', cleanEmail);
      return NextResponse.json({ message: INVALID_CODE_MESSAGE }, { status: 400 });
    }

    const now = Date.now();
    const hashedInputCode = hashResetCode(String(code).trim());

    const isCodeValid = user.resetCode === hashedInputCode;
    const isNotExpired = user.resetCodeExpiry && user.resetCodeExpiry.getTime() > now;
    const hasAttemptsLeft = (user.resetCodeAttempts || 0) < 5;

    if (!isCodeValid || !isNotExpired || !hasAttemptsLeft) {
      console.log('Reset Password Validation Failed:', {
        isCodeValid,
        isNotExpired,
        hasAttemptsLeft,
        storedCode: user.resetCode,
        inputHash: hashedInputCode
      });

      if (user.resetCode && isNotExpired) {
        user.resetCodeAttempts = (user.resetCodeAttempts || 0) + 1;
        await user.save();
      }
      return NextResponse.json({ message: INVALID_CODE_MESSAGE }, { status: 400 });
    }

    user.password = await bcrypt.hash(password, 12);
    user.resetCode = null;
    user.resetCodeExpiry = null;
    user.resetCodeAttempts = 0;
    user.resetCodeLastRequestedAt = null;
    user.sessionVersion = (user.sessionVersion || 0) + 1;
    
    await user.save();
    await clearSession();

    return NextResponse.json({ success: true, message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json({ message: 'Failed to reset password.' }, { status: 500 });
  }
}