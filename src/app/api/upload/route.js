import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

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

// Generate unique filename to avoid overwrites
const timeStamp = Date.now();
const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
const fileName = `${timeStamp}_${safeFileName}`;

// Path inside project: /public/uploads
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

// Create /public/uploads directory if it doesn't exist
await mkdir(uploadDir, { recursive: true });

// Write file to local disk
const filePath = path.join(uploadDir, fileName);
await writeFile(filePath, buffer);

// Return relative URL accessible by browser
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