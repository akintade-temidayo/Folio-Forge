import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Education from '@/models/Education';
import { getSession } from '@/lib/session';

export async function GET() {
try {
    const session = await getSession();
    const userId = session?.userId;

    if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const educationList = await Education.find({ user: userId }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: educationList }, { status: 200 });
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
    const { institution, degree, fieldOfStudy, startDate, endDate, grade, description } = body;

    if (!institution || !degree || !startDate || !endDate) {
    return NextResponse.json(
        { message: 'Institution, degree, start date, and end date are required.' },
        { status: 400 }
    );
    }

    await dbConnect();

    const newEducation = await Education.create({
    user: userId,
    institution: institution.trim(),
    degree: degree.trim(),
    fieldOfStudy: fieldOfStudy?.trim() || '',
    startDate: startDate.trim(),
    endDate: endDate.trim(),
    grade: grade?.trim() || '',
    description: description?.trim() || '',
    });

    return NextResponse.json({ success: true, data: newEducation }, { status: 201 });
} catch (error) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
}
}