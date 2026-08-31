import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db'
import Certification from '@/models/Certification';
import { getSession } from '@/lib/session';

const generateCredentialId = () => {
const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
return `CRT-${Date.now().toString(36).toUpperCase()}-${randomStr}`;
};

export async function GET() {
try {
    const session = await getSession();
    const userId = session?.userId;

    if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const certifications = await Certification.find({ user: userId }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: certifications }, { status: 200 });
} catch (error) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
}
}

export async function POST(req) {
try {
    const session = await getSession();
    const userId = session?.userId;

    if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, fileUrl, issueDate, credentialId } = body;

    if (!title || !fileUrl || !issueDate) {
    return NextResponse.json(
        { message: 'Title, certification file/URL, and issue date are required.' },
        { status: 400 }
    );
    }

    await dbConnect();

    const finalCredentialId = credentialId?.trim() || generateCredentialId();

    const newCert = await Certification.create({
    user: userId,
    title: title.trim(),
    fileUrl: fileUrl.trim(),
    issueDate: issueDate.trim(),
    credentialId: finalCredentialId,
    });

    return NextResponse.json({ success: true, data: newCert }, { status: 201 });
} catch (error) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
}
}
