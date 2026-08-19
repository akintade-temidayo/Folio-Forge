'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Layout, ArrowLeft, Check, RefreshCw, Sparkles } from 'lucide-react';
import { TEMPLATES } from '@/lib/templates';
import TemplateCard from '@/components/admin/TemplateCard';
import Modal from '@/components/ui/Modal';

export default function TemplatesGalleryPage() {
const router = useRouter();

// Loading & Selection States
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [selectedTemplate, setSelectedTemplate] = useState('modern');
const [isSaving, setIsSaving] = useState(false);

// Modal State
const [previewTemplate, setPreviewTemplate] = useState(null);

// 1. Fetch user data to identify current active template
useEffect(() => {
async function fetchUserData() {
    try {
    const res = await fetch('/api/admin/profile');
    const data = await res.json();

    if (res.ok && data.success && data.user) {
        setUser(data.user);
        if (data.user.portfolioTemplate) {
        setSelectedTemplate(data.user.portfolioTemplate);
        }
    }
    } catch (err) {
    console.error('Failed to fetch user profile:', err);
    } finally {
    setLoading(false);
    }
}

fetchUserData();
}, []);

// Save Template Handler
const handleSelectTemplate = async (templateId) => {
setSelectedTemplate(templateId);
setIsSaving(true);
setPreviewTemplate(null);

try {
    const res = await fetch('/api/admin/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ portfolioTemplate: templateId }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to update template');

    router.refresh();
} catch (err) {
    console.error('Failed to update portfolio template:', err);
    // Fallback on error
    if (user?.portfolioTemplate) setSelectedTemplate(user.portfolioTemplate);
} finally {
    setIsSaving(false);
}
};

return (
<div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 font-sans">
    
    {/* Top Navigation & Header */}
    <div className="space-y-4">
    <Link
        href="/admin/overview"
        className="inline-flex items-center gap-2 text-xs font-semibold transition-opacity hover:opacity-80"
        style={{ color: 'var(--accent-warm)' }}
    >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard Overview</span>
    </Link>

    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div>
        <div className="flex items-center gap-2">
            <Layout className="w-6 h-6" style={{ color: 'var(--accent-warm)' }} />
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Template Gallery
            </h1>
        </div>
        <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Choose the structural layout format for your public portfolio website.
        </p>
        </div>

        {isSaving && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium animate-pulse" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--accent-warm)', color: 'var(--accent-warm)' }}>
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Updating active layout...</span>
        </div>
        )}
    </div>
    </div>

    {/* Grid of All Templates using TemplateCard */}
    {loading ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
        <div
            key={i}
            className="h-80 rounded-2xl border animate-pulse"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        />
        ))}
    </div>
    ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES.map((tmpl) => (
        <TemplateCard
            key={tmpl.id}
            template={tmpl}
            isActive={selectedTemplate === tmpl.id}
            isSaving={isSaving}
            onSelect={handleSelectTemplate}
            onPreview={(template) => setPreviewTemplate(template)}
        />
        ))}
    </div>
    )}

    {/* Detail Modal */}
    <Modal
    isOpen={!!previewTemplate}
    onClose={() => setPreviewTemplate(null)}
    title={previewTemplate ? `Layout Preview: ${previewTemplate.name}` : ''}
    >
    {previewTemplate && (
        <div className="space-y-6 font-sans">
        <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
            <span>Structure Map</span>
            <span
                className="text-[10px] font-mono px-2 py-0.5 rounded border"
                style={{
                backgroundColor: 'var(--bg-main)',
                borderColor: 'var(--accent-warm)',
                color: 'var(--accent-warm)',
                }}
            >
                {previewTemplate.tag}
            </span>
            </div>
            {previewTemplate.mockup}
        </div>

        <div
            className="p-3.5 rounded-xl border space-y-1"
            style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-subtle)' }}
        >
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
            className="px-4 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer"
            style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-secondary)' }}
            >
            Close
            </button>
            <button
            type="button"
            disabled={selectedTemplate === previewTemplate.id || isSaving}
            onClick={() => handleSelectTemplate(previewTemplate.id)}
            className="px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 text-white cursor-pointer"
            style={{ backgroundColor: 'var(--accent-warm)' }}
            >
            <span>
                {selectedTemplate === previewTemplate.id ? 'Currently Active' : 'Use This Template'}
            </span>
            <Check className="w-3.5 h-3.5" />
            </button>
        </div>
        </div>
    )}
    </Modal>
</div>
);
}