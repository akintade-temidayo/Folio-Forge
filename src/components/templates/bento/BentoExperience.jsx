'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, Calendar, Building2, ArrowRight } from 'lucide-react';

export default function BentoExperience({ experiences = [], userHandle = '' }) {
if (!experiences || experiences.length === 0) return null;

// Clean handle for dynamic routing
let handle = userHandle;
if (!handle && typeof window !== 'undefined') {
handle = window.location.pathname.split('/')[1] || '';
}

const experienceHref = handle ? `/${handle}/experience` : '/experience';

// Limit strictly to 4 experiences
const displayedExperiences = experiences.slice(0, 4);

return (
<section id="experience" className="space-y-4">
    {/* Section Header */}
    <div className="flex items-center justify-between pb-1">
    <h2 
        className="text-xs font-bold uppercase tracking-widest flex items-center gap-2"
        style={{ color: 'var(--text-secondary)' }}
    >
        <Briefcase className="w-4 h-4" style={{ color: 'var(--accent-warm)' }} />
        <span>Experience</span>
    </h2>
    </div>

    {/* Experience Grid (Up to 4 Items) */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {displayedExperiences.map((exp, idx) => {
        const company = exp.company || exp.organization || '';
        const role = exp.role || exp.title || exp.position || 'Role';
        const period = exp.period || exp.duration || exp.date || exp.year || '';
        const description = exp.description || exp.summary || '';
        const skills = exp.skills || exp.technologies || [];

        return (
        <div
            key={exp._id || exp.id || idx}
            className="group rounded-2xl p-5 border flex flex-col justify-between space-y-4 transition-all duration-300 hover:border-(--accent-warm)/50"
            style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
            }}
        >
            {/* Header Info */}
            <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
                <div>
                <h3
                    className="text-sm font-bold transition-colors group-hover:text-(--accent-warm)"
                    style={{ color: 'var(--text-primary)' }}
                >
                    {role}
                </h3>

                {company && (
                    <p
                    className="text-xs font-medium flex items-center gap-1.5 mt-0.5"
                    style={{ color: 'var(--text-secondary)' }}
                    >
                    <Building2 className="w-3.5 h-3.5 shrink-0 opacity-70" />
                    <span>{company}</span>
                    </p>
                )}
                </div>

                {/* Period Badge */}
                {period && (
                <span
                    className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-md border shrink-0"
                    style={{
                    backgroundColor: 'var(--bg-main)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--accent-warm)',
                    }}
                >
                    <Calendar className="w-3 h-3" />
                    <span>{period}</span>
                </span>
                )}
            </div>

            {/* Description */}
            {description && (
                <p
                className="text-xs line-clamp-3 leading-relaxed pt-1"
                style={{ color: 'var(--text-secondary)' }}
                >
                {description}
                </p>
            )}
            </div>

            {/* Skills / Tech Stack Badges */}
            {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
                {skills.slice(0, 4).map((skill, i) => (
                <span
                    key={i}
                    className="text-[9px] px-2 py-0.5 rounded border font-mono"
                    style={{
                    backgroundColor: 'var(--bg-main)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-secondary)',
                    }}
                >
                    {skill}
                </span>
                ))}
            </div>
            )}
        </div>
        );
    })}
    </div>

    {/* Footer Link: View All Experience */}
    <div className="pt-2 flex justify-end">
    <Link
        href={experienceHref}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all hover:underline"
        style={{ color: 'var(--accent-warm)' }}
    >
        <span>View All Experience ({experiences.length})</span>
        <ArrowRight className="w-3.5 h-3.5" />
    </Link>
    </div>
</section>
);
}