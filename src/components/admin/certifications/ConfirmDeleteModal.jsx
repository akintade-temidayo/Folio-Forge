'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, title = "Delete Item" }) {
if (!isOpen) return null;

return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in-50">
    <div 
        className="w-full max-w-md rounded-2xl border p-6 space-y-4 shadow-xl"
        style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        }}
    >
        {/* Header */}
        <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
            <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
            <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                {title}
            </h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                This action cannot be undone.
            </p>
            </div>
        </div>
        <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/5 transition-colors"
            style={{ color: 'var(--text-secondary)' }}
        >
            <X className="w-4 h-4" />
        </button>
        </div>

        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Are you sure you want to delete this certification? It will be permanently removed from your portfolio.
        </p>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
        <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
        </Button>
        <Button variant="danger" size="sm" onClick={onConfirm}>
            Yes, Delete
        </Button>
        </div>
    </div>
    </div>
);
}