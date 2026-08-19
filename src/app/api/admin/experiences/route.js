import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Experience from '@/models/Experience';
import { getSession } from '@/lib/session';

// GET: Fetch all experiences for the logged-in user
export async function GET() {
try {
await dbConnect();
const session = await getSession();
const userId = session?.userId;

if (!userId) {
    return NextResponse.json({ success: true, experiences: [] });
}

const experiences = await Experience.find({ userId }).sort({
    order: 1,
    createdAt: -1,
});

return NextResponse.json({ success: true, experiences });
} catch (error) {
console.error('GET /api/admin/experiences error:', error);
return NextResponse.json(
    { success: false, message: 'Failed to fetch experiences' },
    { status: 500 }
);
}
}

// POST: Create a new experience
export async function POST(req) {
try {
await dbConnect();
const session = await getSession();
const userId = session?.userId;

if (!userId) {
    return NextResponse.json(
    { success: false, message: 'Unauthorized' },
    { status: 401 }
    );
}

const body = await req.json();

const experience = await Experience.create({
    ...body,
    userId,
});

return NextResponse.json({ success: true, experience }, { status: 201 });
} catch (error) {
console.error('POST /api/admin/experiences error:', error);
return NextResponse.json(
    {
    success: false,
    message: error.message || 'Failed to create experience',
    },
    { status: 500 }
);
}
}
