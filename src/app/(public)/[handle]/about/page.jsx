import dbConnect from '@/lib/db';
import User from '@/models/User';
import Project from '@/models/Project';
import Service from '@/models/Service';
import StatCard from '@/components/ui/StatCard';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Sparkles, ArrowRight, User as UserIcon } from 'lucide-react';
import { FaLinkedin, FaGithub, FaXTwitter, FaInstagram } from 'react-icons/fa6';

export const revalidate = 0;

async function getAboutData(handle) {
try {
await dbConnect();
const cleanHandle = (handle || '').toLowerCase();

// 1. Fetch User Profile
const user = await User.findOne({
    $or: [
    { handle: cleanHandle },
    { handle: new RegExp(`^${cleanHandle}$`, 'i') },
    ],
})
    .select('-password -resetCode -resetCodeExpiry')
    .lean();

if (!user) return null;

const userId = user._id;

// 2. Query Project & Service counts concurrently
const [projects, services] = await Promise.all([
    Project.find({ userId }).select('_id').lean(),
    Service.find({ userId }).select('_id').lean(),
]);

return {
    user: { ...user, _id: userId.toString() },
    stats: {
    projectCount: projects.length || 0,
    serviceCount: services.length || 0,
    },
};
} catch (err) {
console.error('Error fetching about page data:', err);
return null;
}
}

export async function generateMetadata({ params }) {
const { handle } = await params;
const data = await getAboutData(handle);

if (!data) return { title: 'User Not Found' };

return {
title: `About ${data.user.name || 'User'} | Portfolio`,
description: data.user.bio || `Learn more about ${data.user.name || 'this portfolio'}.`,
};
}

export default async function AboutPage({ params }) {
const { handle } = await params;
const data = await getAboutData(handle);

if (!data) {
notFound();
}

const { user, stats } = data;
const contactHref = user.handle ? `/${user.handle}/contact` : '/contact';
const projectsHref = user.handle ? `/${user.handle}/projects` : '/projects';
const servicesHref = user.handle ? `/${user.handle}/services` : '/services';

// Merge skill & expertise arrays dynamically
const expertiseList = Array.isArray(user.expertise) ? user.expertise : [];
const skillsList = Array.isArray(user.skills) ? user.skills : [];
const tags = Array.from(new Set([...expertiseList, ...skillsList]));

// Check if any social links exist
const socialLinks = user.socialLinks || {};
const hasSocials = Object.values(socialLinks).some((link) => Boolean(link));

return (
<div className="py-12 space-y-16 max-w-4xl mx-auto">
    {/* 1. HERO / BIO SECTION */}
    <section className="space-y-8">
    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {user.avatarUrl ? (
        <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-(--border-subtle)">
            <Image
            src={user.avatarUrl}
            alt={user.name || 'Avatar'}
            fill
            sizes="96px"
            className="object-cover"
            priority
            />
        </div>
        ) : (
        <div 
            className="w-24 h-24 rounded-2xl flex items-center justify-center shrink-0 border"
            style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--accent-warm)',
            }}
        >
            <UserIcon className="w-10 h-10 opacity-80" />
        </div>
        )}

        <div className="space-y-2">
        {user.handle && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border border-(--border-subtle) bg-(--bg-surface) text-(--accent-warm)">
            <span>@{user.handle}</span>
            </div>
        )}
        <h1 
            className="text-3xl md:text-4xl font-serif font-bold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
        >
            About {user.name || 'Portfolio User'}
        </h1>
        </div>
    </div>

    {/* Bio Body */}
    {user.bio && (
        <div 
        className="rounded-2xl p-6 md:p-8 border space-y-4 leading-relaxed text-sm md:text-base"
        style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-secondary)',
        }}
        >
        <p className="whitespace-pre-line">{user.bio}</p>
        </div>
    )}

    {/* Expertise / Skills (5 per column layout) */}
    {tags.length > 0 && (
    <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-widest text-(--text-secondary)">
        Core Expertise & Technical Skills
        </h3>
        
        <ul className="columns-1 sm:columns-2 md:columns-3 gap-8 space-y-2.5 list-disc list-inside text-sm font-medium text-(--text-primary)">
        {tags.map((tag, idx) => (
            <li key={idx} className="break-inside-avoid">
            {tag}
            </li>
        ))}
        </ul>
    </div>
    )}
    </section>

    {/* 2. STATS ROW */}
    <section className="space-y-4">
    <h3 className="text-xs font-bold uppercase tracking-widest text-(--text-secondary)">
        Impact At A Glance
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
        title="Completed Projects"
        count={stats.projectCount}
        iconType="projects"
        href={projectsHref}
        linkText="Explore all projects"
        />
        <StatCard
        title="Services Offered"
        count={stats.serviceCount}
        iconType="services"
        href={servicesHref}
        linkText="View offered services"
        />
    </div>
    </section>

    {/* 3. CTA & SOCIAL LINKS */}
    <section 
    className="rounded-2xl p-8 md:p-10 border text-center space-y-6"
    style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
    }}
    >
    <div className="max-w-md mx-auto space-y-2">
        <h2 className="text-xl md:text-2xl font-bold font-serif text-(--text-primary)">
        Let&apos;s Work Together
        </h2>
        <p className="text-xs md:text-sm text-(--text-secondary) leading-relaxed">
        Have a project in mind or want to collaborate? Feel free to reach out.
        </p>
    </div>

    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <Link
        href={contactHref}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all hover:scale-[1.02]"
        style={{
            backgroundColor: 'var(--accent-warm)',
            color: 'var(--bg-main)',
        }}
        >
        <span>Start a Project</span>
        <ArrowRight className="w-4 h-4" />
        </Link>

        {hasSocials && (
        <div className="flex items-center gap-2 pt-2 sm:pt-0">
            {socialLinks.github && (
            <a
                href={socialLinks.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-xl border border-(--border-subtle) hover:border-(--accent-warm) transition-colors text-(--text-secondary) hover:text-(--text-primary)"
            >
                <FaGithub className="w-4 h-4" />
            </a>
            )}
            {socialLinks.linkedin && (
            <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-xl border border-(--border-subtle) hover:border-(--accent-warm) transition-colors text-(--text-secondary) hover:text-(--text-primary)"
            >
                <FaLinkedin className="w-4 h-4" />
            </a>
            )}
            {socialLinks.twitter && (
            <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X Profile"
                className="p-2.5 rounded-xl border border-(--border-subtle) hover:border-(--accent-warm) transition-colors text-(--text-secondary) hover:text-(--text-primary)"
            >
                <FaXTwitter className="w-4 h-4" />
            </a>
            )}
            {socialLinks.instagram && (
            <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Profile"
                className="p-2.5 rounded-xl border border-(--border-subtle) hover:border-(--accent-warm) transition-colors text-(--text-secondary) hover:text-(--text-primary)"
            >
                <FaInstagram className="w-4 h-4" />
            </a>
            )}
        </div>
        )}
    </div>
    </section>
</div>
);
}
