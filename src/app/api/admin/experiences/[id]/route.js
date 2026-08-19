import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Experience from '@/models/Experience';
import { getSession } from '@/lib/session';

// PUT: Update an existing experience
export async function PUT(req, { params }) {
try {
await dbConnect();
const session = await getSession();
const userId = session?.userId;
if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

const { id } = await params;
const body = await req.json();

const updatedExperience = await Experience.findOneAndUpdate(
    { _id: id, userId },
    body,
    { new: true, runValidators: true }
);

if (!updatedExperience) {
    return NextResponse.json(
    { error: 'Experience not found' },
    { status: 404 }
    );
}

return NextResponse.json(
    { success: true, experience: updatedExperience },
    { status: 200 }
);
} catch (error) {
return NextResponse.json({ error: error.message }, { status: 400 });
}
}

// DELETE: Remove an experience
export async function DELETE(req, { params }) {
try {
await dbConnect();
const session = await getSession();
const userId = session?.userId;
if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

const { id } = await params;
const deleted = await Experience.findOneAndDelete({ _id: id, userId });

if (!deleted) {
    return NextResponse.json(
    { error: 'Experience not found' },
    { status: 404 }
    );
}

return NextResponse.json(
    { success: true, message: 'Experience deleted successfully' },
    { status: 200 }
);
} catch (error) {
return NextResponse.json({ error: error.message }, { status: 400 });
}
}
