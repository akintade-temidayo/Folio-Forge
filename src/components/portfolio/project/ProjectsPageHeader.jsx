'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, LayoutGrid } from 'lucide-react';

export default function ProjectsPageHeader({ user, handle, totalCount = 0 }) {
return (
<div className="space-y-6">
    {/* Back Link */}
    <Link
    href={`/${handle}`}
    className="inline-flex items-center gap-2 text-xs font-semibold text-(--text-secondary) hover:text-(--text-primary) transition-colors group"
    >
    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
    <span>Back to Portfolio</span>
    </Link>

    {/* Header Info */}
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-(--border-subtle) pb-6">
    <div>
        <div className="flex items-center gap-2 text-xs font-medium text-(--accent-warm) mb-1">
        <LayoutGrid className="w-3.5 h-3.5" />
        <span>Portfolio Archive</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-(--text-primary)">
        All Projects
        </h1>
        <p className="text-xs sm:text-sm text-(--text-secondary) mt-1">
        Explore the complete gallery of creative works by {user?.name || handle}.
        </p>
    </div>

    <span className="font-mono text-xs text-(--text-secondary) bg-(--bg-surface) px-3 py-1.5 rounded-full border border-(--border-subtle) w-fit">
        {totalCount} {totalCount === 1 ? 'Project' : 'Projects'}
    </span>
    </div>
</div>
);
}