import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { v2 as cloudinary } from 'cloudinary';
import { createUserSession } from '@/lib/session';
import { checkRateLimit, getClientAddress, isValidEmail, normalizeEmail, validatePassword } from '@/lib/authSecurity';

export async function POST(req) {
try {
await dbConnect();

// Ensure Cloudinary is configured on every request
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const formData = await req.formData();

const name = formData.get('name');
const email = formData.get('email');
const password = formData.get('password');
const phoneNumber = formData.get('phoneNumber');
const avatarFile = formData.get('avatar');

const cleanEmail = normalizeEmail(email);
const passwordError = validatePassword(password);
if (!name || !isValidEmail(cleanEmail) || passwordError) {
    return NextResponse.json(
    { message: passwordError || 'Please provide a valid name and email address.' },
    { status: 400 }
    );
}

const rateLimit = checkRateLimit(`admin-session:${getClientAddress(req)}:${cleanEmail}`, { limit: 10, windowMs: 15 * 60 * 1000 });
if (!rateLimit.allowed) {
    return NextResponse.json({ message: 'Too many attempts. Please try again later.' }, { status: 429 });
}

let avatarUrl = '';

// Upload Avatar to Cloudinary if a file was provided
if (avatarFile && typeof avatarFile === 'object' && avatarFile.size > 0) {
    // Double check env variables exist
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
    throw new Error('Cloudinary Cloud Name is missing in .env.local');
    }

    const arrayBuffer = await avatarFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
        { folder: 'talent_avatars', resource_type: 'image' },
        (error, result) => {
        if (error) reject(error);
        else resolve(result);
        }
    );
    stream.end(buffer);
    });

    avatarUrl = uploadResult.secure_url;
}

// Generate unique handle
const handle = name.toLowerCase().replace(/[^a-z0-9]/g, '');

// Find or create User
let user = await User.findOne({ email: cleanEmail });

if (user) {
    const isHashedPassword = user.password.startsWith('$2');
    const isPasswordValid = isHashedPassword
    ? await bcrypt.compare(password, user.password)
    : password === user.password;

    if (!isPasswordValid) {
    return NextResponse.json(
        { message: 'Incorrect password' },
        { status: 401 }
    );
    }

    // Upgrade any legacy plain-text password after a successful sign-in.
    if (!isHashedPassword) {
    user.password = await bcrypt.hash(password, 12);
    }

    if (avatarUrl) user.avatarUrl = avatarUrl;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    await user.save();
} else {
    user = await User.create({
    name,
    email: cleanEmail,
    password: await bcrypt.hash(password, 12),
    phoneNumber,
    handle,
    avatarUrl,
    role: 'talent',
    });
}

await createUserSession(user);

return NextResponse.json({
    success: true,
    user: {
    id: user._id,
    name: user.name,
    email: user.email,
    handle: user.handle,
    avatarUrl: user.avatarUrl,
    },
});
} catch (error) {
console.error('API /admin/session error:', error);
return NextResponse.json(
    { message: error.message || 'Server error during authentication' },
    { status: 500 }
);
}
}
