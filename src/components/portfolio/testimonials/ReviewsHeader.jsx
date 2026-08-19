'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft,  Plus, StarCheck } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ReviewsHeader({ handle, totalCount = 0, onOpenModal }) {
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
        <h1 className="flex items-center gap-2 text-3xl md:text-4xl font-extrabold tracking-tight">
        <StarCheck className="w-7 h-7" />
        Client Testimonials
        </h1>
        <p className="text-sm text-(--text-secondary) mt-1">
        Feedback and experiences shared by clients and collaborators.
        </p>
    </div>

    <div className="flex items-center gap-3">
        <div className="px-3 py-1.5 rounded-full bg-(--bg-surface) border border-(--border-subtle) text-xs text-(--text-secondary) font-medium">
        {totalCount} {totalCount === 1 ? 'Review' : 'Reviews'}
        </div>

        <Button variant="primary" size="md" className="gap-2" onClick={onOpenModal}>
        <Plus className="w-4 h-4" />
        <span>Leave a Review</span>
        </Button>
    </div>
    </div>
</div>
);
}