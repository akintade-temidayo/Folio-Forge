'use client';

import React from 'react';

export default function ModernMockup() {
return (
    <div className="rounded-xl border border-(--border-subtle) bg-(--bg-main) p-3 space-y-3 font-sans">
    <div className="rounded-lg border border-dashed border-(--accent-warm)/40 bg-(--accent-warm)/5 p-3 text-center">
        <span className="text-[9px] font-bold tracking-wider text-(--accent-warm) uppercase block">
        HEADER & INTRO SECTION
        </span>
        <span className="text-[10px] font-medium text-(--text-secondary)">
        Your Name + Short Bio
        </span>
    </div>

    <div className="rounded-lg border border-dashed border-(--border-subtle) bg-(--bg-surface)/50 p-2.5 space-y-1.5">
        <span className="text-[9px] font-bold tracking-wider text-(--text-secondary) uppercase block">
        PROJECTS GRID (2 COLUMNS)
        </span>
        <div className="grid grid-cols-2 gap-2">
        <div className="rounded border border-(--border-subtle) bg-(--bg-main) p-2 text-center text-[10px] text-(--text-secondary)">
            Project Card 1
        </div>
        <div className="rounded border border-(--border-subtle) bg-(--bg-main) p-2 text-center text-[10px] text-(--text-secondary)">
            Project Card 2
        </div>
        </div>
    </div>

    <div className="rounded-lg border border-dashed border-(--border-subtle) bg-(--bg-surface)/50 p-2 space-y-1">
        <span className="text-[9px] font-bold text-(--text-secondary) uppercase block">
        WORK EXPERIENCE
        </span>
        <div className="rounded bg-(--bg-main) p-1 text-center text-[9px] text-(--text-secondary)">
        Experience Timeline / Roles
        </div>
    </div>

    <div className="rounded-lg border border-dashed border-(--border-subtle) bg-(--bg-surface)/50 p-2.5 space-y-1.5">
        <span className="text-[9px] font-bold tracking-wider text-(--text-secondary) uppercase block">
        EDUCATION & CERTIFICATIONS (2 COLUMNS)
        </span>
        <div className="grid grid-cols-2 gap-2">
        <div className="rounded border border-(--border-subtle) bg-(--bg-main) p-2 text-center text-[10px] text-(--text-secondary)">
            Education Card
        </div>
        <div className="rounded border border-(--border-subtle) bg-(--bg-main) p-2 text-center text-[10px] text-(--text-secondary)">
            Certification Card
        </div>
        </div>
    </div>

    <div className="rounded-lg border border-dashed border-(--border-subtle) bg-(--bg-surface)/50 p-2.5 space-y-1.5">
        <span className="text-[9px] font-bold tracking-wider text-(--text-secondary) uppercase block">
        SERVICES OFFERED (2 COLUMNS)
        </span>
        <div className="grid grid-cols-2 gap-2">
        <div className="rounded border border-(--border-subtle) bg-(--bg-main) p-2 text-center text-[10px] text-(--text-secondary)">
            Service Card 1
        </div>
        <div className="rounded border border-(--border-subtle) bg-(--bg-main) p-2 text-center text-[10px] text-(--text-secondary)">
            Service Card 2
        </div>
        </div>
    </div>

    <div className="rounded-lg border border-dashed border-(--border-subtle) bg-(--bg-surface)/50 p-2.5 space-y-1.5">
        <span className="text-[9px] font-bold tracking-wider text-(--text-secondary) uppercase block">
        CLIENT REVIEWS (2 COLUMNS)
        </span>
        <div className="grid grid-cols-2 gap-2">
        <div className="rounded border border-(--border-subtle) bg-(--bg-main) p-2 text-center text-[10px] text-(--text-secondary)">
            Review Card 1
        </div>
        <div className="rounded border border-(--border-subtle) bg-(--bg-main) p-2 text-center text-[10px] text-(--text-secondary)">
            Review Card 2
        </div>
        </div>
    </div>
    </div>
);
}