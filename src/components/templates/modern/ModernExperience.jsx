'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Building2, Calendar, MapPin } from 'lucide-react';

export default function ModernExperience({ experiences = [], handle }) {
if (!experiences || experiences.length === 0) return null;

// Show maximum of 3 on portfolio page
const displayExperiences = experiences.slice(0, 3);

return (
<section className="py-12 space-y-8">
    {/* Section Header */}
    <div className="flex items-center justify-between">
    <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-(--text-primary)">
        Work Experience
        </h2>
        <p className="text-xs sm:text-sm text-(--text-secondary) mt-1">
        Highlights of my career journey and professional milestones.
        </p>
    </div>

    {/* Always display the link (matching Services section format) */}
    <Link
        href={`/${handle}/experience`}
        className="group flex items-center gap-1.5 text-xs font-semibold text-(--accent-warm) hover:underline"
    >
        <span>See All ({experiences.length})</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
    </Link>
    </div>

    {/* Horizontal Timeline Wrapper */}
    <div className="relative pt-1">
    {/* Horizontal Connecting Line for Desktop */}
    <div className="hidden md:block absolute top-15px left-0 right-0 h-0.5 bg-(--border-subtle) z-0" />

    {/* Timeline Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {displayExperiences.map((exp) => (
        <div key={exp._id || exp.id} className="relative flex flex-col space-y-3">
            {/* Timeline Dot Indicator */}
            <div className="hidden md:flex items-center mb-2">
            <div className="w-4 h-4 rounded-full bg-(--accent-warm) border-4 border-(--bg-main) shadow-sm" />
            </div>

            {/* Experience Card */}
            <div className="h-full rounded-2xl bg-(--bg-surface) border border-(--border-subtle) p-5 flex flex-col justify-between hover:border-(--accent-warm)/40 transition-all shadow-sm">
            <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium text-(--accent-warm) bg-(--accent-warm)/10 px-2.5 py-1 rounded-full w-fit">
                <Calendar className="w-3 h-3" />
                {exp.period}
                </span>

                <div>
                <h3 className="text-base font-bold text-(--text-primary) line-clamp-1">
                    {exp.role}
                </h3>
                <div className="flex items-center gap-2 text-xs text-(--text-secondary) mt-0.5">
                    <span className="flex items-center gap-1 font-medium">
                    <Building2 className="w-3.5 h-3.5" />
                    {exp.company}
                    </span>
                    {exp.location && (
                    <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                        </span>
                    </>
                    )}
                </div>
                </div>

                {exp.description && (
                <p className="text-xs text-(--text-secondary) leading-relaxed line-clamp-3 pt-1">
                    {exp.description}
                </p>
                )}
            </div>
            </div>
        </div>
        ))}
    </div>
    </div>

    {/* Mobile See All Button */}
    <div className="block md:hidden pt-2 text-center">
    <Link
        href={`/${handle}/experience`}
        className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-(--bg-surface) border border-(--border-subtle) text-(--accent-warm)"
    >
        <span>View Full Timeline ({experiences.length})</span>
        <ArrowRight className="w-3.5 h-3.5" />
    </Link>
    </div>
</section>
);
}