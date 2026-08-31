'use client';

import React, { useState, useEffect } from 'react';
import Input from '@/components/ui/Input';
import DateSelect from '@/components/ui/DateSelect';
import Button from '@/components/ui/Button';
import { useFileUpload } from '@/app/hooks/useFileUpload';
import { generateClientCredentialId } from '@/lib/certification-functions';
import { Loader2, UploadCloud, CheckCircle, RefreshCw, FileText } from 'lucide-react';

export default function CertificationForm({ initialData = null, onSubmit, onCancel }) {
const { upload, isUploading, error: uploadError } = useFileUpload();

const getInitialFormState = () => ({
    title: initialData?.title || '',
    fileUrl: initialData?.fileUrl || '',
    issueDate: initialData?.issueDate || '',
    credentialId: initialData?.credentialId || generateClientCredentialId(),
});

const [title, setTitle] = useState(() => getInitialFormState().title);
const [fileUrl, setFileUrl] = useState(() => getInitialFormState().fileUrl);
const [issueDate, setIssueDate] = useState(() => getInitialFormState().issueDate);
const [credentialId, setCredentialId] = useState(() => getInitialFormState().credentialId);

const [submitting, setSubmitting] = useState(false);
const [errorMsg, setErrorMsg] = useState('');

const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg('');
    const uploadedUrl = await upload(file);
    if (uploadedUrl) {
    setFileUrl(uploadedUrl);
    }
};

const handleRegenerateId = () => {
    setCredentialId(generateClientCredentialId());
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) {
    setErrorMsg('Please enter a certification title.');
    return;
    }
    if (!fileUrl.trim()) {
    setErrorMsg('Please upload a document/image or provide a URL.');
    return;
    }
    if (!issueDate.trim()) {
    setErrorMsg('Please select an issue date.');
    return;
    }

    try {
    setSubmitting(true);
    await onSubmit({
        title: title.trim(),
        fileUrl: fileUrl.trim(),
        issueDate: issueDate.trim(),
        credentialId: credentialId.trim() || generateClientCredentialId(),
    });
    } catch (err) {
    setErrorMsg(err.message || 'An error occurred while saving.');
    } finally {
    setSubmitting(false);
    }
};

return (
    <form onSubmit={handleSubmit} className="space-y-5">
    {(errorMsg || uploadError) && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-medium">
        {errorMsg || uploadError}
        </div>
    )}

    {/* Title Input */}
    <Input
        label="Certification Title *"
        placeholder="e.g. AWS Certified Solutions Architect"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
    />

    {/* File Upload / Link Input */}
    <div className="space-y-2">
        <label
        className="text-xs font-medium tracking-wide block"
        style={{ color: 'var(--text-secondary)' }}
        >
        Certificate File / Document *
        </label>

        <div
        className="relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors hover:border-[#c88346]"
        style={{
            borderColor: 'var(--border-subtle, #e5e0d8)',
            backgroundColor: 'var(--bg-main, #f5f2eb)',
        }}
        >
        <input
            type="file"
            accept="image/*,application/pdf"
            disabled={isUploading}
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
        />
        <div className="flex flex-col items-center justify-center gap-1.5">
            {isUploading ? (
            <Loader2 className="w-6 h-6 animate-spin text-[#c88346]" />
            ) : fileUrl ? (
            <CheckCircle className="w-6 h-6 text-emerald-500" />
            ) : (
            <UploadCloud className="w-6 h-6 text-[#c88346]" />
            )}
            <p className="text-xs font-medium" style={{ color: 'var(--text-primary, #1a1918)' }}>
            {isUploading
                ? 'Uploading document...'
                : fileUrl
                ? 'Certificate Attached & Ready'
                : 'Click or Drag & Drop File (Image or PDF)'}
            </p>
            <p className="text-[10px]" style={{ color: 'var(--text-secondary, #666059)' }}>
            Supports PNG, JPG, WEBP, or PDF
            </p>
        </div>
        </div>

        {/* Direct URL Fallback */}
        <div className="pt-1">
        <Input
            placeholder="Or paste direct certificate URL (Cloudinary, Drive, Credly)..."
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
        />
        </div>
    </div>

    {/* Date Select */}
    <DateSelect
        label="Issue Date *"
        value={issueDate}
        onChange={(val) => setIssueDate(val)}
    />

    {/* Credential ID Input + Regenerate Button */}
    <div className="space-y-1.5">
        <div className="flex items-center justify-between">
        <label
            className="text-xs font-medium tracking-wide"
            style={{ color: 'var(--text-secondary)' }}
        >
            Credential ID
        </label>
        <button
            type="button"
            onClick={handleRegenerateId}
            className="text-[11px] font-medium flex items-center gap-1 transition-colors hover:underline"
            style={{ color: 'var(--accent-warm)' }}
        >
            <RefreshCw className="w-3 h-3" />
            <span>Generate New ID</span>
        </button>
        </div>

        <div className="flex items-center gap-2">
        <Input
            value={credentialId}
            onChange={(e) => setCredentialId(e.target.value)}
            placeholder="CRT-XXXXXX"
        />
        </div>
    </div>

    {/* Action Buttons */}
    <div
        className="flex items-center justify-end gap-3 pt-4 border-t"
        style={{ borderColor: 'var(--border-subtle)' }}
    >
        {onCancel && (
        <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={submitting || isUploading}
        >
            Cancel
        </Button>
        )}
        <Button
        type="submit"
        variant="primary"
        isLoading={submitting}
        disabled={submitting || isUploading}
        >
        {initialData ? 'Update Certification' : 'Save Certification'}
        </Button>
    </div>
    </form>
);
}