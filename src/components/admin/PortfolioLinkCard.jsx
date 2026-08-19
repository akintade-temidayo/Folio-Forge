//portfoliolinkcard.jsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Copy, Check, ExternalLink, Globe, Lock, Palette, Layout, Eye, ChevronDown, Sparkles, ArrowRight, RefreshCw } from 'lucide-react';
import { THEMES } from '@/lib/themes';
import { TEMPLATES } from '@/lib/templates';
import Modal from '@/components/ui/Modal';

// Pure helper: picks 3 random templates, always keeping the currently
// selected one visible. Used for the Shuffle button and for re-picks that
// happen after mount (client-only interactions), where non-determinism is
// safe since there's no SSR output left to match against.
function pickRandomTemplates(currentTemplateId) {
const shuffled = [...TEMPLATES].sort(() => 0.5 - Math.random());
const selectedObj = TEMPLATES.find((t) => t.id === currentTemplateId);

const picked = shuffled.slice(0, 3);

if (selectedObj && !picked.some((t) => t.id === currentTemplateId)) {
    picked[0] = selectedObj;
}

return picked;
}

// Deterministic version used ONLY for the very first render (the lazy
// useState initializer below). It must produce identical output on the
// server and on the client during hydration — Math.random() here would
// give a different shuffle in each environment and trigger a hydration
// mismatch, which is exactly what was happening before this fix.
function pickInitialTemplates(currentTemplateId) {
const picked = TEMPLATES.slice(0, 3);
const selectedObj = TEMPLATES.find((t) => t.id === currentTemplateId);

if (selectedObj && !picked.some((t) => t.id === currentTemplateId)) {
    picked[0] = selectedObj;
}

return picked;
}

export default function PortfolioLinkCard({ user, projectsCount = 0, onThemeChange, onTemplateChange }) {
const router = useRouter();
const [copied, setCopied] = useState(false);

// Theme Dropdown State
const [isThemeOpen, setIsThemeOpen] = useState(false);
const [isSavingTheme, setIsSavingTheme] = useState(false);

// Template States
const [isSavingTemplate, setIsSavingTemplate] = useState(false);
const [previewTemplate, setPreviewTemplate] = useState(null);

// Local State initialized with user values
const [selectedTheme, setSelectedTheme] = useState(user?.portfolioTheme || 'espresso');
const [selectedTemplate, setSelectedTemplate] = useState(user?.portfolioTemplate || 'modern');

// 🎲 Random Templates State — lazy-initialized once on mount using a
// deterministic pick (see pickInitialTemplates above) so server and client
// agree on the first render. Actual randomization only happens afterward,
// via the Shuffle button or a genuine selectedTemplate change.
const [displayedTemplates, setDisplayedTemplates] = useState(() => pickInitialTemplates(selectedTemplate));

// Manual reshuffle: a plain event handler calling setState directly is
// fine — the warning only applies to setState fired from inside an effect.
const shuffleTemplates = () => {
setDisplayedTemplates(pickRandomTemplates(selectedTemplate));
};

// Sync local state with the user prop, and re-pick the displayed template
// cards whenever selectedTemplate changes — both done during render
// (React's recommended alternative to a useEffect that just mirrors
// state/props) instead of via effects. Same pattern already used for
// `prevProjects` in ReorderableList.jsx and the theme/template sync fix
// applied earlier in this file.
const [prevPortfolioTheme, setPrevPortfolioTheme] = useState(user?.portfolioTheme);
if (user?.portfolioTheme && user.portfolioTheme !== prevPortfolioTheme) {
setPrevPortfolioTheme(user.portfolioTheme);
setSelectedTheme(user.portfolioTheme);
}

const [prevPortfolioTemplate, setPrevPortfolioTemplate] = useState(user?.portfolioTemplate);
if (user?.portfolioTemplate && user.portfolioTemplate !== prevPortfolioTemplate) {
setPrevPortfolioTemplate(user.portfolioTemplate);
setSelectedTemplate(user.portfolioTemplate);
}

const [prevSelectedTemplateForShuffle, setPrevSelectedTemplateForShuffle] = useState(selectedTemplate);
if (selectedTemplate !== prevSelectedTemplateForShuffle) {
setPrevSelectedTemplateForShuffle(selectedTemplate);
setDisplayedTemplates(pickRandomTemplates(selectedTemplate));
}

const isEnabled = projectsCount >= 2;

const handle = useMemo(() => {
    return user?.handle || user?.name?.toLowerCase().replace(/\s+/g, '') || '';
    }, [user?.handle, user?.name]);


    const portfolioUrl = useMemo(() => {
        if (!handle) return '#';
        const relativePath = `/${handle}`;
        if (typeof window === 'undefined') return relativePath;
        return `${window.location.origin}${relativePath}`;
    }, [handle]);

const handleCopy = async () => {
if (!isEnabled) return;
try {
    await navigator.clipboard.writeText(portfolioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
} catch (err) {
    console.error('Failed to copy: ', err);
}
};

const activeTheme = THEMES.find((t) => t.id === selectedTheme) || THEMES[0];

const activeTemplateObj = useMemo(() => {
return TEMPLATES.find((t) => t.id === selectedTemplate) || TEMPLATES[0];
}, [selectedTemplate]);

// Save Theme Handler
const handleThemeSelect = async (themeId) => {
setSelectedTheme(themeId);
setIsThemeOpen(false);
setIsSavingTheme(true);

try {
    const res = await fetch('/api/admin/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ portfolioTheme: themeId }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to update theme');

    if (onThemeChange) onThemeChange(themeId);
    router.refresh();
} catch (err) {
    console.error('Failed to save portfolio theme:', err);
    setSelectedTheme(user?.portfolioTheme || 'espresso');
} finally {
    setIsSavingTheme(false);
}
};

// Save Template Handler
const handleTemplateSelect = async (templateId) => {
setSelectedTemplate(templateId);
setIsSavingTemplate(true);
setPreviewTemplate(null);

try {
    const res = await fetch('/api/admin/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ portfolioTemplate: templateId }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to update template');

    if (onTemplateChange) onTemplateChange(templateId);
    router.refresh();
} catch (err) {
    console.error('Failed to save portfolio template:', err);
    setSelectedTemplate(user?.portfolioTemplate || 'modern');
} finally {
    setIsSavingTemplate(false);
}
};

return (
<div
    className="p-5 rounded-2xl border space-y-5 transition-colors"
    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
>
    {/* Header */}
    <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
        {isEnabled ? (
        <Globe className="w-4 h-4" style={{ color: 'var(--accent-warm)' }} />
        ) : (
        <Lock className="w-4 h-4 text-amber-500" />
        )}
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
        Your Public Portfolio Link
        </h3>
    </div>

    {isEnabled ? (
        <a
            href={handle ? portfolioUrl : '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xs flex items-center gap-1 font-medium ${
                !handle ? 'opacity-50 cursor-not-allowed' : 'hover:underline'
            }`}
            style={{ color: 'var(--accent-warm)' }}
            onClick={(e) => {
                if (!handle) e.preventDefault();
            }}
            >
            <span>Live Preview</span>
            <ExternalLink className="w-3.5 h-3.5" />
    </a>
    ) : (
        <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
        Locked ({projectsCount}/2 Projects Added)
        </span>
    )}
    </div>

    {/* Input Link & Copy Button */}
    <div className="flex items-center gap-2">
    <input
        type="text"
        readOnly
        disabled={!isEnabled}
        value={isEnabled ? (portfolioUrl || 'Loading portfolio link...') : 'Add at least 2 projects to unlock your public link'}
        className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-mono focus:outline-none transition-opacity ${
        !isEnabled ? 'opacity-50 select-none' : 'select-all'
        }`}
        style={{
        backgroundColor: 'var(--bg-main)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-secondary)',
        borderWidth: '1px',
        }}
    />

    <button
        type="button"
        onClick={handleCopy}
        disabled={!isEnabled}
        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
        !isEnabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
        style={{
        backgroundColor: !isEnabled ? 'var(--bg-main)' : copied ? 'rgba(16, 185, 129, 0.15)' : 'var(--accent-warm)',
        color: !isEnabled ? 'var(--text-secondary)' : copied ? '#34d399' : '#ffffff',
        border: copied ? '1px solid rgba(16, 185, 129, 0.3)' : 'none',
        }}
    >
        {copied ? (
        <>
            <Check className="w-3.5 h-3.5" />
            <span>Copied!</span>
        </>
        ) : (
        <>
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Link</span>
        </>
        )}
    </button>
    </div>

    {!isEnabled && (
    <p className="text-[11px] text-amber-400/80">
        💡 Tip: Upload at least 2 projects in the <strong>Projects</strong> tab so your portfolio page has enough work to display!
    </p>
    )}

    {/* Controls Section */}
    <div className="pt-4 border-t space-y-5" style={{ borderColor: 'var(--border-subtle)' }}>
    
    {/* 1. Portfolio Color Theme Picker */}
    <div className="relative">
        <button
        type="button"
        onClick={() => setIsThemeOpen(!isThemeOpen)}
        disabled={isSavingTheme}
        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-colors"
        style={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}
        >
        <div className="flex items-center gap-2">
            <Palette className="w-3.5 h-3.5" style={{ color: 'var(--accent-warm)' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Portfolio Color:</span>
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
            {isSavingTheme ? 'Saving...' : activeTheme.name}
            </span>
        </div>
        <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0" style={{ backgroundColor: activeTheme.color }} />
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isThemeOpen ? 'rotate-180' : ''}`} style={{ color: 'var(--text-secondary)' }} />
        </div>
        </button>

        {isThemeOpen && (
        <div
            className="absolute top-full left-0 right-0 mt-1.5 p-2 rounded-xl border shadow-2xl space-y-1 z-50 max-h-64 overflow-y-auto"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
            {THEMES.map((t) => (
            <button
                key={t.id}
                type="button"
                onClick={() => handleThemeSelect(t.id)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors"
                style={{
                backgroundColor: selectedTheme === t.id ? 'var(--bg-surface-hover)' : 'transparent',
                color: selectedTheme === t.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: selectedTheme === t.id ? 600 : 400,
                }}
            >
                <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border border-white/20 shrink-0" style={{ backgroundColor: t.color }} />
                <span>{t.name}</span>
                </div>
                {selectedTheme === t.id && <Check className="w-3.5 h-3.5" style={{ color: 'var(--accent-warm)' }} />}
            </button>
            ))}
        </div>
        )}
    </div>

    {/* 2. Arranged Template Boxes */}
    <div className="space-y-3">
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Layout className="w-3.5 h-3.5" style={{ color: 'var(--accent-warm)' }} />
            <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
            Choose Layout Template
            </span>
            {isSavingTemplate && (
            <span className="text-[10px] animate-pulse font-medium" style={{ color: 'var(--accent-warm)' }}>
                Saving...
            </span>
            )}
        </div>

        <div className="flex items-center gap-3">
            {/* Shuffle button */}
            <button
            type="button"
            onClick={shuffleTemplates}
            className="text-[11px] flex items-center gap-1 hover:opacity-80 transition-opacity"
            style={{ color: 'var(--text-secondary)' }}
            title="Shuffle featured options"
            >
            <RefreshCw className="w-3 h-3" />
            <span>Shuffle</span>
            </button>

            {/* See All Templates Link */}
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

        {/* Grid of Boxes (Random 3) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {displayedTemplates.map((tmpl) => {
            const isSelected = selectedTemplate === tmpl.id;
            return (
            <div
                key={tmpl.id}
                onClick={() => handleTemplateSelect(tmpl.id)}
                className={`relative p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 group ${
                isSelected ? 'ring-2' : 'hover:border-white/30'
                }`}
                style={{
                backgroundColor: isSelected ? 'var(--bg-main)' : 'var(--bg-surface)',
                borderColor: isSelected ? 'var(--accent-warm)' : 'var(--border-subtle)',
                boxShadow: isSelected ? '0 0 15px rgba(217, 119, 6, 0.15)' : 'none',
                }}
            >
                {/* Top Bar inside Card */}
                <div className="flex items-center justify-between">
                <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                    {tmpl.name}
                </span>
                
                {isSelected ? (
                    <span className="p-1 rounded-full text-white" style={{ backgroundColor: 'var(--accent-warm)' }}>
                    <Check className="w-3 h-3" />
                    </span>
                ) : (
                    <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        setPreviewTemplate(tmpl);
                    }}
                    className="px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 text-[10px] flex items-center gap-1 transition-all"
                    style={{ color: 'var(--text-secondary)' }}
                    >
                    <Eye className="w-3 h-3" />
                    <span>Preview</span>
                    </button>
                )}
                </div>

                {/* Tag */}
                <span className="text-[10px] font-mono" style={{ color: 'var(--text-secondary)' }}>
                {tmpl.tag}
                </span>

                {/* Click to preview helper */}
                <div 
                onClick={(e) => {
                    e.stopPropagation();
                    setPreviewTemplate(tmpl);
                }}
                className="w-full py-2 rounded-lg border text-[11px] text-center font-medium transition-colors flex items-center justify-center gap-1.5"
                style={{ 
                    backgroundColor: 'var(--bg-main)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-secondary)' 
                }}
                >
                <Eye className="w-3.5 h-3.5" style={{ color: 'var(--accent-warm)' }} />
                <span>View Structure Sketch</span>
                </div>
            </div>
            );
        })}
        </div>

        {/* Active Template Status Bar */}
        <div className="pt-1 flex items-center justify-between text-[11px]" style={{ color: 'var(--text-secondary)' }}>
        <span>
            Active: <strong style={{ color: 'var(--text-primary)' }}>{activeTemplateObj.name}</strong>
        </span>
        <Link href="/admin/templates" className="hover:underline text-[11px]" style={{ color: 'var(--accent-warm)' }}>
            Browse full gallery ({TEMPLATES.length} templates) →
        </Link>
        </div>
    </div>
    </div>

    {/* Modal */}
    <Modal
    isOpen={!!previewTemplate}
    onClose={() => setPreviewTemplate(null)}
    title={previewTemplate ? `Layout Preview: ${previewTemplate.name}` : ''}
    >
    {previewTemplate && (
        <div className="space-y-6">
        <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
            <span>Structure Map</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded border" style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--accent-warm)', color: 'var(--accent-warm)' }}>
                {previewTemplate.tag}
            </span>
            </div>
            {previewTemplate.mockup}
        </div>

        <div className="p-3.5 rounded-xl border space-y-1" style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: 'var(--accent-warm)' }}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Best For</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)' }}>
            {previewTemplate.bestFor}
            </p>
        </div>

        <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
            Key Layout Features
            </h4>
            <ul className="space-y-1.5">
            {previewTemplate.highlights.map((item, idx) => (
                <li key={idx} className="text-xs flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-warm)' }} />
                <span>{item}</span>
                </li>
            ))}
            </ul>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <button
            type="button"
            onClick={() => setPreviewTemplate(null)}
            className="px-4 py-2 rounded-xl text-xs font-medium transition-colors"
            style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-secondary)' }}
            >
            Close
            </button>
            <button
            type="button"
            onClick={() => handleTemplateSelect(previewTemplate.id)}
            className="px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 text-white"
            style={{ backgroundColor: 'var(--accent-warm)' }}
            >
            <span>Use This Template</span>
            <Check className="w-3.5 h-3.5" />
            </button>
        </div>
        </div>
    )}
    </Modal>
</div>
);
}