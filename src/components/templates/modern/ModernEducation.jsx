'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, Calendar, Award, ArrowRight } from 'lucide-react';

export default function ModernEducation({ education = [], handle = '' }) {
if (!education || education.length === 0) return null;

// Show top 2-3 items on the main page
const previewItems = education.slice(0, 2);
const viewAllHref = handle ? `/${handle}/education` : '/education';

return (
    <section id="education" className="w-full space-y-6">
    {/* Header Section */}
    <div className="flex items-end justify-between border-b border-(--border-subtle) pb-4">
        <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) tracking-tight">
            Education
        </h2>
        <p className="text-xs sm:text-sm text-(--text-secondary) mt-1">
            Academic background, degrees, and educational qualifications.
        </p>
        </div>
        <Link
        href={viewAllHref}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--accent-warm) hover:underline shrink-0"
        >
        <span>See All ({education.length})</span>
        <ArrowRight className="w-3.5 h-3.5" />
        </Link>
    </div>

    {/* Education Timeline Cards */}
    <div className="relative border-l-2 border-(--border-subtle) ml-3 pl-6 space-y-6">
        {previewItems.map((item) => (
        <div key={item._id} className="relative group">
            {/* Timeline Node */}
            <div className="absolute -left-10 top-1 w-8 h-8 rounded-full bg-(--bg-main) border border-(--border-subtle) group-hover:border-(--accent-warm) flex items-center justify-center transition-all">
            <GraduationCap className="w-4 h-4 text-(--accent-warm)" />
            </div>

            {/* Card Content */}
            <div className="rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-6 space-y-3 shadow-sm hover:border-(--accent-warm)/40 transition-all">
            <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="text-base font-bold text-(--text-primary)">
                {item.institution}
                </h3>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-(--bg-main) border border-(--border-subtle) text-xs text-(--text-secondary)">
                <Calendar className="w-3 h-3 text-(--accent-warm)" />
                <span>
                    {item.startDate} – {item.endDate || 'Present'}
                </span>
                </div>
            </div>

            <div>
                <span className="text-sm font-semibold text-(--accent-warm)">
                {item.degree}
                </span>
                {item.fieldOfStudy && (
                <span className="text-sm text-(--text-secondary)">
                    {' '}in <span className="text-(--text-primary)">{item.fieldOfStudy}</span>
                </span>
                )}
            </div>

            {item.grade && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-(--accent-warm)/10 text-(--accent-warm) text-xs font-medium border border-(--accent-warm)/20">
                <Award className="w-3.5 h-3.5" />
                <span>{item.grade}</span>
                </div>
            )}
            </div>
        </div>
        ))}
    </div>
    </section>
);
}