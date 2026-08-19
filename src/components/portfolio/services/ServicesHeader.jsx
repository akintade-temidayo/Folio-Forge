'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import { GrServices } from "react-icons/gr";

export default function ServicesHeader({ handle, totalCount = 0 }) {
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
        <GrServices className="w-6 h-6" />
        Services Offered
        </h1>
    </div>

    <div className="px-3 py-1.5 rounded-full bg-(--bg-surface) border border-(--border-subtle) text-xs text-(--text-secondary) font-medium self-start sm:self-auto">
        {totalCount} {totalCount === 1 ? 'Service' : 'Services'} Available
    </div>
    </div>
</div>
);
}