'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Loader2, UploadCloud, X, AlertCircle } from 'lucide-react';
import Select from '@/components/ui/Select';
import { toast } from 'sonner';

const MAX_IMAGES = 4;

export default function PictureProjectForm({ categories = [], initialData = null, onSuccess }) {
const catList = useMemo(
() => (Array.isArray(categories) ? categories : categories?.categories || categories?.data || []),
[categories]
);

const categoryOptions = useMemo(
() => catList.map((cat) => ({ value: cat._id || cat.id, label: cat.name, name: cat.name })),
[catList]
);

const [title, setTitle] = useState(initialData?.title || '');
const [categoryId, setCategoryId] = useState(initialData?.category?._id || initialData?.category || '');
const [images, setImages] = useState(initialData?.images || []);
const [externalLink, setExternalLink] = useState(initialData?.externalLink || '');
const [completionDate, setCompletionDate] = useState(
initialData?.completionDate
    ? new Date(initialData.completionDate).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0]
);
const [description, setDescription] = useState(initialData?.description || '');
const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false);
const [submitting, setSubmitting] = useState(false);
const [uploading, setUploading] = useState(false);
const [errorMsg, setErrorMsg] = useState('');

const activeCategoryId = categoryId || catList[0]?._id || catList[0]?.id || '';
const slotsRemaining = MAX_IMAGES - images.length;
const hasNoCategories = catList.length === 0;

const handleFilesSelect = async (fileList) => {
const files = Array.from(fileList).slice(0, slotsRemaining);
if (files.length === 0) return;

setUploading(true);
setErrorMsg('');

try {
    const uploadedUrls = [];
    for (const file of files) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Upload failed');
    uploadedUrls.push(data.url);
    }
    setImages((prev) => [...prev, ...uploadedUrls].slice(0, MAX_IMAGES));
} catch (err) {
    setErrorMsg(`Upload Error: ${err.message}`);
} finally {
    setUploading(false);
}
};

const removeImage = (urlToRemove) => {
setImages((prev) => prev.filter((url) => url !== urlToRemove));
};

const handleSubmit = async (e) => {
e.preventDefault();
setErrorMsg('');

if (hasNoCategories) {
    setErrorMsg('Please add a category first before creating a project.');
    return;
}

if (!title.trim() || images.length === 0 || !activeCategoryId) {
    setErrorMsg('Please fill in all required fields (Title, Category, at least one Image).');
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
        projectType: 'picture',
        title: title.trim(),
        category: activeCategoryId,
        images,
        externalLink: externalLink.trim(),
        completionDate,
        description: description.trim(),
        isFeatured,
    }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to save project');

    if (initialData?._id) {
    toast.warning('Project updated successfully.');
    } else {
    toast.success('Project created successfully.');
    }
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

    {/* No Category Warning Banner */}
    {hasNoCategories && (
    <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 text-xs font-medium">
        <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
        <span>
        You don&apos;t have any categories yet.{' '}
        <Link href="/admin/categories" className="underline font-semibold hover:text-amber-700">
            Please add a category to continue
        </Link>
        </span>
    </div>
    )}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
        <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary, #666059)' }}>
        Project Title <span className="text-red-400">*</span>
        </label>
        <input
        type="text"
        placeholder="e.g. Portfolio Dashboard UI"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none transition-colors"
        style={{ backgroundColor: 'var(--bg-main, #f5f2eb)', borderColor: 'var(--border-subtle, #e5e0d8)', color: 'var(--text-primary, #1a1918)' }}
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
        placeholder={hasNoCategories ? "No categories available" : "Select a category"}
        disabled={hasNoCategories}
        />
    </div>
    </div>

    <div>
    <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary, #666059)' }}>
        Project Images <span className="text-red-400">*</span>
        <span className="font-normal ml-1" style={{ color: 'var(--text-secondary, #666059)' }}>
        ({images.length}/{MAX_IMAGES})
        </span>
    </label>

    {images.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mb-2">
        {images.map((url) => (
            <div key={url} className="relative aspect-square rounded-lg overflow-hidden border" style={{ borderColor: 'var(--border-subtle, #e5e0d8)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="Uploaded" className="w-full h-full object-cover" />
            <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute top-1 right-1 p-1 rounded-full bg-black/60 hover:bg-black/80 transition-colors"
            >
                <X className="w-3 h-3 text-white" />
            </button>
            </div>
        ))}
        </div>
    )}

    {slotsRemaining > 0 && (
        <div
        className="relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors hover:border-[#c88346]"
        style={{ borderColor: 'var(--border-subtle, #e5e0d8)', backgroundColor: 'var(--bg-main, #f5f2eb)' }}
        >
        <input
            type="file"
            accept="image/*"
            multiple
            disabled={uploading || hasNoCategories}
            onChange={(e) => handleFilesSelect(e.target.files)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        <div className="flex flex-col items-center justify-center gap-1">
            {uploading ? (
            <Loader2 className="w-6 h-6 animate-spin text-[#c88346]" />
            ) : (
            <UploadCloud className="w-6 h-6 text-[#c88346]" />
            )}
            <p className="text-xs font-medium" style={{ color: 'var(--text-primary, #1a1918)' }}>
            {uploading ? 'Uploading...' : `Click or Drag & Drop up to ${slotsRemaining} more image${slotsRemaining > 1 ? 's' : ''}`}
            </p>
            <p className="text-[10px]" style={{ color: 'var(--text-secondary, #666059)' }}>
            Supports JPG, PNG, WebP
            </p>
        </div>
        </div>
    )}
    </div>

    <div>
    <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary, #666059)' }}>
        Link (GitHub, Live Demo, Drive, Instagram, etc.)
    </label>
    <input
        type="text"
        placeholder="https://..."
        value={externalLink}
        onChange={(e) => setExternalLink(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none transition-colors"
        style={{ backgroundColor: 'var(--bg-main, #f5f2eb)', borderColor: 'var(--border-subtle, #e5e0d8)', color: 'var(--text-primary, #1a1918)' }}
    />
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
        style={{ backgroundColor: 'var(--bg-main, #f5f2eb)', borderColor: 'var(--border-subtle, #e5e0d8)', color: 'var(--text-primary, #1a1918)' }}
    />
    </div>

    <div>
    <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary, #666059)' }}>
        Project Description / Details
    </label>
    <textarea
        rows={3}
        placeholder="Brief description of the project, your role, tools used..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none transition-colors resize-none"
        style={{ backgroundColor: 'var(--bg-main, #f5f2eb)', borderColor: 'var(--border-subtle, #e5e0d8)', color: 'var(--text-primary, #1a1918)' }}
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

    <div className="flex items-center justify-between pt-3 border-t gap-3" style={{ borderColor: 'var(--border-subtle, #e5e0d8)' }}>
    {hasNoCategories ? (
        <p className="text-xs font-medium text-amber-600">
        You don&apos;t have any categories yet.{' '}
        <Link href="/admin/categories" className="underline font-semibold hover:text-amber-700">
            Add a category
        </Link>
        </p>
    ) : <div />}

    <Button 
        type="submit" 
        disabled={submitting || uploading || hasNoCategories} 
        variant="primary" 
        className="gap-2 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
    >
        {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
        <span>{initialData ? 'Update Project' : 'Save Project'}</span>
    </Button>
    </div>
</form>
);
}