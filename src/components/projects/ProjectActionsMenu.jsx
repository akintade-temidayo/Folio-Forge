'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Eye, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function ProjectActionsMenu({ projectId, onEdit, onDelete }) {
const [isOpen, setIsOpen] = useState(false);
const menuRef = useRef(null);

// Close the dropdown on outside click or Escape, so it behaves like a
// normal menu rather than staying pinned open until the trigger is
// clicked again.
useEffect(() => {
if (!isOpen) return;

const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
    setIsOpen(false);
    }
};
const handleEscape = (e) => {
    if (e.key === 'Escape') setIsOpen(false);
};

document.addEventListener('mousedown', handleClickOutside);
document.addEventListener('keydown', handleEscape);
return () => {
    document.removeEventListener('mousedown', handleClickOutside);
    document.removeEventListener('keydown', handleEscape);
};
}, [isOpen]);

const handleEdit = () => {
setIsOpen(false);
onEdit();
};

const handleDelete = () => {
setIsOpen(false);
onDelete();
};

return (
<div className="relative inline-block" ref={menuRef}>
    <Button
    size="sm"
    variant="secondary"
    onClick={() => setIsOpen((prev) => !prev)}
    title="Project actions"
    aria-label="Project actions"
    aria-haspopup="true"
    aria-expanded={isOpen}
    >
    <MoreVertical className="w-3.5 h-3.5" />
    </Button>

    {isOpen && (
    <div
        className="absolute right-0 top-full mt-1.5 w-44 rounded-xl border shadow-xl z-20 overflow-hidden py-1"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
    >
        <Link
        href={`/projects/${projectId}`}
        target="_blank"
        onClick={() => setIsOpen(false)}
        className="flex items-center gap-2.5 px-3.5 py-2 text-xs transition-colors hover:bg-(--bg-surface-hover)"
        style={{ color: 'var(--text-primary)' }}
        >
        <Eye className="w-3.5 h-3.5" style={{ color: 'var(--text-secondary)' }} />
        View live page
        </Link>

        <button
        type="button"
        onClick={handleEdit}
        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-left transition-colors hover:bg-(--bg-surface-hover)"
        style={{ color: 'var(--text-primary)' }}
        >
        <Edit2 className="w-3.5 h-3.5" style={{ color: 'var(--text-secondary)' }} />
        Edit project
        </button>

        <button
        type="button"
        onClick={handleDelete}
        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-left text-red-400 transition-colors hover:bg-red-500/10"
        >
        <Trash2 className="w-3.5 h-3.5" />
        Delete project
        </button>
    </div>
    )}
</div>
);
}