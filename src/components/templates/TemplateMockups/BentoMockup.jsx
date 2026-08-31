'use client';

import React from 'react';

export default function BentoMockup() {
return (
    <div
    className="w-full rounded-xl p-3 border space-y-2.5 font-sans transition-colors"
    style={{
        backgroundColor: 'var(--bg-main)',
        borderColor: 'var(--border-subtle)',
    }}
    >
    {/* 1. Bento Top Block (Bio + Quick CTA/Status) */}
    <div className="grid grid-cols-3 gap-2">
        <div
        className="col-span-2 p-2.5 rounded-lg border border-dashed text-left space-y-1"
        style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--accent-warm)',
        }}
        >
        <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--accent-warm)' }}>
            Bio Box
        </p>
        <p className="text-[10px] font-medium" style={{ color: 'var(--text-primary)' }}>
            Name & Headline
        </p>
        <p className="text-[8px] font-medium tracking-wide opacity-80" style={{ color: 'var(--text-secondary)' }}>
            React • Next.js • Tailwind
        </p>
        </div>
        <div
        className="p-2 rounded-lg border border-dashed flex flex-col justify-between text-center"
        style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
        }}
        >
        <p className="text-[8px] uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>Collabo...</p>
        <span className="text-[9px] font-semibold" style={{ color: 'var(--accent-warm)' }}>Available →</span>
        </div>
    </div>

    {/* 2. Bento Work Showcase Grid */}
    <div className="grid grid-cols-3 gap-2">
        <div
        className="col-span-1 p-2 rounded-lg border border-dashed flex flex-col justify-between text-left"
        style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
        }}
        >
        <span className="text-[8px] font-mono" style={{ color: 'var(--accent-warm)' }}>Featured</span>
        <span className="text-[9px] font-medium" style={{ color: 'var(--text-primary)' }}>Hero Work</span>
        </div>

        <div className="col-span-2 space-y-1.5">
        <div
            className="h-6 rounded border flex items-center px-2 text-[9px]"
            style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-primary)',
            }}
        >
            Project Card A
        </div>
        <div
            className="h-6 rounded border flex items-center px-2 text-[9px]"
            style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-primary)',
            }}
        >
            Project Card B
        </div>
        </div>
    </div>

    {/* 3. Experience, Education & Certifications Grid */}
    <div className="grid grid-cols-3 gap-2">
        <div
        className="p-2 rounded-lg border border-dashed space-y-1"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
        <p className="text-[8px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Experience</p>
        <div className="h-5 rounded border flex items-center px-1.5 text-[8px]" style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-subtle)' }}>
            Role & Co.
        </div>
        </div>

        <div
        className="p-2 rounded-lg border border-dashed space-y-1"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
        <p className="text-[8px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Education</p>
        <div className="h-5 rounded border flex items-center px-1.5 text-[8px]" style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-subtle)' }}>
            Degree / Major
        </div>
        </div>

        <div
        className="p-2 rounded-lg border border-dashed space-y-1"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
        <p className="text-[8px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Certificates</p>
        <div className="h-5 rounded border flex items-center px-1.5 text-[8px]" style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-subtle)' }}>
            Verified Badge
        </div>
        </div>
    </div>

    {/* 4. Services & Client Reviews Bento Box */}
    <div className="grid grid-cols-3 gap-2">
        <div
        className="p-2 rounded-lg border border-dashed space-y-1"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
        <p className="text-[8px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Services</p>
        <div className="h-5 rounded border flex items-center px-1.5 text-[8px]" style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-subtle)' }}>
            Full-Stack Dev
        </div>
        </div>

        <div
        className="col-span-2 p-2 rounded-lg border border-dashed space-y-1"
        style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
        }}
        >
        <p className="text-[8px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
            Testimonials Block
        </p>
        <div
            className="h-5 rounded border flex items-center justify-between px-2 text-[8px] italic"
            style={{
            backgroundColor: 'var(--bg-main)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-primary)',
            }}
        >
            <span>&quot;Delivered on time...&quot;</span>
            <span className="text-[7px]" style={{ color: 'var(--accent-warm)' }}>★★★★★</span>
        </div>
        </div>
    </div>
    </div>
);
}