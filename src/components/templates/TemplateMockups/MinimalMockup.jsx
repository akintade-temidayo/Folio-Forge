import React from 'react';

export default function MinimalMockup() {
return (
<div
    className="w-full rounded-xl p-3 border space-y-2.5 font-sans transition-colors"
    style={{
    backgroundColor: 'var(--bg-main)',
    borderColor: 'var(--border-subtle)',
    }}
>
    <div
    className="py-2 px-2.5 rounded-lg border border-dashed space-y-1 text-left"
    style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--accent-warm)',
    }}
    >
    <p className="text-[9px] font-bold tracking-wider uppercase" style={{ color: 'var(--accent-warm)' }}>
        Minimal Header
    </p>
    <p className="text-[10px] font-medium" style={{ color: 'var(--text-primary)' }}>
        Name, Short Bio & Contact CTA
    </p>
    <p className="text-[8px] font-medium tracking-wide pt-0.5 opacity-80" style={{ color: 'var(--text-secondary)' }}>
        React • Next.js • UI Design
    </p>
    </div>

    <div
    className="p-2 rounded-lg border border-dashed space-y-1"
    style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
    }}
    >
    <p className="text-[8px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
        Full-Width Projects
    </p>
    <div className="space-y-1">
        <div
        className="h-6 rounded border flex items-center justify-between px-2 text-[9px]"
        style={{
            backgroundColor: 'var(--bg-main)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-primary)',
        }}
        >
        <span>Project Title</span>
        <span className="text-[8px] font-mono" style={{ color: 'var(--accent-warm)' }}>
            View →
        </span>
        </div>
    </div>
    </div>

    <div
    className="p-2 rounded-lg border border-dashed space-y-1"
    style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
    }}
    >
    <p className="text-[8px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
        Work Experience
    </p>
    <div
        className="h-6 rounded border flex items-center justify-between px-2 text-[9px]"
        style={{
        backgroundColor: 'var(--bg-main)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)',
        }}
    >
        <span>Role at Company</span>
        <span className="text-[8px] font-mono" style={{ color: 'var(--text-secondary)' }}>
        2024
        </span>
    </div>
    </div>

    <div
    className="p-2 rounded-lg border border-dashed space-y-1"
    style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
    }}
    >
    <p className="text-[8px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
        Services Offered
    </p>
    <div
        className="h-6 rounded border flex items-center justify-between px-2 text-[9px]"
        style={{
        backgroundColor: 'var(--bg-main)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)',
        }}
    >
        <span>Service Name</span>
        <span className="text-[8px] font-mono" style={{ color: 'var(--text-secondary)' }}>
        Rate
        </span>
    </div>
    </div>

    <div
    className="p-2 rounded-lg border border-dashed space-y-1"
    style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
    }}
    >
    <p className="text-[8px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
        Client Reviews
    </p>
    <div
        className="h-6 rounded border flex items-center justify-between px-2 text-[9px] italic font-serif"
        style={{
        backgroundColor: 'var(--bg-main)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)',
        }}
    >
        <span>&quot;Client feedback quote...&quot;</span>
        <span className="text-[8px]" style={{ color: 'var(--accent-warm)' }}>
        ★★★★★
        </span>
    </div>
    </div>
</div>
);
}