'use client';

import React, { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import { Loader2, UploadCloud, CheckCircle } from 'lucide-react';
import Select from '@/components/ui/Select';

export default function ProjectForm({ categories = [], initialData = null, onSuccess }) {
const catList = useMemo(
() =>
    Array.isArray(categories)
    ? categories
    : categories?.categories || categories?.data || [],
[categories]
);

const categoryOptions = useMemo(
() =>
    catList.map((cat) => ({
    value: cat._id || cat.id,
    label: cat.name,
    name: cat.name,
    })),
[catList]
);

// Form State
const [title, setTitle] = useState(initialData?.title || '');
const [categoryId, setCategoryId] = useState(
initialData?.category?._id || initialData?.category || ''
);
const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || '');
const [completionDate, setCompletionDate] = useState(
initialData?.completionDate
    ? new Date(initialData.completionDate).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0]
);
const [description, setDescription] = useState(initialData?.description || '');
const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false);

const [submitting, setSubmitting] = useState(false);
const [uploadingVideo, setUploadingVideo] = useState(false);
const [errorMsg, setErrorMsg] = useState('');

// Derived, not stored: falls back to the first category only when nothing is explicitly selected
const activeCategoryId = categoryId || catList[0]?._id || catList[0]?.id || '';

const handleFileUpload = async (file) => {
if (!file) return;

setUploadingVideo(true);
setErrorMsg('');

try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Upload failed');

    setVideoUrl(data.url);
} catch (err) {
    setErrorMsg(`Upload Error: ${err.message}`);
} finally {
    setUploadingVideo(false);
}
};

const handleSubmit = async (e) => {
e.preventDefault();
setErrorMsg('');

if (!title.trim() || !videoUrl.trim() || !activeCategoryId) {
    setErrorMsg('Please fill in all required fields (Title, Category, Video URL or Upload).');
    return;
}

try {
    setSubmitting(true);
    const url = initialData?._id ? `/api/projects/${initialData._id}` : '/api/projects';
    const method = initialData?._id ? 'PUT' : 'POST';

    const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        title: title.trim(),
        category: activeCategoryId,
        videoUrl: videoUrl.trim(),
        previewClip: videoUrl.trim(),
        completionDate,
        description: description.trim(),
        isFeatured,
        projectType: 'video',
    }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to save project');

    if (onSuccess) onSuccess();
} catch (err) {
    setErrorMsg(err.message);
} finally {
    setSubmitting(false);
}
};

return (
<form onSubmit={handleSubmit} className="space-y-4">
    {errorMsg && (
    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-medium">
        {errorMsg}
    </div>
    )}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
        <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary, #666059)' }}>
        Project Title <span className="text-red-400">*</span>
        </label>
        <input
        type="text"
        placeholder="e.g. Nike Commercial 2026"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none transition-colors"
        style={{
            backgroundColor: 'var(--bg-main, #f5f2eb)',
            borderColor: 'var(--border-subtle, #e5e0d8)',
            color: 'var(--text-primary, #1a1918)',
        }}
        />
    </div>

    <div>
        <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary, #666059)' }}>
        Category <span className="text-red-400">*</span>
        </label>
        <Select
        options={categoryOptions}
        value={activeCategoryId}
        onChange={(val) => setCategoryId(typeof val === 'object' ? val.value : val)}
        placeholder="Select a category"
        />
    </div>
    </div>

    <div>
    <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary, #666059)' }}>
        Main Video File / URL <span className="text-red-400">*</span>
    </label>

    <div className="space-y-2">
        <div
        className="relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors hover:border-[#c88346]"
        style={{ borderColor: 'var(--border-subtle, #e5e0d8)', backgroundColor: 'var(--bg-main, #f5f2eb)' }}
        >
        <input
            type="file"
            accept="video/*"
            disabled={uploadingVideo}
            onChange={(e) => handleFileUpload(e.target.files[0])}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        <div className="flex flex-col items-center justify-center gap-1">
            {uploadingVideo ? (
            <Loader2 className="w-6 h-6 animate-spin text-[#c88346]" />
            ) : videoUrl ? (
            <CheckCircle className="w-6 h-6 text-emerald-500" />
            ) : (
            <UploadCloud className="w-6 h-6 text-[#c88346]" />
            )}
            <p className="text-xs font-medium" style={{ color: 'var(--text-primary, #1a1918)' }}>
            {uploadingVideo ? 'Uploading video...' : videoUrl ? 'Video Attached / Ready' : 'Click or Drag & Drop MP4 Video File'}
            </p>
            <p className="text-[10px]" style={{ color: 'var(--text-secondary, #666059)' }}>
            Supports MP4, MOV, WebM
            </p>
        </div>
        </div>

        <input
        type="text"
        placeholder="Or paste direct URL (Vimeo, YouTube, Cloudinary MP4)..."
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="w-full px-3.5 py-2 rounded-xl text-xs border focus:outline-none transition-colors"
        style={{
            backgroundColor: 'var(--bg-main, #f5f2eb)',
            borderColor: 'var(--border-subtle, #e5e0d8)',
            color: 'var(--text-primary, #1a1918)',
        }}
        />
    </div>
    </div>

    <div>
    <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary, #666059)' }}>
        Completion Date
    </label>
    <input
        type="date"
        value={completionDate}
        onChange={(e) => setCompletionDate(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none transition-colors"
        style={{
        backgroundColor: 'var(--bg-main, #f5f2eb)',
        borderColor: 'var(--border-subtle, #e5e0d8)',
        color: 'var(--text-primary, #1a1918)',
        }}
    />
    </div>

    <div>
    <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary, #666059)' }}>
        Project Description / Details
    </label>
    <textarea
        rows={3}
        placeholder="Brief description of your role, gear used, or campaign goals..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none transition-colors resize-none"
        style={{
        backgroundColor: 'var(--bg-main, #f5f2eb)',
        borderColor: 'var(--border-subtle, #e5e0d8)',
        color: 'var(--text-primary, #1a1918)',
        }}
    />
    </div>

    <div className="flex items-center gap-2 pt-1">
    <input
        type="checkbox"
        id="isFeatured"
        checked={isFeatured}
        onChange={(e) => setIsFeatured(e.target.checked)}
        className="w-4 h-4 rounded border-gray-300 accent-[#c88346] cursor-pointer"
    />
    <label htmlFor="isFeatured" className="text-xs font-medium cursor-pointer" style={{ color: 'var(--text-primary, #1a1918)' }}>
        Feature this project on home showcase grid
    </label>
    </div>

    <div className="flex items-center justify-end gap-3 pt-3 border-t" style={{ borderColor: 'var(--border-subtle, #e5e0d8)' }}>
    <Button
        type="submit"
        disabled={submitting || uploadingVideo || catList.length === 0}
        variant="primary"
        className="gap-2"
    >
        {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
        <span>{initialData ? 'Update Project' : 'Save Project'}</span>
    </Button>
    </div>
</form>
);
}