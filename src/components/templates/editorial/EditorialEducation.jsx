'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, ArrowRight } from 'lucide-react';

export default function EditorialEducation({ education = [], userHandle = '' }) {
if (!education || education.length === 0) return null;

const displayedEducation = education.slice(0, 2);
const educationHref = userHandle ? `/${userHandle}/education` : '/education';

return (
    <section className="space-y-8">
    {/* Header */}
    <div className="flex items-center justify-between border-b border-(--border-subtle) pb-4">
        <div className="flex items-center gap-2">
        <GraduationCap className="w-4 h-4 text-(--accent-warm)" />
        <h2 className="text-xs font-bold uppercase tracking-widest text-(--text-secondary)">
            Education Background
        </h2>
        </div>

        <Link
        href={educationHref}
        className="text-xs font-semibold hover:text-(--accent-warm) transition-colors flex items-center gap-1 text-(--text-secondary)"
        >
        <span>See All ({education.length})</span>
        <ArrowRight className="w-3.5 h-3.5" />
        </Link>
    </div>

    {/* Numbered Editorial Cards */}
    <div className="space-y-6">
        {displayedEducation.map((item, index) => {
        const itemNumber = String(index + 1).padStart(2, '0');

        const startDate = item.startDate ? new Date(item.startDate).getFullYear() : '';
        const endDate = item.endDate ? new Date(item.endDate).getFullYear() : 'Present';
        const periodDisplay = item.period || (startDate ? `${startDate} — ${endDate}` : '');

        return (
            <div
            key={item._id || item.id || index}
            className="rounded-3xl p-6 sm:p-8 border flex flex-col md:flex-row md:items-start justify-between gap-6 transition-all duration-300 hover:border-(--accent-warm)/50"
            style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
            }}
            >
            <div className="flex items-start gap-4">
                <span className="text-xl font-serif font-black text-(--accent-warm) opacity-80 pt-1">
                {itemNumber}
                </span>

                <div className="space-y-1">
                <h3
                    className="text-lg font-serif font-bold"
                    style={{ color: 'var(--text-primary)' }}
                >
                    {item.degree}
                    {item.fieldOfStudy && ` in ${item.fieldOfStudy}`}
                </h3>

                {item.institution && (
                    <p
                    className="text-xs font-semibold"
                    style={{ color: 'var(--accent-warm)' }}
                    >
                    {item.institution}
                    </p>
                )}

                {item.grade && (
                    <div className="pt-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-(--border-subtle) text-(--text-secondary) bg-(--bg-main)">
                        Grade: {item.grade}
                    </span>
                    </div>
                )}
                </div>
            </div>

            {periodDisplay && (
                <span className="text-xs font-medium px-3 py-1 rounded-full border border-(--border-subtle) self-start text-(--text-secondary) bg-(--bg-main) shrink-0 font-mono">
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