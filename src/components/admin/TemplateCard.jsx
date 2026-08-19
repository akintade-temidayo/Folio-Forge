'use client';

import React from 'react';
import { Check, Eye } from 'lucide-react';

export default function TemplateCard({
template,
isActive,
isSaving,
onSelect,
onPreview,
}) {
return (
<div
    className={`flex flex-col justify-between p-5 rounded-2xl border transition-all duration-300 relative ${
    isActive ? 'ring-2' : 'hover:border-white/30'
    }`}
    style={{
    backgroundColor: 'var(--bg-surface)',
    borderColor: isActive ? 'var(--accent-warm)' : 'var(--border-subtle)',
    boxShadow: isActive ? '0 0 25px rgba(217, 119, 6, 0.15)' : 'none',
    }}
>
    {/* Active Badge */}
    {isActive && (
    <div
        className="absolute -top-3 right-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-md text-white"
        style={{ backgroundColor: 'var(--accent-warm)' }}
    >
        <Check className="w-3 h-3" />
        <span>Active Template</span>
    </div>
    )}

    <div className="space-y-4">
    {/* Card Title & Tag */}
    <div>
        <div className="flex items-center justify-between">
        <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
            {template.name}
        </h3>
        <span
            className="text-[10px] font-mono px-2 py-0.5 rounded border"
            style={{
            backgroundColor: 'var(--bg-main)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-secondary)',
            }}
        >
            {template.tag}
        </span>
        </div>
        <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {template.description}
        </p>
    </div>

    {/* Interactive Layout Mockup */}
    <div className="pt-2">
        {template.mockup}
    </div>
    </div>

    {/* Bottom Action Area */}
    <div className="pt-6 mt-4 border-t space-y-2" style={{ borderColor: 'var(--border-subtle)' }}>
    <div className="grid grid-cols-2 gap-2">
        {/* Details Modal Trigger */}
        <button
        type="button"
        onClick={() => onPreview(template)}
        className="w-full py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        style={{
            backgroundColor: 'var(--bg-main)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-secondary)',
        }}
        >
        <Eye className="w-3.5 h-3.5" style={{ color: 'var(--accent-warm)' }} />
        <span>Details</span>
        </button>

        {/* Select Button */}
        <button
        type="button"
        disabled={isActive || isSaving}
        onClick={() => onSelect(template.id)}
        className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            isActive
            ? 'opacity-90 cursor-default'
            : 'cursor-pointer hover:opacity-90 text-white'
        }`}
        style={{
            backgroundColor: isActive ? 'var(--bg-main)' : 'var(--accent-warm)',
            color: isActive ? 'var(--accent-warm)' : '#ffffff',
            border: isActive ? '1px solid var(--accent-warm)' : 'none',
        }}
        >
        {isActive ? (
            <>
            <Check className="w-3.5 h-3.5" />
            <span>Selected</span>
            </>
        ) : (
            <span>Use Template</span>
        )}
        </button>
    </div>
    </div>
</div>
);
}