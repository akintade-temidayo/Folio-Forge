import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Testimonial from '@/models/Testimonial';
import { getSession } from '@/lib/session'; 

export async function GET() {
try {
await dbConnect();

// 1. Authenticate admin user
const session = await getSession();
if (!session || !session.userId) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
}

// 2. Find all testimonials belonging to this admin
const testimonials = await Testimonial.find({ userId: session.userId }).sort({ createdAt: -1 });

return NextResponse.json({
    success: true,
    testimonials,
});
} catch (error) {
console.error('GET Admin Testimonials Error:', error);
return NextResponse.json(
    { success: false, message: error.message || 'Failed to fetch testimonials' },
    { status: 500 }
);
}
}