'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
useEffect(() => {
const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
};
if (isOpen) {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
}
return () => {
    document.body.style.overflow = 'unset';
    window.removeEventListener('keydown', handleKeyDown);
};
}, [isOpen, onClose]);

if (!isOpen) return null;

return (
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
    {/* Modal Container */}
    <div 
    className="relative w-full max-w-2xl max-h-[90vh] border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
    style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
    }}
    onClick={(e) => e.stopPropagation()}
    >
    {/* Header */}
    <div 
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: 'var(--border-subtle)' }}
    >
        <h3 className="text-lg font-serif font-medium" style={{ color: 'var(--text-primary)' }}>
        {title}
        </h3>
        <button
        onClick={onClose}
        className="p-1 rounded-lg transition-colors"
        style={{ color: 'var(--text-secondary)' }}
        >
        <X className="w-5 h-5" />
        </button>
    </div>

    {/* Body */}
    <div className="p-6 overflow-y-auto no-scrollbar">
        {children}
    </div>
    </div>
</div>
);
}