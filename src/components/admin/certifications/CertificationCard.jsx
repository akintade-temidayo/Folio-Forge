'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { Award, Calendar, Hash, ExternalLink, Pencil, Trash2, FileText } from 'lucide-react';

export default function CertificationCard({ cert, onEdit, onDelete }) {
const [isDeleteOpen, setIsDeleteOpen] = useState(false);
const isPdf = cert.fileUrl?.toLowerCase().endsWith('.pdf');

const handleConfirmDelete = () => {
    onDelete(cert._id);
    setIsDeleteOpen(false);
};

return (
    <>
    <div
        className="p-5 rounded-2xl border space-y-4 transition-all hover:border-white/20 shadow-xs flex flex-col justify-between"
        style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        }}
    >
        <div className="space-y-3">
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
            <div
                className="p-2.5 rounded-xl border shrink-0 mt-0.5"
                style={{
                backgroundColor: 'var(--bg-main)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--accent-warm)',
                }}
            >
                <Award className="w-5 h-5" />
            </div>
            <div>
                <h4
                className="text-base font-semibold leading-snug"
                style={{ color: 'var(--text-primary)' }}
                >
                {cert.title}
                </h4>
                <p
                className="text-xs flex items-center gap-1.5 mt-1"
                style={{ color: 'var(--text-secondary)' }}
                >
                <Calendar className="w-3.5 h-3.5" />
                <span>Issued {cert.issueDate}</span>
                </p>
            </div>
            </div>

            <a
            href={cert.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg border transition-all hover:opacity-80 shrink-0"
            style={{
                backgroundColor: 'var(--bg-main)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--accent-warm)',
            }}
            title="View Original Certificate"
            >
            <ExternalLink className="w-4 h-4" />
            </a>
        </div>

        {/* Media / File Thumbnail Preview */}
        <div
            className="relative w-full h-32 rounded-xl border overflow-hidden flex items-center justify-center group"
            style={{
            backgroundColor: 'var(--bg-main)',
            borderColor: 'var(--border-subtle)',
            }}
        >
            {isPdf ? (
            <div className="flex flex-col items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                <FileText className="w-8 h-8" style={{ color: 'var(--accent-warm)' }} />
                <span>PDF Document Attached</span>
            </div>
            ) : (
            <img
                src={cert.fileUrl}
                alt={cert.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.classList.add('fallback-preview');
                }}
            />
            )}
        </div>

        {/* Credential ID Tag */}
        <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border w-fit text-xs font-mono"
            style={{
            backgroundColor: 'var(--bg-main)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-secondary)',
            }}
        >
            <Hash className="w-3.5 h-3.5" style={{ color: 'var(--accent-warm)' }} />
            <span>ID: {cert.credentialId}</span>
        </div>
        </div>

        {/* Action Buttons */}
        <div
        className="flex items-center justify-end gap-2 pt-3 border-t"
        style={{ borderColor: 'var(--border-subtle)' }}
        >
        <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(cert)}
            className="gap-1.5"
        >
            <Pencil className="w-3.5 h-3.5" />
            <span>Edit</span>
        </Button>

        <Button
            variant="danger"
            size="sm"
            onClick={() => setIsDeleteOpen(true)}
            className="gap-1.5"
        >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
        </Button>
        </div>
    </div>

    {/* Custom Confirmation Modal */}
    <ConfirmDeleteModal 
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Certification"
    />
    </>
);
}