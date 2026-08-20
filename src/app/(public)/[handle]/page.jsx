import dbConnect from '@/lib/db';
import User from '@/models/User';
import Project from '@/models/Project';
import Service from '@/models/Service';
import '@/models/Category';
import Testimonial from '@/models/Testimonial';
import Experience from '@/models/Experience'; 
import { notFound } from 'next/navigation';

import ModernTemplate from '@/components/portfolio/templates/ModernTemplate';
import MinimalTemplate from '@/components/portfolio/templates/MinimalTemplate';
import EditorialTemplate from '@/components/portfolio/templates/EditorialTemplate';
import BentoTemplate from '@/components/portfolio/templates/BentoTemplate';

export const revalidate = 0;

function escapeRegex(text) {
return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

async function getPublicData(handle) {
if (!handle || typeof handle !== 'string') return null;

try {
const conn = await dbConnect();
const cleanHandle = handle.trim().toLowerCase();

if (!cleanHandle) return null;

const safeRegex = new RegExp(`^${escapeRegex(cleanHandle)}$`, 'i');

const user = await User.findOne({
    $or: [
    { handle: cleanHandle },
    { handle: safeRegex },
    { name: safeRegex },
    ],
})
    .select('-password -resetCode -resetCodeExpiry')
    .lean();

if (!user) {
    console.warn(`[Public Portfolio] No user found matching handle: "${cleanHandle}" on db: "${conn.connection.name}"`);
    return null;
}

const [projects, services, testimonials, experiences] = await Promise.all([
    Project.find({ userId: user._id }).populate('category').sort({ createdAt: -1 }).lean(),
    Service.find({ userId: user._id }).populate('category').sort({ createdAt: -1 }).lean(),
    Testimonial.find({ userId: user._id, isApproved: true }).sort({ createdAt: -1 }).lean(),
    Experience.find({ userId: user._id }).sort({ createdAt: -1 }).lean(),
]);

return {
    user: JSON.parse(JSON.stringify(user)),
    projects: JSON.parse(JSON.stringify(projects)),
    services: JSON.parse(JSON.stringify(services)),
    testimonials: JSON.parse(JSON.stringify(testimonials)),
    experiences: JSON.parse(JSON.stringify(experiences)),
};
} catch (err) {
console.error('Error fetching public portfolio:', err);
return null;
}
}

// 1. DYNAMIC METADATA (Updates Browser Tab Title)
export async function generateMetadata({ params }) {
const resolvedParams = await params;
const handle = resolvedParams?.handle;
const data = await getPublicData(handle);

if (!data?.user) {
return { title: 'Portfolio Not Found' };
}

return {
title: `${data.user.name} | Portfolio`,
description: data.user.bio || `Explore ${data.user.name}'s portfolio of work and services.`,
};
}

export default async function PublicPortfolioPage({ params }) {
const resolvedParams = await params;
const handle = resolvedParams?.handle;

const data = await getPublicData(handle);

if (!data) {
notFound();
}

const { user, projects, services, testimonials, experiences } = data;
const selectedTemplate = user.portfolioTemplate || 'modern';

const templateProps = { user, projects, services, testimonials, experiences };

switch (selectedTemplate) {
case 'minimal':
    return <MinimalTemplate {...templateProps} />;
case 'editorial':
    return <EditorialTemplate {...templateProps} />;
case 'bento':
    return <BentoTemplate {...templateProps} />;
case 'modern':
default:
    return <ModernTemplate {...templateProps} />;
}
}