import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Certification from '@/models/Certification';
import { getSession } from '@/lib/session';

export async function PUT(req, { params }) {
try {
    const session = await getSession();
    const userId = session?.userId;

    if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { title, fileUrl, issueDate, credentialId } = body;

    await dbConnect();

    const existingCert = await Certification.findOne({ _id: id, user: userId });
    if (!existingCert) {
    return NextResponse.json({ message: 'Certification not found or unauthorized' }, { status: 404 });
    }

    if (title) existingCert.title = title.trim();
    if (fileUrl) existingCert.fileUrl = fileUrl.trim();
    if (issueDate) existingCert.issueDate = issueDate.trim();
    if (credentialId) existingCert.credentialId = credentialId.trim();

    await existingCert.save();

    return NextResponse.json({ success: true, data: existingCert }, { status: 200 });
} catch (error) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
}
}

export async function DELETE(req, { params }) {
try {
    const session = await getSession();
    const userId = session?.userId;

    if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    await dbConnect();

    const deletedCert = await Certification.findOneAndDelete({ _id: id, user: userId });
    if (!deletedCert) {
    return NextResponse.json({ message: 'Certification not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Certification deleted successfully' }, { status: 200 });
} catch (error) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
}
}
