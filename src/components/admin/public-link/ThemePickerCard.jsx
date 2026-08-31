'use client';

import React from 'react';
import { Palette, ChevronDown, Check } from 'lucide-react';
import { THEMES } from '@/lib/themes';

export default function ThemePickerCard({
activeTheme,
selectedTheme,
isThemeOpen,
isSavingTheme,
onToggleOpen,
onSelectTheme,
}) {
return (
    <div
    className="p-6 md:p-8 rounded-[5px] border space-y-6 transition-colors shadow-xs"
    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
    >
    <div>
        <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
        Appearance & Colors
        </h3>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
        Set the primary color palette for your public portfolio accent elements.
        </p>
    </div>

    <div className="relative">
        <button
        type="button"
        onClick={onToggleOpen}
        disabled={isSavingTheme}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs transition-colors"
        style={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}
        >
        <div className="flex items-center gap-2.5">
            <Palette className="w-4 h-4" style={{ color: 'var(--accent-warm)' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Portfolio Theme:</span>
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            {isSavingTheme ? 'Saving...' : activeTheme.name}
            </span>
        </div>
        <div className="flex items-center gap-2.5">
            <span
            className="w-4 h-4 rounded-full border border-white/20 shrink-0 shadow-xs"
            style={{ backgroundColor: activeTheme.color }}
            />
            <ChevronDown
            className={`w-4 h-4 transition-transform ${isThemeOpen ? 'rotate-180' : ''}`}
            style={{ color: 'var(--text-secondary)' }}
            />
        </div>
        </button>

        {isThemeOpen && (
        <div
            className="absolute top-full left-0 right-0 mt-2 p-2 rounded-xl border shadow-2xl space-y-1 z-50 max-h-64 overflow-y-auto"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
            {THEMES.map((t) => (
            <button
                key={t.id}
                type="button"
                onClick={() => onSelectTheme(t.id)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors"
                style={{
                backgroundColor: selectedTheme === t.id ? 'var(--bg-surface-hover)' : 'transparent',
                color: selectedTheme === t.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: selectedTheme === t.id ? 600 : 400,
                }}
            >
                <div className="flex items-center gap-2.5">
                <span
                    className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                    style={{ backgroundColor: t.color }}
                />
                <span>{t.name}</span>
                </div>
                {selectedTheme === t.id && (
                <Check className="w-4 h-4" style={{ color: 'var(--accent-warm)' }} />
                )}
            </button>
            ))}
        </div>
        )}
    </div>
    </div>
);
}