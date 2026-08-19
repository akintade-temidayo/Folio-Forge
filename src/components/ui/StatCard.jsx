'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, FolderGit2, Briefcase } from 'lucide-react';

const ICON_MAP = {
projects: FolderGit2,
services: Briefcase,
};

export default function StatCard({ title, count, iconType, href, linkText }) {
const Icon = ICON_MAP[iconType] || FolderGit2;

return (
<Link
    href={href}
    className="group rounded-2xl p-6 border flex items-center justify-between transition-all duration-300 hover:border-(--accent-warm)/50 hover:scale-[1.01]"
    style={{
    backgroundColor: 'var(--bg-surface)',
    borderColor: 'var(--border-subtle)',
    }}
>
    <div className="space-y-1">
    <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
        <Icon className="w-4 h-4" style={{ color: 'var(--accent-warm)' }} />
        <span>{title}</span>
    </div>
    
    <p className="text-3xl font-bold font-serif" style={{ color: 'var(--text-primary)' }}>
        {count}
    </p>
    
    {linkText && (
        <p 
        className="text-xs transition-colors flex items-center gap-1 pt-1 group-hover:text-(--accent-warm)"
        style={{ color: 'var(--text-secondary)' }}
        >
        <span>{linkText}</span>
        <ArrowRight className="w-3 h-3" />
        </p>
    )}
    </div>
</Link>
);
}