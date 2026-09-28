import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary credentials
cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
try {
const formData = await req.formData();
const file = formData.get('file');

if (!file) {
    return NextResponse.json(
    { message: 'No file provided in request' },
    { status: 400 }
    );
}

// Convert file object to buffer
const bytes = await file.arrayBuffer();
const buffer = Buffer.from(bytes);

// PRODUCTION (Vercel / Cloudinary)
if (process.env.NODE_ENV === 'production' || process.env.CLOUDINARY_CLOUD_NAME) {
    const uploadResult = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
        {
        folder: 'portfolio',
        resource_type: 'auto',
        },
        (error, result) => {
        if (error) reject(error);
        else resolve(result);
        }
    );
    stream.end(buffer);
    });

    return NextResponse.json(
    { message: 'Upload successful', url: uploadResult.secure_url },
    { status: 200 }
    );
}

// LOCAL DEVELOPMENT (Disk fallback)
const timeStamp = Date.now();
const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
const fileName = `${timeStamp}_${safeFileName}`;

const uploadDir = path.join(process.cwd(), 'public', 'uploads');
await mkdir(uploadDir, { recursive: true });

const filePath = path.join(uploadDir, fileName);
await writeFile(filePath, buffer);

const publicUrl = `/uploads/${fileName}`;

return NextResponse.json(
    { message: 'Upload successful', url: publicUrl },
    { status: 200 }
);
} catch (error) {
console.error('Upload error:', error);
return NextResponse.json(
    { message: error.message || 'File upload failed on server' },
    { status: 500 }
);
}
}
