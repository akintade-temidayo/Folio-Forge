import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Project from '@/models/Project';
import Category from '@/models/Category';
import Testimonial from '@/models/Testimonial';
import Service from '@/models/Service';
import { getSession } from '@/lib/session';

export async function GET() {
try {
await dbConnect();

const session = await getSession();
if (!session?.userId) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
}

const user = await User.findById(session.userId).select('-password');

if (!user) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
}

const userData = user.toObject();

// Ensure fallback values exist on fetched object
userData.portfolioTheme = userData.portfolioTheme || 'espresso';
userData.portfolioTemplate = userData.portfolioTemplate || 'modern';

let projectCount = 0;
let serviceCount = 0;
let categoryCount = 0;
let testimonialCount = 0;

try {
    const filter = { userId: session.userId };

    projectCount = await Project.countDocuments(filter);
    serviceCount = await Service.countDocuments(filter);
    categoryCount = await Category.countDocuments(filter);
    testimonialCount = await Testimonial.countDocuments(filter);
} catch (countError) {
    console.warn('Could not fetch entity counts:', countError.message);
}

return NextResponse.json({
    success: true,
    user: userData,
    counts: {
    projects: projectCount,
    services: serviceCount,
    categories: categoryCount,
    testimonials: testimonialCount,
    },
});
} catch (error) {
console.error('GET /api/admin/profile Error:', error);
return NextResponse.json(
    { success: false, message: error.message || 'Failed to fetch profile' },
    { status: 500 }
);
}
}

export async function PUT(req) {
try {
await dbConnect();

const session = await getSession();
if (!session?.userId) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
}

const contentType = req.headers.get('content-type') || '';
let bodyData = {};

if (contentType.includes('application/json')) {
    bodyData = await req.json();
} else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
    const formData = await req.formData();
    bodyData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber'),
    bio: formData.get('bio'),
    portfolioTheme: formData.get('portfolioTheme'),
    portfolioTemplate: formData.get('portfolioTemplate'),
    socialLinksRaw: formData.get('socialLinks'),
    expertiseRaw: formData.get('expertise'),
    skillsRaw: formData.get('skills'),
    };
}

const updateFields = {};

if (bodyData.name) updateFields.name = bodyData.name;
if (bodyData.email) updateFields.email = bodyData.email;
if (bodyData.phoneNumber) updateFields.phoneNumber = bodyData.phoneNumber;
if (bodyData.bio !== undefined && bodyData.bio !== null) updateFields.bio = bodyData.bio;
if (bodyData.portfolioTheme) updateFields.portfolioTheme = bodyData.portfolioTheme;
if (bodyData.portfolioTemplate) updateFields.portfolioTemplate = bodyData.portfolioTemplate;

if (bodyData.socialLinks) {
    updateFields.socialLinks = bodyData.socialLinks;
} else if (bodyData.socialLinksRaw) {
    try { updateFields.socialLinks = JSON.parse(bodyData.socialLinksRaw); } catch (e) {}
}

if (Array.isArray(bodyData.expertise)) {
    updateFields.expertise = bodyData.expertise;
} else if (bodyData.expertiseRaw) {
    try { updateFields.expertise = JSON.parse(bodyData.expertiseRaw); } catch (e) {}
}

if (Array.isArray(bodyData.skills)) {
    updateFields.skills = bodyData.skills;
} else if (bodyData.skillsRaw) {
    try { updateFields.skills = JSON.parse(bodyData.skillsRaw); } catch (e) {}
}

// Direct MongoDB update
const updatedUser = await User.findByIdAndUpdate(
    session.userId,
    { $set: updateFields },
    { new: true, runValidators: true }
).select('-password');

if (!updatedUser) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
}

if (updatedUser.handle) {
    revalidatePath(`/${updatedUser.handle}`);
}

return NextResponse.json({
    success: true,
    message: 'Profile updated successfully',
    user: updatedUser,
});
} catch (error) {
console.error('PUT /api/admin/profile Error:', error);
return NextResponse.json(
    { success: false, message: error.message || 'Failed to update profile' },
    { status: 500 }
);
}
}