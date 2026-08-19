import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Testimonial from '@/models/Testimonial';
import { getSession } from '@/lib/session';

// UPDATE / APPROVE TESTIMONIAL
export async function PUT(req, { params }) {
try {
await dbConnect();
const session = await getSession();
if (!session || !session.userId) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
}

const { id } = await params;
const body = await req.json();

const updated = await Testimonial.findOneAndUpdate(
    { _id: id, userId: session.userId },
    { isApproved: body.isApproved },
    { new: true }
);

if (!updated) {
    return NextResponse.json({ success: false, message: 'Testimonial not found' }, { status: 404 });
}

return NextResponse.json({ success: true, testimonial: updated });
} catch (error) {
console.error('PUT Testimonial Error:', error);
return NextResponse.json({ success: false, message: error.message }, { status: 500 });
}
}

// DELETE TESTIMONIAL
export async function DELETE(req, { params }) {
try {
await dbConnect();
const session = await getSession();
if (!session || !session.userId) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
}

const { id } = await params;

const deleted = await Testimonial.findOneAndDelete({ _id: id, userId: session.userId });

if (!deleted) {
    return NextResponse.json({ success: false, message: 'Testimonial not found' }, { status: 404 });
}

return NextResponse.json({ success: true, message: 'Testimonial deleted successfully' });
} catch (error) {
console.error('DELETE Testimonial Error:', error);
return NextResponse.json({ success: false, message: error.message }, { status: 500 });
}
}
