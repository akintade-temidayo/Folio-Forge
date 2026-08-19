import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Project from '@/models/Project';
import { getSession } from '@/lib/session';
import mongoose from 'mongoose';

// GET ALL PROJECTS FOR LOGGED-IN USER
export async function GET() {
try {
await connectDB();

const session = await getSession();
if (!session?.userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
}

const projects = await Project.find({ userId: session.userId })
    .populate({ path: 'category', strictPopulate: false })
    .sort({ order: 1, createdAt: -1 });

return NextResponse.json(projects, { status: 200 });
} catch (error) {
console.error('Error fetching projects:', error);
return NextResponse.json(
    { message: 'Failed to fetch projects', error: error.message },
    { status: 500 }
);
}
}

// CREATE A NEW PROJECT
export async function POST(req) {
try {
await connectDB();

const session = await getSession();
if (!session?.userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
}

const body = await req.json();
const { title, category, projectType, videoUrl, images, previewClip } = body;

if (!title || !category) {
return NextResponse.json({ message: 'Title and Category are required' }, { status: 400 });
}

if (projectType === 'picture') {
if (!Array.isArray(images) || images.length === 0) {
return NextResponse.json({ message: 'At least one image is required for picture projects' }, { status: 400 });
}
if (images.length > 4) {
return NextResponse.json({ message: 'Picture projects support a maximum of 4 images' }, { status: 400 });
}
} else {
if (!videoUrl) {
return NextResponse.json({ message: 'A video URL is required for video projects' }, { status: 400 });
}
}

const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

const generatedSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

const categoryValue = mongoose.Types.ObjectId.isValid(category)
    ? new mongoose.Types.ObjectId(category)
    : category;

const newProject = await Project.create({
    ...body,
    category: categoryValue,
    userId: session.userId,
    slug: generatedSlug,
    previewClip: previewClip || videoUrl,
});

return NextResponse.json(newProject, { status: 201 });
} catch (error) {
console.error('Project creation error details:', error);
return NextResponse.json(
    { message: error.message || 'Failed to create project' },
    { status: 500 }
);
}
}