//api/public/[handle]/testimonials/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Testimonial from '@/models/Testimonial';

export async function POST(req, { params }) {
console.log('\n--- [PUBLIC POST TESTIMONIAL START] ---');
try {
await dbConnect();
console.log('1. Database connected.');

const { handle } = await params;
console.log('2. Target handle:', handle);

const body = await req.json();
console.log('3. Request Body received:', body);

const { clientName, clientRole, comment, rating } = body;

if (!clientName || !comment) {
    console.warn('❌ Validation Failed: Missing clientName or comment.');
    return NextResponse.json(
    { success: false, message: 'Name and comment are required.' },
    { status: 400 }
    );
}

// Find user by handle
const user = await User.findOne({ handle: handle.toLowerCase() });
console.log('4. User query result:', user ? `Found User ID: ${user._id}` : 'User NOT found');

if (!user) {
    console.warn('❌ User lookup failed for handle:', handle);
    return NextResponse.json(
    { success: false, message: 'User not found.' },
    { status: 404 }
    );
}

// Create testimonial document
const testimonialData = {
    userId: user._id,
    clientName,
    clientRole: clientRole || '',
    comment,
    rating: Number(rating) || 5,
    isApproved: false, // Default to false for public submissions
};

console.log('5. Creating Testimonial in DB with payload:', testimonialData);

const testimonial = await Testimonial.create(testimonialData);
console.log('6. ✅ Testimonial successfully created! Doc ID:', testimonial._id);
console.log('--- [PUBLIC POST TESTIMONIAL END] ---\n');

return NextResponse.json(
    {
    success: true,
    message: 'Testimonial submitted successfully! Pending approval.',
    testimonial,
    },
    { status: 201 }
);
} catch (error) {
console.error('❌ Error in PUBLIC POST /api/public/[handle]/testimonials:', error);
console.log('--- [PUBLIC POST TESTIMONIAL END] ---\n');
return NextResponse.json(
    { success: false, message: error.message || 'Failed to submit testimonial.' },
    { status: 500 }
);
}
}