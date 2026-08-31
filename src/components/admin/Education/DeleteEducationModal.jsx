'use client';

import React from 'react';
import Modal from '@/components/ui/Modal'; // Adjust import path if needed
import Button from '@/components/ui/Button'; // Adjust import path if needed
import { AlertTriangle } from 'lucide-react';

export default function DeleteEducationModal({ isOpen, onClose, onConfirm, isDeleting }) {
return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Education Record">
    <div className="space-y-5">
        <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 shrink-0">
            <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-1">
            <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            Are you sure you want to delete this education entry?
            </h4>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            This action cannot be undone and will permanently remove this record from your dashboard and portfolio.
            </p>
        </div>
        </div>

        {/* Footer Actions */}
        <div
        className="flex items-center justify-end gap-3 pt-4 border-t"
        style={{ borderColor: 'var(--border-subtle)' }}
        >
        <Button variant="secondary" size="sm" onClick={onClose} disabled={isDeleting}>
            Cancel
        </Button>
        <Button variant="danger" size="sm" onClick={onConfirm} isLoading={isDeleting}>
            Delete
        </Button>
        </div>
    </div>
    </Modal>
);
}