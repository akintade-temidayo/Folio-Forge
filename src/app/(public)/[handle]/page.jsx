import dbConnect from '@/lib/db';
import User from '@/models/User';
import Project from '@/models/Project';
import Service from '@/models/Service';
import Testimonial from '@/models/Testimonial';
import Experience from '@/models/Experience'; 
import { notFound } from 'next/navigation';

// Import Templates
import ModernTemplate from '@/components/portfolio/templates/ModernTemplate';
import MinimalTemplate from '@/components/portfolio/templates/MinimalTemplate';
import EditorialTemplate from '@/components/portfolio/templates/EditorialTemplate';
import BentoTemplate from '@/components/portfolio/templates/BentoTemplate';

export const revalidate = 0;

async function getPublicData(handle) {
try {
await dbConnect();
const cleanHandle = (handle || '').toLowerCase();

const user = await User.findOne({
    $or: [
    { handle: cleanHandle },
    { handle: new RegExp(`^${cleanHandle}$`, 'i') },
    { name: new RegExp(`^${cleanHandle}$`, 'i') },
    ],
})
    .select('-password -resetCode -resetCodeExpiry')
    .lean();

if (!user) return null;

//  2. Added Experience to Promise.all
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
    experiences: JSON.parse(JSON.stringify(experiences)), // 👈 3. Returned experiences
};
} catch (err) {
console.error('Error fetching public portfolio:', err);
return null;
}
}

export default async function PublicPortfolioPage({ params }) {
const { handle } = await params;
const data = await getPublicData(handle);

if (!data) {
notFound();
}

const { user, projects, services, testimonials, experiences } = data;

const selectedTemplate = user.portfolioTemplate || 'modern';

// 4. Passed experiences prop into all templates
switch (selectedTemplate) {
case 'minimal':
    return (
    <MinimalTemplate
        user={user}
        projects={projects}
        services={services}
        testimonials={testimonials}
        experiences={experiences}
    />
    );

case 'editorial':
    return (
    <EditorialTemplate
        user={user}
        projects={projects}
        services={services}
        testimonials={testimonials}
        experiences={experiences}
    />
    );

case 'bento':
    return (
    <BentoTemplate
        user={user}
        projects={projects}
        services={services}
        testimonials={testimonials}
        experiences={experiences}
    />
    );

case 'modern':
default:
    return (
    <ModernTemplate
        user={user}
        projects={projects}
        services={services}
        testimonials={testimonials}
        experiences={experiences}
    />
    );
}
}
