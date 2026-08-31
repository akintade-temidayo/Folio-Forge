'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const GRADE_OPTIONS = [
{
    category: 'Nigerian University System (5.0 Scale)',
    options: [
    'First Class Honours (4.50 – 5.00)',
    'Second Class Honours Upper Division / 2:1 (3.50 – 4.49)',
    'Second Class Honours Lower Division / 2:2 (2.40 – 3.49)',
    'Third Class Honours (1.50 – 2.39)',
    'Pass (1.00 – 1.49)',
    ],
},
{
    category: 'Polytechnic / Higher National Diploma (4.0 Scale)',
    options: [
    'Distinction (3.50 – 4.00)',
    'Upper Credit (3.00 – 3.49)',
    'Lower Credit (2.50 – 2.99)',
    'Pass (2.00 – 2.49)',
    ],
},
{
    category: 'General / Post-Graduate Grades',
    options: [
    'Distinction',
    'Merit / Credit',
    'Pass',
    ],
},
];

export default function GradeSelect({
label = 'Grade / Class of Degree',
value = '',
onChange,
error,
}) {
const [isOpen, setIsOpen] = useState(false);
const dropdownRef = useRef(null);

useEffect(() => {
    const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
    }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

const handleSelect = (optionValue) => {
    onChange({ target: { name: 'grade', value: optionValue } });
    setIsOpen(false);
};

return (
    <div className="w-full flex flex-col gap-1.5 relative" ref={dropdownRef}>
    {label && (
        <label className="text-xs font-medium tracking-wide" style={{ color: 'var(--text-secondary)' }}>
        {label}
        </label>
    )}

    {/* Trigger Button */}
    <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm border outline-none transition-all cursor-pointer bg-(--bg-main) ${
        isOpen ? 'border-(--accent-warm)' : 'border-(--border-subtle)'
        }`}
    >
        <span className={value ? 'text-(--text-primary)' : 'text-(--text-secondary)'}>
        {value || 'Select Grade / Class of Degree'}
        </span>
        <ChevronDown
        className={`w-4 h-4 text-(--text-secondary) transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-(--accent-warm)' : ''
        }`}
        />
    </button>

    {/* Popover Menu */}
    {isOpen && (
        <div className="absolute top-[calc(100%+6px)] left-0 w-full z-50 max-h-60 overflow-y-auto rounded-2xl border border-(--border-subtle) bg-(--bg-main) p-1.5 shadow-2xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar:none">
        {GRADE_OPTIONS.map((group) => (
            <div key={group.category} className="mb-3 last:mb-1">
            {/* Category Header Card */}
            <div className="sticky top-0 z-10 my-1 px-3 py-1.5 rounded-lg bg-(--bg-surface) border border-(--border-subtle) text-[10px] font-bold uppercase tracking-wider text-(--accent-warm)">
                {group.category}
            </div>

            {/* Options under Category */}
            <div className="space-y-0.5 mt-1">
                {group.options.map((option) => {
                const isSelected = value === option;
                return (
                    <button
                    key={option}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer text-left ${
                        isSelected
                        ? 'bg-(--accent-warm) text-white font-semibold'
                        : 'text-(--text-primary) hover:bg-(--bg-surface)'
                    }`}
                    >
                    <span>{option}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 shrink-0 ml-2" />}
                    </button>
                );
                })}
            </div>
            </div>
        ))}

        {/* Custom Option Header & Button */}
        <div className="pt-2 border-t border-(--border-subtle)">
            <button
            type="button"
            onClick={() => handleSelect('Other')}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                value === 'Other'
                ? 'bg-(--accent-warm) text-white font-semibold'
                : 'text-(--text-primary) hover:bg-(--bg-surface)'
            }`}
            >
            <span>Other / Specific Score (e.g. 3.85 / 4.0)</span>
            {value === 'Other' && <Check className="w-3.5 h-3.5 shrink-0 ml-2" />}
            </button>
        </div>
        </div>
    )}

    {error && <span className="text-xs text-red-400 mt-0.5">{error}</span>}
    </div>
);
}