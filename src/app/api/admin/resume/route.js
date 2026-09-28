import { NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { getSession } from '@/lib/session';

const MAX_FILE_SIZE = 15 * 1024 * 1024;

export async function GET() {
try {
    await dbConnect();
    const session = await getSession();
    if (!session?.userId) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const user = await User.collection.findOne(
    { _id: new mongoose.Types.ObjectId(session.userId) },
    { projection: { resumeUrl: 1, resumeFileName: 1 } }
    );
    return NextResponse.json({
    success: true,
    resumeUrl: user?.resumeUrl || '',
    resumeFileName: user?.resumeFileName || '',
    });
} catch (error) {
    console.error('GET /api/admin/resume error:', error);
    return NextResponse.json({ success: false, message: 'Failed to load resume.' }, { status: 500 });
}
}

export async function POST(request) {
try {
    await dbConnect();
    const session = await getSession();
    if (!session?.userId) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');
    if (!file || typeof file.arrayBuffer !== 'function') {
    return NextResponse.json({ success: false, message: 'Select a PDF file to upload.' }, { status: 400 });
    }

    const isPdf = file.type === 'application/pdf' || file.name?.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
    return NextResponse.json({ success: false, message: 'Resume must be a PDF file.' }, { status: 400 });
    }
    if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ success: false, message: 'Resume must be 15 MB or smaller.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let resumeUrl;

    if (process.env.CLOUDINARY_CLOUD_NAME) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const upload = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
        { folder: 'portfolio/resumes', resource_type: 'raw' },
        (error, result) => error ? reject(error) : resolve(result)
        );
        stream.end(buffer);
    });
    resumeUrl = upload.secure_url;
    } else {
    const safeName = (file.name || 'resume.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');
    const fileName = `${session.userId}_${Date.now()}_${safeName}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'resumes');
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, fileName), buffer);
    resumeUrl = `/uploads/resumes/${fileName}`;
    }

    const userId = new mongoose.Types.ObjectId(session.userId);
    const updateResult = await User.collection.updateOne(
    { _id: userId },
    { $set: { resumeUrl, resumeFileName: file.name || 'Resume.pdf' } }
    );
    if (!updateResult.matchedCount) {
    return NextResponse.json({ success: false, message: 'User not found.' }, { status: 404 });
    }
    const savedUser = await User.collection.findOne(
    { _id: userId },
    { projection: { resumeUrl: 1, resumeFileName: 1 } }
    );
    if (savedUser?.resumeUrl !== resumeUrl) {
    return NextResponse.json(
        { success: false, message: 'Resume uploaded, but could not be saved to your profile. Please try again.' },
        { status: 500 }
    );
    }
    return NextResponse.json({ success: true, resumeUrl: savedUser.resumeUrl, resumeFileName: savedUser.resumeFileName });
} catch (error) {
    console.error('POST /api/admin/resume error:', error);
    return NextResponse.json({ success: false, message: 'Failed to upload resume.' }, { status: 500 });
}
}

export async function DELETE() {
try {
    await dbConnect();
    const session = await getSession();
    if (!session?.userId) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await User.collection.updateOne(
    { _id: new mongoose.Types.ObjectId(session.userId) },
    { $set: { resumeUrl: '', resumeFileName: '' } }
    );
    return NextResponse.json({ success: true });
} catch (error) {
    console.error('DELETE /api/admin/resume error:', error);
    return NextResponse.json({ success: false, message: 'Failed to remove resume.' }, { status: 500 });
}
}
