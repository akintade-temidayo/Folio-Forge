'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { Palette, Check } from 'lucide-react';
import { THEMES } from '@/lib/themes';

const emptySubscribe = () => () => {};

export default function SidebarThemeSwitcher() {
const mounted = useSyncExternalStore(
emptySubscribe,
() => true,
() => false
);

const [currentTheme, setCurrentTheme] = useState(() => {
if (typeof window !== 'undefined') {
    return localStorage.getItem('app-theme') || 'espresso';
}
return 'espresso';
});

const [isOpen, setIsOpen] = useState(false);

useEffect(() => {
const selected = THEMES.find((t) => t.id === currentTheme) || THEMES[0];
document.documentElement.setAttribute('data-theme', selected.id);
}, [currentTheme]);

const changeTheme = (themeId) => {
const selected = THEMES.find((t) => t.id === themeId) || THEMES[0];
setCurrentTheme(selected.id);
document.documentElement.setAttribute('data-theme', selected.id);
localStorage.setItem('app-theme', selected.id);
setIsOpen(false);
};

const activeThemeObj = THEMES.find((t) => t.id === currentTheme) || THEMES[0];

return (
<div className="relative">
    {isOpen && (
    <div className="absolute bottom-full left-0 right-0 mb-2 p-2 rounded-xl bg-(--bg-surface) border border-(--border-subtle) shadow-2xl space-y-1 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
        <div className="px-2.5 py-1 text-[10px] font-semibold text-[var(--text-secondary) uppercase tracking-wider border-b border-(--border-subtle) mb-1">
        Theme Palette
        </div>
        {THEMES.map((t) => (
        <button
            key={t.id}
            type="button"
            onClick={() => changeTheme(t.id)}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
            currentTheme === t.id
                ? 'bg-(--bg-surface-hover) text-(--text-primary) font-semibold'
                : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-surface-hover)'
            }`}
        >
            <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border border-white/20 shrink-0" style={{ backgroundColor: t.color }} />
            <span>{t.name}</span>
            </div>
            {currentTheme === t.id && <Check className="w-3.5 h-3.5 text-(--accent-warm)" />}
        </button>
        ))}
    </div>
    )}

    <button
    type="button"
    onClick={() => setIsOpen(!isOpen)}
    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-surface-hover) transition-colors"
    >
    <div className="flex items-center gap-3">
        <Palette className="w-4 h-4 text-(--accent-warm)" />
        <span>Theme</span>
    </div>

    {mounted ? (
        <span className="w-3 h-3 rounded-full border border-white/20 shrink-0 transition-colors" style={{ backgroundColor: activeThemeObj.color }} />
    ) : (
        <span className="w-3 h-3 rounded-full border border-white/20 shrink-0 opacity-0" />
    )}
    </button>
</div>
);
}