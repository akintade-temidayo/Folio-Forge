'use client';

import React from 'react';
import Link from 'next/link';
import { History, ArrowRight } from 'lucide-react';

export default function EditorialExperience({ experiences = [], userHandle = '' }) {
if (!experiences || experiences.length === 0) return null;

// Limit display to 2 items on main template view
const displayedExperiences = experiences.slice(0, 2);
const experienceHref = userHandle ? `/${userHandle}/experience` : '/experience';

return (
<section className="space-y-8">
    {/* Header */}
    <div className="flex items-center justify-between border-b border-(--border-subtle) pb-4">
    <div className="flex items-center gap-2">
        <History className="w-4 h-4 text-(--accent-warm)" />
        <h2 className="text-xs font-bold uppercase tracking-widest text-(--text-secondary)">
        Work Experience
        </h2>
    </div>
    
    {/* See All Experience Link */}
    <Link
        href={experienceHref}
        className="text-xs font-semibold hover:text-(--accent-warm) transition-colors flex items-center gap-1 text-(--text-secondary)"
    >
        <span>See All ({experiences.length})</span>
        <ArrowRight className="w-3.5 h-3.5" />
    </Link>
    </div>

    {/* Numbered Cards */}
    <div className="space-y-6">
    {displayedExperiences.map((exp, index) => {
        const expNumber = String(index + 1).padStart(2, '0');

        // Date formatting logic
        const startDate = exp.startDate ? new Date(exp.startDate).getFullYear() : '';
        const endDate = exp.isCurrent ? 'Present' : exp.endDate ? new Date(exp.endDate).getFullYear() : '';
        const periodDisplay = exp.period || (startDate && endDate ? `${startDate} — ${endDate}` : startDate || endDate);

        return (
        <div
            key={exp._id || exp.id || index}
            className="rounded-3xl p-6 sm:p-8 border flex flex-col md:flex-row md:items-start justify-between gap-6 transition-all duration-300 hover:border-(--accent-warm)/50"
            style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
            }}
        >
            <div className="flex items-start gap-4">
            <span className="text-xl font-serif font-black text-(--accent-warm) opacity-80 pt-1">
                {expNumber}
            </span>

            <div className="space-y-1">
                <h3
                className="text-lg font-serif font-bold"
                style={{ color: 'var(--text-primary)' }}
                >
                {exp.role || exp.title}
                </h3>

                {exp.company && (
                <p
                    className="text-xs font-semibold"
                    style={{ color: 'var(--accent-warm)' }}
                >
                    {exp.company}
                </p>
                )}

                {exp.description && (
                <p className="text-xs text-(--text-secondary) pt-2 leading-relaxed max-w-2xl">
                    {exp.description}
                </p>
                )}

                {/* Skills / Technologies */}
                {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-3">
                    {exp.technologies.map((tech, idx) => (
                    <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded border border-(--border-subtle) text-(--text-secondary) bg-(--bg-main)"
                    >
                        {tech}
                    </span>
                    ))}
                </div>
                )}
            </div>
            </div>

            {/* Period Display */}
            {periodDisplay && (
            <span className="text-xs font-medium px-3 py-1 rounded-full border border-(--border-subtle) self-start text-(--text-secondary) bg-(--bg-main) shrink-0">
                {periodDisplay}
            </span>
            )}
        </div>
        );
    })}
    </div>
</section>
);
}