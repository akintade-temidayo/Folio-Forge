'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, Sparkles } from 'lucide-react';

export default function ProjectHeader({ project, handle }) {
if (!project) return null;

const { title, category, completionDate, isFeatured } = project;

// Format completion date if available
const formattedDate = completionDate
? new Date(completionDate).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    })
: null;

const categoryName = typeof category === 'object' ? category?.name : category;

return (
<div className="space-y-6">
    {/* Back to Portfolio Link */}
    <Link
    href={`/${handle}#projects`}
    className="inline-flex items-center gap-2 text-xs font-semibold text-(--text-secondary) hover:text-(--text-primary) transition-colors group"
    >
    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
    <span>Back to Projects</span>
    </Link>

    {/* Title & Metadata Header */}
    <div className="space-y-3 border-b border-(--border-subtle) pb-6">
    <div className="flex flex-wrap items-center gap-2.5">
        {/* Category Tag */}
        {categoryName && (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-(--accent-warm)/10 text-(--accent-warm) border border-(--accent-warm)/20">
            <Tag className="w-3 h-3" />
            {categoryName}
        </span>
        )}

        {/* Featured Badge */}
        {isFeatured && (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Sparkles className="w-3 h-3" />
            Featured
        </span>
        )}

        {/* Completion Date */}
        {formattedDate && (
        <span className="inline-flex items-center gap-1.5 text-xs text-(--text-secondary) font-mono">
            <Calendar className="w-3.5 h-3.5 text-(--text-secondary)" />
            {formattedDate}
        </span>
        )}
    </div>

    {/* Project Main Title */}
    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-(--text-primary) leading-tight">
        {title}
    </h1>
    </div>
</div>
);
}