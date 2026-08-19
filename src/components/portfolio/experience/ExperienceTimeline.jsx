'use client';

import React from 'react';
import { Building2, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function ExperienceTimeline({ experiences = [] }) {
if (!experiences || experiences.length === 0) {
return (
    <div className="w-full text-center py-16 border border-dashed border-(--border-subtle) rounded-2xl bg-(--bg-surface)/30">
    <p className="text-sm text-(--text-secondary)">
        No experience records listed yet.
    </p>
    </div>
);
}

return (
<div className="relative pl-6 sm:pl-8 space-y-8 my-6">
    {/* Vertical Continuous Timeline Line */}
    <div className="absolute top-3 bottom-3 left-2.5 sm:left-3.5 w-0.5 bg-(--border-subtle) rounded-full" />

    {experiences.map((exp, index) => {
    const key = exp._id || exp.id || index;
    return (
        <div key={key} className="relative group pl-2 sm:pl-4">
        {/* Timeline Dot Indicator - Perfectly Centered on Line */}
        <div className="absolute -left-5.75 sm:-left-6.75 top-7 w-3.5 h-3.5 rounded-full bg-(--accent-warm) border-2 border-(--bg-main) ring-4 ring-(--bg-main) z-10 group-hover:scale-125 transition-transform" />

        {/* Experience Card */}
        <div className="rounded-2xl bg-(--bg-surface) border border-(--border-subtle) p-6 space-y-4 hover:border-(--accent-warm)/40 transition-all shadow-xs">
            {/* Card Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-(--border-subtle)/60 pb-4">
            <div className="space-y-1">
                <h3 className="text-lg font-bold text-(--text-primary)">
                {exp.role}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs text-(--text-secondary)">
                <span className="flex items-center gap-1 font-medium text-(--text-primary)">
                    <Building2 className="w-3.5 h-3.5 text-(--accent-warm)" />
                    {exp.company}
                </span>
                {exp.location && (
                    <>
                    <span className="text-(--text-secondary)/40">•</span>
                    <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                    </span>
                    </>
                )}
                </div>
            </div>

            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-(--accent-warm) bg-(--accent-warm)/10 px-3 py-1 rounded-full w-fit shrink-0">
                <Calendar className="w-3.5 h-3.5" />
                {exp.period || (exp.startDate ? `${exp.startDate} - ${exp.endDate || 'Present'}` : '')}
            </span>
            </div>

            {/* Description */}
            {exp.description && (
            <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
                {exp.description}
            </p>
            )}

            {/* Key Achievements (if applicable) */}
            {Array.isArray(exp.highlights) && exp.highlights.length > 0 && (
            <div className="space-y-2 pt-1">
                <h4 className="text-[11px] font-semibold text-(--text-primary) uppercase tracking-wider">
                Key Achievements
                </h4>
                <ul className="space-y-1.5">
                {exp.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-(--text-secondary)">
                    <CheckCircle2 className="w-3.5 h-3.5 text-(--accent-warm) shrink-0 mt-0.5" />
                    <span>{item}</span>
                    </li>
                ))}
                </ul>
            </div>
            )}

            {/* Skills Tags (if applicable) */}
            {Array.isArray(exp.skills) && exp.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
                {exp.skills.map((skill, idx) => (
                <span
                    key={idx}
                    className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-(--bg-main) border border-(--border-subtle) text-(--text-secondary)"
                >
                    {skill}
                </span>
                ))}
            </div>
            )}
        </div>
        </div>
    );
    })}
</div>
);
}