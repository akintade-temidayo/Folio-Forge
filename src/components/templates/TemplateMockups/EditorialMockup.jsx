import React from 'react';

export default function EditorialMockup() {
return (
<div
    className="w-full rounded-xl p-3 border space-y-2.5 font-sans transition-colors"
    style={{
    backgroundColor: 'var(--bg-main)',
    borderColor: 'var(--border-subtle)',
    }}
>
    {/* 1. Split Editorial Header */}
    <div
    className="grid grid-cols-3 gap-2 p-2.5 rounded-lg border border-dashed text-left"
    style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--accent-warm)',
    }}
    >
    <div className="col-span-2 space-y-1">
        <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--accent-warm)' }}>
        Editorial Header
        </p>
        <p className="text-[10px] font-medium" style={{ color: 'var(--text-primary)' }}>
        Serif Title & Bio Intro
        </p>
        <p className="text-[8px] opacity-80" style={{ color: 'var(--text-secondary)' }}>
        Design • Strategy • Direction
        </p>
    </div>
    <div
        className="flex items-center justify-center rounded-lg text-[9px] font-bold text-white shadow-sm"
        style={{ backgroundColor: 'var(--accent-warm)' }}
    >
        Get in Touch
    </div>
    </div>

    {/* 2. Numbered Showcase Cards (Asymmetric Grid) */}
    <div
    className="p-2.5 rounded-lg border border-dashed space-y-1.5"
    style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
    }}
    >
    <p className="text-[8px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
        Featured Works (Numbered Grid)
    </p>
    <div className="grid grid-cols-2 gap-2">
        <div
        className="h-10 rounded border p-1.5 text-left text-[9px] flex flex-col justify-between"
        style={{
            backgroundColor: 'var(--bg-main)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-primary)',
        }}
        >
        <span className="font-mono font-bold text-[8px]" style={{ color: 'var(--accent-warm)' }}>01</span>
        <span className="truncate">Editorial Case Study A</span>
        </div>
        <div
        className="h-10 rounded border p-1.5 text-left text-[9px] flex flex-col justify-between"
        style={{
            backgroundColor: 'var(--bg-main)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-primary)',
        }}
        >
        <span className="font-mono font-bold text-[8px]" style={{ color: 'var(--accent-warm)' }}>02</span>
        <span className="truncate">Editorial Case Study B</span>
        </div>
    </div>
    </div>

    {/* 3. Work Experience */}
    <div
    className="p-2 rounded-lg border border-dashed space-y-1"
    style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
    }}
    >
    <p className="text-[8px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
        Work History & Roles
    </p>
    <div
        className="h-6 rounded border flex items-center justify-between px-2 text-[9px]"
        style={{
        backgroundColor: 'var(--bg-main)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)',
        }}
    >
        <span>Creative Director</span>
        <span className="text-[8px] font-mono" style={{ color: 'var(--text-secondary)' }}>2023 - Present</span>
    </div>
    </div>

    {/* 4. Services Offered */}
    <div
    className="p-2 rounded-lg border border-dashed space-y-1"
    style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
    }}
    >
    <p className="text-[8px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
        Services & Capabilities
    </p>
    <div className="grid grid-cols-2 gap-2">
        <div
        className="h-6 rounded border flex items-center px-2 text-[9px]"
        style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
        >
        Brand Strategy
        </div>
        <div
        className="h-6 rounded border flex items-center px-2 text-[9px]"
        style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
        >
        Art Direction
        </div>
    </div>
    </div>

    {/* 5. Client Endorsements */}
    <div
    className="p-2 rounded-lg border border-dashed space-y-1"
    style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
    }}
    >
    <p className="text-[8px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
        Client Endorsements
    </p>
    <div
        className="h-6 rounded border flex items-center justify-between px-2 text-[9px] italic font-serif"
        style={{
        backgroundColor: 'var(--bg-main)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)',
        }}
    >
        <span>&quot;Exceptional creative leadership...&quot;</span>
        <span className="text-[8px]" style={{ color: 'var(--accent-warm)' }}>★★★★★</span>
    </div>
    </div>
</div>
);
}