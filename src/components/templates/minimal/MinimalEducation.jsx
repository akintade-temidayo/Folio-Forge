'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function MinimalEducation({ education = [], userHandle = '' }) {
if (!education || education.length === 0) return null;

const displayedEducation = education.slice(0, 2);
const educationHref = userHandle ? `/${userHandle}/education` : '/education';

return (
    <section id="education" className="space-y-6 scroll-mt-24">
    {/* Section Header */}
    <div className="pb-3 border-b border-(--border-subtle)">
        <h2 className="text-xs uppercase tracking-widest font-semibold text-(--text-secondary)">
        Education & Academic Background
        </h2>
    </div>

    {/* Stacked Education Rows */}
    <div className="space-y-8 pt-2">
        {displayedEducation.map((item) => {
        const startDate = item.startDate ? new Date(item.startDate).getFullYear() : '';
        const endDate = item.endDate ? new Date(item.endDate).getFullYear() : 'Present';
        const periodDisplay = startDate ? `${startDate} — ${endDate}` : (item.period || '');

        return (
            <div
            key={item._id || item.id}
            className="group space-y-2 pb-6 border-b border-(--border-subtle) last:border-none last:pb-0"
            >
            {/* Degree & Institution Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                <h3 className="font-serif font-semibold text-base sm:text-lg text-(--text-primary)">
                {item.degree}
                {item.fieldOfStudy && (
                    <span className="font-sans font-normal text-sm sm:text-base text-(--text-secondary) ml-1.5 opacity-90">
                    in {item.fieldOfStudy}
                    </span>
                )}
                {item.institution && (
                    <span className="block sm:inline font-sans font-normal text-xs sm:text-sm text-(--text-secondary) sm:ml-2 opacity-75">
                    — {item.institution}
                    </span>
                )}
                </h3>

                {/* Monospace Period */}
                {periodDisplay && (
                <span className="text-xs font-mono shrink-0 text-(--text-secondary)">
                    {periodDisplay}
                </span>
                )}
            </div>

            {/* Grade / Honors */}
            {item.grade && (
                <div className="pt-1">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-(--border-subtle) bg-(--bg-surface) text-(--text-secondary)">
                    Grade: {item.grade}
                </span>
                </div>
            )}
            </div>
        );
        })}
    </div>

    {/* See All Education Link */}
    <div className="pt-2 flex justify-end">
        <Link
        href={educationHref}
        className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-(--text-primary) transition-colors group cursor-pointer hover:opacity-80"
        >
        <span>See All Education ({education.length})</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
    </div>
    </section>
);
}