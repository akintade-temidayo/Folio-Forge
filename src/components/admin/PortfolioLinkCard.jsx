'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { THEMES } from '@/lib/themes';
import { TEMPLATES } from '@/lib/templates';
import Modal from '@/components/ui/Modal';
import { Sparkles, Check } from 'lucide-react';

import {
pickInitialTemplates,
pickRandomTemplates,
copyToClipboard,
updatePortfolioTheme,
updatePortfolioTemplate,
} from '@/lib/public-link-functions';

import LiveLinkCard from './public-link/LiveLinkCard';
import ThemePickerCard from './public-link/ThemePickerCard';
import TemplateSelectorCard from './public-link/TemplateSelectorCard';

export default function PortfolioLinkCard({ user, projectsCount = 0, onThemeChange, onTemplateChange }) {
const router = useRouter();
const [copied, setCopied] = useState(false);
const [isThemeOpen, setIsThemeOpen] = useState(false);
const [isSavingTheme, setIsSavingTheme] = useState(false);
const [isSavingTemplate, setIsSavingTemplate] = useState(false);
const [previewTemplate, setPreviewTemplate] = useState(null);

const [selectedTheme, setSelectedTheme] = useState(user?.portfolioTheme || 'espresso');
const [selectedTemplate, setSelectedTemplate] = useState(user?.portfolioTemplate || 'modern');
const [displayedTemplates, setDisplayedTemplates] = useState(() => pickInitialTemplates(selectedTemplate));

// Props synchronization checks
const [prevTheme, setPrevTheme] = useState(user?.portfolioTheme);
if (user?.portfolioTheme && user.portfolioTheme !== prevTheme) {
    setPrevTheme(user.portfolioTheme);
    setSelectedTheme(user.portfolioTheme);
}

const [prevTemplate, setPrevTemplate] = useState(user?.portfolioTemplate);
if (user?.portfolioTemplate && user.portfolioTemplate !== prevTemplate) {
    setPrevTemplate(user.portfolioTemplate);
    setSelectedTemplate(user.portfolioTemplate);
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

const activeTheme = THEMES.find((t) => t.id === selectedTheme) || THEMES[0];
const activeTemplateObj = useMemo(() => {
    return TEMPLATES.find((t) => t.id === selectedTemplate) || TEMPLATES[0];
}, [selectedTemplate]);

// Handlers using shared lib functions
const handleCopy = async () => {
    if (!isEnabled) return;
    const ok = await copyToClipboard(portfolioUrl);
    if (ok) {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    }
};

const handleThemeSelect = async (themeId) => {
    setSelectedTheme(themeId);
    setIsThemeOpen(false);
    setIsSavingTheme(true);
    try {
    await updatePortfolioTheme(themeId);
    if (onThemeChange) onThemeChange(themeId);
    router.refresh();
    } catch (err) {
    console.error(err);
    setSelectedTheme(user?.portfolioTheme || 'espresso');
    } finally {
    setIsSavingTheme(false);
    }
};

const handleTemplateSelect = async (templateId) => {
    setSelectedTemplate(templateId);
    setIsSavingTemplate(true);
    setPreviewTemplate(null);
    try {
    await updatePortfolioTemplate(templateId);
    if (onTemplateChange) onTemplateChange(templateId);
    router.refresh();
    } catch (err) {
    console.error(err);
    setSelectedTemplate(user?.portfolioTemplate || 'modern');
    } finally {
    setIsSavingTemplate(false);
    }
};

return (
    <div className="space-y-5 max-w-5xl">
    <LiveLinkCard
        isEnabled={isEnabled}
        handle={handle}
        portfolioUrl={portfolioUrl}
        projectsCount={projectsCount}
        copied={copied}
        onCopy={handleCopy}
    />

    <ThemePickerCard
        activeTheme={activeTheme}
        selectedTheme={selectedTheme}
        isThemeOpen={isThemeOpen}
        isSavingTheme={isSavingTheme}
        onToggleOpen={() => setIsThemeOpen(!isThemeOpen)}
        onSelectTheme={handleThemeSelect}
    />

    <TemplateSelectorCard
        displayedTemplates={displayedTemplates}
        selectedTemplate={selectedTemplate}
        activeTemplateObj={activeTemplateObj}
        isSavingTemplate={isSavingTemplate}
        onShuffle={() => setDisplayedTemplates(pickRandomTemplates(selectedTemplate))}
        onSelectTemplate={handleTemplateSelect}
        onOpenPreview={(tmpl) => setPreviewTemplate(tmpl)}
    />

    {/* Template Preview Modal */}
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

            <div className="p-4 rounded-xl border space-y-1" style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-subtle)' }}>
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