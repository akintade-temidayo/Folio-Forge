'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, Calendar, Award, ArrowRight } from 'lucide-react';

export default function BentoEducation({ education = [], userHandle = '' }) {
if (!education || education.length === 0) return null;

let handle = userHandle;
if (!handle && typeof window !== 'undefined') {
    handle = window.location.pathname.split('/')[1] || '';
}

const educationHref = handle ? `/${handle}/education` : '/education';
const displayedEducation = education.slice(0, 4);

return (
    <section id="education" className="space-y-4">
    {/* Section Header */}
    <div className="flex items-center justify-between pb-1">
        <h2
        className="text-xs font-bold uppercase tracking-widest flex items-center gap-2"
        style={{ color: 'var(--text-secondary)' }}
        >
        <GraduationCap className="w-4 h-4" style={{ color: 'var(--accent-warm)' }} />
        <span>Education</span>
        </h2>
    </div>

    {/* Bento Grid (Up to 4 Items) */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedEducation.map((item, idx) => {
        const startDate = item.startDate ? new Date(item.startDate).getFullYear() : '';
        const endDate = item.endDate ? new Date(item.endDate).getFullYear() : 'Present';
        const period = startDate ? `${startDate} – ${endDate}` : item.period || '';

        return (
            <div
            key={item._id || item.id || idx}
            className="group rounded-2xl p-5 border flex flex-col justify-between space-y-4 transition-all duration-300 hover:border-(--accent-warm)/50"
            style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
            }}
            >
            <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                <div>
                    <h3
                    className="text-sm font-bold transition-colors group-hover:text-(--accent-warm)"
                    style={{ color: 'var(--text-primary)' }}
                    >
                    {item.degree}
                    </h3>

                    {item.fieldOfStudy && (
                    <p
                        className="text-xs font-medium mt-0.5"
                        style={{ color: 'var(--accent-warm)' }}
                    >
                        {item.fieldOfStudy}
                    </p>
                    )}

                    {item.institution && (
                    <p
                        className="text-xs font-medium mt-1"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        {item.institution}
                    </p>
                    )}
                </div>

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
            </div>

            {item.grade && (
                <div className="pt-2">
                <span
                    className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border"
                    style={{
                    backgroundColor: 'var(--bg-main)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-secondary)',
                    }}
                >
                    <Award className="w-3 h-3 text-(--accent-warm)" />
                    <span>Grade: {item.grade}</span>
                </span>
                </div>
            )}
            </div>
        );
        })}
    </div>

    {/* Footer Link: View All Education */}
    <div className="pt-2 flex justify-end">
        <Link
        href={educationHref}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all hover:underline"
        style={{ color: 'var(--accent-warm)' }}
        >
        <span>View All Education ({education.length})</span>
        <ArrowRight className="w-3.5 h-3.5" />
        </Link>
    </div>
    </section>
);
}