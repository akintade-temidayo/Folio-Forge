'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CertificationsHeader({ handle, userName }) {
return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--border-subtle) pb-6">
    <div>
        <Link
        href={`/${handle}`}
        className="inline-flex items-center gap-2 text-xs font-medium text-(--text-secondary) hover:text-(--accent-warm) transition-colors mb-3"
        >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Portfolio</span>
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-(--text-primary)">
        Certifications & Credentials
        </h1>
        <p className="text-sm text-(--text-secondary) mt-1">
        Verified professional licenses, badges, and certifications earned by{' '}
        <span className="font-semibold text-(--text-primary)">{userName}</span>.
        </p>
    </div>
    </div>
);
}