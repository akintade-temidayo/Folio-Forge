import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Education from '@/models/Education';
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

    await dbConnect();

    const existingEducation = await Education.findOne({ _id: id, user: userId });
    if (!existingEducation) {
    return NextResponse.json({ message: 'Education record not found or unauthorized' }, { status: 404 });
    }

    const { institution, degree, fieldOfStudy, startDate, endDate, grade, description } = body;

    if (institution !== undefined) existingEducation.institution = institution.trim();
    if (degree !== undefined) existingEducation.degree = degree.trim();
    if (fieldOfStudy !== undefined) existingEducation.fieldOfStudy = fieldOfStudy.trim();
    if (startDate !== undefined) existingEducation.startDate = startDate.trim();
    if (endDate !== undefined) existingEducation.endDate = endDate.trim();
    if (grade !== undefined) existingEducation.grade = grade.trim();
    if (description !== undefined) existingEducation.description = description.trim();

    await existingEducation.save();

    return NextResponse.json({ success: true, data: existingEducation }, { status: 200 });
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

    const deletedEducation = await Education.findOneAndDelete({ _id: id, user: userId });
    if (!deletedEducation) {
    return NextResponse.json({ message: 'Education record not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Education record deleted successfully' }, { status: 200 });
} catch (error) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
}
}