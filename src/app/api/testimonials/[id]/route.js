import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Testimonial from '@/models/Testimonial';
import { getSession } from '@/lib/session';

// PUT: Approve, unapprove, or edit a single testimonial (Admin Only)
export async function PUT(request, { params }) {
try {
const session = await getSession();
if (!session?.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

await connectDB();
const { id } = await params;
const body = await request.json();

const updatedTestimonial = await Testimonial.findOneAndUpdate({ _id: id, userId: session.userId }, body, {
    new: true,
    runValidators: true,
});

if (!updatedTestimonial) {
    return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
}

return NextResponse.json(updatedTestimonial, { status: 200 });
} catch (error) {
return NextResponse.json({ error: error.message }, { status: 400 });
}
}

// DELETE: Remove a testimonial (Admin Only)
export async function DELETE(request, { params }) {
try {
const session = await getSession();
if (!session?.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

await connectDB();
const { id } = await params;

const deleted = await Testimonial.findOneAndDelete({ _id: id, userId: session.userId });

if (!deleted) {
    return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
}

return NextResponse.json({ message: 'Testimonial deleted successfully' }, { status: 200 });
} catch (error) {
return NextResponse.json({ error: error.message }, { status: 400 });
}
}
