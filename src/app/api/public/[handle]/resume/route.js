import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET(request, { params }) {
try {
    await dbConnect();
    const { handle } = await params;
    const user = await User.collection.findOne(
    { handle: String(handle || '').toLowerCase() },
    { projection: { _id: 1, resumeUrl: 1, resumeFileName: 1 } }
    );

    if (!user?.resumeUrl) {
    return NextResponse.json({ success: false, message: 'Resume not found.' }, { status: 404 });
    }

    let fileBuffer;
    if (user.resumeUrl.startsWith('/uploads/resumes/')) {
    const fileName = path.basename(user.resumeUrl);
    if (!fileName || fileName !== user.resumeUrl.slice('/uploads/resumes/'.length)) {
        return NextResponse.json({ success: false, message: 'Invalid resume path.' }, { status: 400 });
    }
    fileBuffer = await readFile(path.join(process.cwd(), 'public', 'uploads', 'resumes', fileName));
    } else {
    const resumeUrl = new URL(user.resumeUrl);
    if (resumeUrl.protocol !== 'https:' || resumeUrl.hostname !== 'res.cloudinary.com') {
        return NextResponse.json({ success: false, message: 'Invalid resume source.' }, { status: 400 });
    }
    const fileResponse = await fetch(resumeUrl, { cache: 'no-store' });
    if (!fileResponse.ok) {
        return NextResponse.json({ success: false, message: 'Could not retrieve resume.' }, { status: 502 });
    }
    fileBuffer = Buffer.from(await fileResponse.arrayBuffer());
    }

    const safeName = (user.resumeFileName || 'Resume.pdf').replace(/[\r\n"\\]/g, '_');
    const disposition = new URL(request.url).searchParams.get('view') === '1' ? 'inline' : 'attachment';
    return new Response(fileBuffer, {
    headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `${disposition}; filename="${safeName}"`,
        'Cache-Control': 'public, max-age=300',
        'X-Content-Type-Options': 'nosniff',
    },
    });
} catch (error) {
    console.error('GET /api/public/[handle]/resume error:', error);
    return NextResponse.json({ success: false, message: 'Failed to download resume.' }, { status: 500 });
}
}
