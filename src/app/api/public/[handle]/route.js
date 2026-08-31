import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Project from '@/models/Project';
import Category from '@/models/Category';
import Testimonial from '@/models/Testimonial';
import Service from '@/models/Service';
import Experience from '@/models/Experience';
import Education from '@/models/Education';
import Certification from '@/models/Certification';

export async function GET(req, { params }) {
try {
    await dbConnect();
    const { handle } = await params;

    if (!handle) {
    return NextResponse.json(
        { success: false, message: 'Handle is required' },
        { status: 400 }
    );
    }

    const user = await User.findOne({ handle: handle.toLowerCase() }).select(
    '-password -resetCode -resetCodeExpiry'
    );

    if (!user) {
    return NextResponse.json(
        { success: false, message: 'Portfolio not found' },
        { status: 404 }
    );
    }

    const userId = user._id;

    // Fetch all user assets concurrently
    const [
    projects,
    experiences,
    categories,
    services,
    testimonials,
    education,
    certifications,
    ] = await Promise.all([
    Project.find({ userId }).populate('category').sort({ createdAt: -1 }),
    Experience.find({ userId }).sort({ startDate: -1 }),
    Category.find({ userId }).sort({ name: 1 }),
    Service.find({ userId }).populate('category').sort({ createdAt: -1 }),
    Testimonial.find({ userId, isApproved: true }).sort({ createdAt: -1 }),
    Education.find({ user: userId }).sort({ startDate: -1 }),
    Certification.find({ user: userId }).sort({ issueDate: -1 }),
    ]);

    return NextResponse.json({
    success: true,
    data: {
        user,
        projects,
        experiences,
        categories,
        services,
        testimonials,
        education,
        certifications,
    },
    });
} catch (error) {
    console.error('GET Public Portfolio Error:', error);
    return NextResponse.json(
    { success: false, message: error.message || 'Failed to load portfolio' },
    { status: 500 }
    );
}
}
