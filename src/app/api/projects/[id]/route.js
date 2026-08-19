import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Project from '@/models/Project';
import { getSession } from '@/lib/session';

// PUT: Update project details, order, or featured flag
export async function PUT(request, { params }) {
try {
const session = await getSession();
if (!session?.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

await connectDB();
const { id } = await params;
const body = await request.json();

const updatedProject = await Project.findOneAndUpdate(
    { _id: id, userId: session.userId },
    body,
    { new: true, runValidators: true }
);

if (!updatedProject) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
}

return NextResponse.json(updatedProject, { status: 200 });
} catch (error) {
return NextResponse.json({ error: error.message }, { status: 400 });
}
}

// DELETE: Remove a project
export async function DELETE(request, { params }) {
try {
const session = await getSession();
if (!session?.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

await connectDB();
const { id } = await params;

const deleted = await Project.findOneAndDelete({ _id: id, userId: session.userId });

if (!deleted) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
}

return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });
} catch (error) {
return NextResponse.json({ error: error.message }, { status: 400 });
}
}