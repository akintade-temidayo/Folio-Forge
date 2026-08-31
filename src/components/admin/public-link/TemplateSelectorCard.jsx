'use client';

import React from 'react';
import Link from 'next/link';
import { Layout, RefreshCw, ArrowRight, Check, Eye } from 'lucide-react';
import { TEMPLATES } from '@/lib/templates';

export default function TemplateSelectorCard({
displayedTemplates,
selectedTemplate,
activeTemplateObj,
isSavingTemplate,
onShuffle,
onSelectTemplate,
onOpenPreview,
}) {
return (
    <div
    className="p-6 md:p-8 rounded-[5px] border space-y-6 transition-colors shadow-xs"
    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
    >
    <div className="flex items-center justify-between">
        <div>
        <div className="flex items-center gap-2">
            <Layout className="w-4 h-4" style={{ color: 'var(--accent-warm)' }} />
            <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
            Layout Template
            </h3>
            {isSavingTemplate && (
            <span className="text-xs animate-pulse font-medium" style={{ color: 'var(--accent-warm)' }}>
                Saving...
            </span>
            )}
        </div>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
            Choose how your project grid and details are arranged.
        </p>
        </div>

        <div className="flex items-center gap-4">
        <button
            type="button"
            onClick={onShuffle}
            className="text-xs font-medium flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            style={{ color: 'var(--text-secondary)' }}
        >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Shuffle</span>
        </button>

        <Link
            href="/admin/templates"
            className="text-xs font-semibold flex items-center gap-1 transition-all hover:underline"
            style={{ color: 'var(--accent-warm)' }}
        >
            <span>See All</span>
            <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {displayedTemplates.map((tmpl) => {
        const isSelected = selectedTemplate === tmpl.id;
        return (
            <div
            key={tmpl.id}
            onClick={() => onSelectTemplate(tmpl.id)}
            className={`relative p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-4 group ${
                isSelected ? 'ring-2' : 'hover:border-white/30'
            }`}
            style={{
                backgroundColor: isSelected ? 'var(--bg-main)' : 'var(--bg-surface)',
                borderColor: isSelected ? 'var(--accent-warm)' : 'var(--border-subtle)',
                boxShadow: isSelected ? '0 0 15px rgba(217, 119, 6, 0.15)' : 'none',
            }}
            >
            <div className="flex items-center justify-between">
                <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                {tmpl.name}
                </span>

                {isSelected ? (
                <span
                    className="p-1 rounded-full text-white"
                    style={{ backgroundColor: 'var(--accent-warm)' }}
                >
                    <Check className="w-3 h-3" />
                </span>
                ) : (
                <button
                    type="button"
                    onClick={(e) => {
                    e.stopPropagation();
                    onOpenPreview(tmpl);
                    }}
                    className="px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 text-[10px] flex items-center gap-1 transition-all"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    <Eye className="w-3 h-3" />
                    <span>Preview</span>
                </button>
                )}
            </div>

            <span className="text-[11px] font-mono" style={{ color: 'var(--text-secondary)' }}>
                {tmpl.tag}
            </span>

            <div
                onClick={(e) => {
                e.stopPropagation();
                onOpenPreview(tmpl);
                }}
                className="w-full py-2 rounded-lg border text-xs text-center font-medium transition-colors flex items-center justify-center gap-1.5"
                style={{
                backgroundColor: 'var(--bg-main)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-secondary)',
                }}
            >
                <Eye className="w-3.5 h-3.5" style={{ color: 'var(--accent-warm)' }} />
                <span>Structure Sketch</span>
            </div>
            </div>
        );
        })}
    </div>

    <div className="pt-2 flex items-center justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
        <span>
        Active: <strong style={{ color: 'var(--text-primary)' }}>{activeTemplateObj.name}</strong>
        </span>
        <Link href="/admin/templates" className="hover:underline" style={{ color: 'var(--accent-warm)' }}>
        Browse full gallery ({TEMPLATES.length} templates) →
        </Link>
    </div>
    </div>
);
}