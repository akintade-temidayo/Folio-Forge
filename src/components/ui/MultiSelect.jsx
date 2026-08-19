'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X, Plus } from 'lucide-react';

export default function MultiSelect({
label,
options = [],
value = [],
onChange,
placeholder = 'Select options',
allowCustom = false,
}) {
const [isOpen, setIsOpen] = useState(false);
const [customInput, setCustomInput] = useState('');
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

const toggleOption = (optValue) => {
if (value.includes(optValue)) {
    onChange(value.filter((v) => v !== optValue));
} else {
    onChange([...value, optValue]);
}
};

const removeChip = (optValue) => {
onChange(value.filter((v) => v !== optValue));
};

const addCustom = () => {
const trimmed = customInput.trim();
if (trimmed && !value.includes(trimmed)) {
    onChange([...value, trimmed]);
}
setCustomInput('');
};

return (
<div className="flex flex-col gap-1.5 w-full relative" ref={containerRef}>
    {label && (
    <label className="text-xs font-semibold" style={{ color: 'var(--text-secondary, #a89f91)' }}>
        {label}
    </label>
    )}

    {/* Selected chips */}
    {value.length > 0 && (
    <div className="flex flex-wrap gap-1.5 mb-1">
        {value.map((v) => (
        <span
            key={v}
            className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border"
            style={{
            backgroundColor: 'var(--bg-surface-hover, #332e29)',
            borderColor: 'var(--accent-warm, #c88346)',
            color: 'var(--accent-warm, #c88346)',
            }}
        >
            {v}
            <button type="button" onClick={() => removeChip(v)} className="hover:opacity-70">
            <X className="w-3 h-3" />
            </button>
        </span>
        ))}
    </div>
    )}

    <button
    type="button"
    onClick={() => setIsOpen(!isOpen)}
    className="w-full border rounded-xl px-4 py-2.5 text-sm flex items-center justify-between focus:outline-none transition-colors"
    style={{
        backgroundColor: 'var(--bg-main, #1c1917)',
        borderColor: 'var(--border-subtle, #38322c)',
        color: 'var(--text-secondary, #a89f91)',
    }}
    >
    <span>{value.length > 0 ? `${value.length} selected` : placeholder}</span>
    <ChevronDown
        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        style={{ color: 'var(--text-secondary, #a89f91)' }}
    />
    </button>

    {isOpen && (
    <div
        className="absolute top-[105%] left-0 w-full z-50 border rounded-xl shadow-2xl p-1.5 space-y-1 backdrop-blur-md max-h-64 overflow-y-auto"
        style={{
        backgroundColor: 'var(--bg-surface, #26221f)',
        borderColor: 'var(--border-subtle, #38322c)',
        }}
    >
        {options.length === 0 ? (
        <div className="px-3.5 py-2 text-xs text-center" style={{ color: 'var(--text-secondary, #a89f91)' }}>
            No options available
        </div>
        ) : (
        options.map((option) => {
            const optValue = typeof option === 'string' ? option : option.value;
            const optLabel = typeof option === 'string' ? option : option.label;
            const isSelected = value.includes(optValue);

            return (
            <button
                key={optValue}
                type="button"
                onClick={() => toggleOption(optValue)}
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

        {allowCustom && (
        <div className="flex items-center gap-1.5 pt-1.5 mt-1.5 border-t" style={{ borderColor: 'var(--border-subtle, #38322c)' }}>
            <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                e.preventDefault();
                addCustom();
                }
            }}
            placeholder="Add custom..."
            className="flex-1 px-3 py-2 rounded-lg text-sm focus:outline-none"
            style={{
                backgroundColor: 'var(--bg-main, #1c1917)',
                color: 'var(--text-primary, #f5f2eb)',
            }}
            />
            <button
            type="button"
            onClick={addCustom}
            className="p-2 rounded-lg"
            style={{ backgroundColor: 'var(--accent-warm, #c88346)', color: 'var(--bg-main, #1c1917)' }}
            >
            <Plus className="w-4 h-4" />
            </button>
        </div>
        )}
    </div>
    )}
</div>
);
}