'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink, FileText, Loader2, Trash2, Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function ResumePage() {
const fileInputRef = useRef(null);
const [resume, setResume] = useState(null);
const [loading, setLoading] = useState(true);
const [isUploading, setIsUploading] = useState(false);
const [isRemoving, setIsRemoving] = useState(false);

useEffect(() => {
    let active = true;
    fetch('/api/admin/resume')
    .then((response) => response.json())
    .then((data) => {
        if (active && data.success) {
        setResume(data.resumeUrl ? {
            url: data.resumeUrl,
            fileName: data.resumeFileName || 'Resume.pdf',
        } : null);
        }
    })
    .catch((error) => console.error('Failed to load resume:', error))
    .finally(() => active && setLoading(false));
    return () => { active = false; };
}, []);

const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    toast.error('Choose a PDF file.');
    return;
    }
    if (file.size > 15 * 1024 * 1024) {
    toast.error('Resume must be 15 MB or smaller.');
    return;
    }

    try {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/api/admin/resume', { method: 'POST', body: formData });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Upload failed.');
    if (!data.resumeUrl) throw new Error('Upload completed, but no saved resume was returned. Please refresh and try again.');
    setResume({ url: data.resumeUrl, fileName: data.resumeFileName || file.name });
    toast.success('Resume uploaded. It is now available on your portfolio.');
    } catch (error) {
    toast.error(error.message || 'Failed to upload resume.');
    } finally {
    setIsUploading(false);
    }
};

const handleRemove = async () => {
    try {
    setIsRemoving(true);
    const response = await fetch('/api/admin/resume', { method: 'DELETE' });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to remove resume.');
    setResume(null);
    toast.success('Resume removed from your portfolio.');
    } catch (error) {
    toast.error(error.message || 'Failed to remove resume.');
    } finally {
    setIsRemoving(false);
    }
};

return (
    <div className="mx-auto max-w-3xl space-y-8">
    <div>
        <h1 className="text-2xl font-serif font-bold text-(--text-primary)">Resume / CV</h1>
        <p className="mt-1 text-sm text-(--text-secondary)">
        Upload a PDF so visitors can view and download your resume from your portfolio.
        </p>
    </div>

    <section className="rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-6 sm:p-8 space-y-6">
        <div className="flex items-start gap-4">
        <div className="rounded-xl bg-(--accent-warm)/10 p-3 text-(--accent-warm)">
            <FileText className="h-6 w-6" />
        </div>
        <div>
            <h2 className="font-semibold text-(--text-primary)">{resume ? 'Your current resume' : 'Add your resume'}</h2>
            <p className="mt-1 text-sm text-(--text-secondary)">PDF format, up to 15 MB.</p>
        </div>
        </div>

        {loading ? (
        <div className="flex items-center gap-2 text-sm text-(--text-secondary)">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading resume…
        </div>
        ) : resume ? (
        <div className="flex flex-col gap-4 rounded-xl border border-(--border-subtle) bg-(--bg-main) p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
            <p className="truncate text-sm font-medium text-(--text-primary)">{resume.fileName}</p>
            <p className="mt-1 text-xs text-(--text-secondary)">Published on your public portfolio</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
            <a href={resume.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-(--border-subtle) px-3 py-2 text-xs font-semibold text-(--text-primary) hover:border-(--accent-warm)">
                <ExternalLink className="h-3.5 w-3.5" /> View
            </a>
            <button type="button" onClick={handleRemove} disabled={isRemoving} className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10 disabled:opacity-50">
                {isRemoving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />} Remove
            </button>
            </div>
        </div>
        ) : (
        <p className="rounded-xl border border-dashed border-(--border-subtle) p-5 text-sm text-(--text-secondary)">
            No resume uploaded yet. Uploading one will add resume links to your public portfolio.
        </p>
        )}

        <input ref={fileInputRef} type="file" accept="application/pdf,.pdf" className="hidden" onChange={handleUpload} />
        <button type="button" onClick={() => fileInputRef.current?.click()} disabled={loading || isUploading || isRemoving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-(--accent-warm) px-5 py-3 text-sm font-semibold text-(--bg-main) transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
        {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        {isUploading ? 'Uploading…' : resume ? 'Replace Resume' : 'Upload PDF'}
        </button>
    </section>
    </div>
);
}
