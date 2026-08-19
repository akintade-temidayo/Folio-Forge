'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function MinimalExperience({ experiences = [], userHandle = '' }) {
if (!experiences || experiences.length === 0) return null;

// Limit display to 4 items on main page
const displayedExperiences = experiences.slice(0, 2);
const experienceHref = userHandle ? `/${userHandle}/experience` : '/experience';

return (
<section id="experience" className="space-y-6 scroll-mt-24">
    {/* Section Header */}
    <div className="pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
    <h2 
        className="text-xs uppercase tracking-widest font-semibold"
        style={{ color: 'var(--text-secondary)' }}
    >
        Work Experience
    </h2>
    </div>

    {/* Stacked Experience Rows */}
    <div className="space-y-8 pt-2">
    {displayedExperiences.map((exp) => {
        const startDate = exp.startDate ? new Date(exp.startDate).getFullYear() : '';
        const endDate = exp.isCurrent ? 'Present' : exp.endDate ? new Date(exp.endDate).getFullYear() : '';
        const periodDisplay = exp.period || (startDate && endDate ? `${startDate} — ${endDate}` : startDate || endDate);

        return (
        <div 
            key={exp._id || exp.id} 
            className="group space-y-2 pb-6 border-b last:border-none last:pb-0"
            style={{ borderColor: 'var(--border-subtle)' }}
        >
            {/* Role & Company Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
            <h3 
                className="font-serif font-semibold text-base sm:text-lg"
                style={{ color: 'var(--text-primary)' }}
            >
                {exp.role || exp.title}
                {exp.company && (
                <span 
                    className="font-sans font-normal text-sm sm:text-base ml-1.5 opacity-80"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    at {exp.company}
                </span>
                )}
            </h3>

            {/* Monospace Period */}
            {periodDisplay && (
                <span 
                className="text-xs font-mono shrink-0"
                style={{ color: 'var(--text-secondary)' }}
                >
                {periodDisplay}
                </span>
            )}
            </div>

            {/* Description */}
            {exp.description && (
            <p 
                className="text-xs sm:text-sm leading-relaxed max-w-2xl pt-1"
                style={{ color: 'var(--text-secondary)' }}
            >
                {exp.description}
            </p>
            )}

            {/* Technologies / Skills Tags */}
            {exp.technologies && exp.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
                {exp.technologies.map((tech, idx) => (
                <span
                    key={idx}
                    className="text-[11px] font-mono px-2 py-0.5 rounded border"
                    style={{
                    borderColor: 'var(--border-subtle)',
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--text-secondary)',
                    }}
                >
                    {tech}
                </span>
                ))}
            </div>
            )}
        </div>
        );
    })}
    </div>

    {/* See All Experience Link */}
    <div className="pt-2 flex justify-end">
    <Link
        href={experienceHref}
        className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider transition-colors group cursor-pointer hover:opacity-80"
        style={{ color: 'var(--text-primary)' }}
    >
        <span>See All Experience ({experiences.length})</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
    </Link>
    </div>
</section>
);
}