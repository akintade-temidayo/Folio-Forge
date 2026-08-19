'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function MinimalHero({ user }) {
const contactHref = user?.handle ? `/${user.handle}/contact` : '/contact';

// Merge and deduplicate skills/expertise tags
const expertiseList = Array.isArray(user?.expertise) ? user.expertise : [];
const skillsList = Array.isArray(user?.skills) ? user.skills : [];
const tags = Array.from(new Set([...expertiseList, ...skillsList]));

return (
<header className="space-y-6 pt-6 pb-10 border-b border-(--border-subtle)">
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
    {/* Name & Title */}
    <div className="space-y-2">
        <h1 
        className="text-3xl sm:text-5xl font-serif font-bold tracking-tight"
        style={{ color: 'var(--text-primary)' }}
        >
        {user?.name || 'Your Name'}
        </h1>
        <p 
        className="text-base sm:text-lg font-medium"
        style={{ color: 'var(--text-secondary)' }}
        >
        {user?.expertise?.[0] || user?.title || null}
        </p>
    </div>

    {/* Direct Contact Button */}
    <Link
        href={contactHref}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-semibold transition-all shrink-0 self-start sm:self-auto group cursor-pointer"
        style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)',
        }}
    >
        <span>Get in Touch</span>
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
    </div>

    {/* Short Bio */}
    {user?.bio && (
    <p 
        className="text-sm sm:text-base leading-relaxed max-w-2xl pt-2"
        style={{ color: 'var(--text-secondary)' }}
    >
        {user.bio}
    </p>
    )}

    {/* Inline Skills */}
    {tags.length > 0 && (
    <p
        className="text-xs font-medium tracking-wide pt-1 flex flex-wrap gap-2 items-center"
        style={{ color: 'var(--text-secondary)' }}
    >
        {tags.map((tag, idx) => (
        <span key={idx} className="flex items-center gap-2">
            <span>{tag}</span>
            {idx < tags.length - 1 && (
            <span className="opacity-40 font-light">|</span>
            )}
        </span>
        ))}
    </p>
    )}
</header>
);
}