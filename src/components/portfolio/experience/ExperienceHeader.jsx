'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Briefcase } from 'lucide-react';
import Button from '@/components/ui/Button'; // Adjust button path if needed

export default function ExperienceHeader({ handle, totalCount = 0 }) {
return (
<div className="space-y-6">
    <Link href={`/${handle}`}>
    <Button variant="outline" size="sm" className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Portfolio</span>
    </Button>
    </Link>

    <div className="mt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-(--border-subtle) pb-6">
    <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-(--accent-warm) uppercase tracking-wider mb-1">
        <Briefcase className="w-4 h-4" />
        <span>Career History</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        Work Experience
        </h1>
        <p className="text-sm text-(--text-secondary) mt-1">
        A comprehensive overview of my professional roles, milestones, and contributions.
        </p>
    </div>

    <div className="px-3 py-1.5 rounded-full bg-(--bg-surface) border border-(--border-subtle) text-xs text-(--text-secondary)] font-medium self-start sm:self-auto">
        {totalCount} {totalCount === 1 ? 'Role' : 'Roles'} Recorded
    </div>      
    </div>
</div>
);
}