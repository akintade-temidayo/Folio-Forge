'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function Select({ label, options = [], value, onChange, placeholder = 'Select an option' }) {
const [isOpen, setIsOpen] = useState(false);
const containerRef = useRef(null);

useEffect(() => {
const handleClickOutside = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
    setIsOpen(false);
    }
};
document.addEventListener('mousedown', handleClickOutside);
return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

const selectedOption = options.find(
(opt) => opt.value === value || opt._id === value || opt.name === value
);

const displayLabel = selectedOption
? (selectedOption.label || selectedOption.name || selectedOption.value)
: placeholder;

return (
<div className="flex flex-col gap-1.5 w-full relative" ref={containerRef}>
    {label && (
    <label className="text-xs font-semibold" style={{ color: 'var(--text-secondary, #a89f91)' }}>
        {label}
    </label>
    )}

    <button
    type="button"
    onClick={() => setIsOpen(!isOpen)}
    className="w-full border rounded-xl px-4 py-2.5 text-sm flex items-center justify-between focus:outline-none transition-colors"
    style={{
        backgroundColor: 'var(--bg-main, #1c1917)',
        borderColor: 'var(--border-subtle, #38322c)',
        color: selectedOption ? 'var(--text-primary, #f5f2eb)' : 'var(--text-secondary, #a89f91)',
    }}
    >
    <span>{displayLabel}</span>
    <ChevronDown
        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        style={{ color: 'var(--text-secondary, #a89f91)' }}
    />
    </button>

    {isOpen && (
    <div
        className="absolute top-[105%] left-0 w-full z-50 border rounded-xl shadow-2xl p-1.5 space-y-1 backdrop-blur-md animate-in fade-in zoom-in-95 duration-100 max-h-56 overflow-y-auto"
        style={{
        backgroundColor: 'var(--bg-surface, #26221f)',
        borderColor: 'var(--border-subtle, #38322c)',
        }}
    >
        {options.length === 0 ? (
        <div className="px-3.5 py-2 text-xs text-center" style={{ color: 'var(--text-secondary, #a89f91)' }}>
            No categories available
        </div>
        ) : (
        options.map((option) => {
            const optValue = option.value || option._id || option.name;
            const optLabel = option.label || option.name;
            const isSelected = value === optValue;

            return (
            <button
                key={optValue}
                type="button"
                onClick={() => {
                onChange(optValue);
                setIsOpen(false);
                }}
                className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between transition-colors"
                style={{
                backgroundColor: isSelected ? 'var(--bg-surface-hover, #332e29)' : 'transparent',
                color: isSelected ? 'var(--accent-warm, #c88346)' : 'var(--text-primary, #f5f2eb)',
                }}
            >
                <span>{optLabel}</span>
                {isSelected && <Check className="w-4 h-4" style={{ color: 'var(--accent-warm, #c88346)' }} />}
            </button>
            );
        })
        )}
    </div>
    )}
</div>
);
}