'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const DEGREE_OPTIONS = [
{
    category: 'High School & Secondary',
    options: [
    'High School Diploma',
    'GED / Secondary School Certificate',
    'West African Senior School Certificate (WASSCE)',
    'National Examinations Council (SSCE)',
    'General Certificate of Education (GCE)',
    ],
},
{
    category: 'Associate Degrees',
    options: [
    'Associate of Arts (A.A.)',
    'Associate of Science (A.S.)',
    'Associate of Applied Science (A.A.S.)',
    ],
},
{
    category: "Bachelor's Degrees",
    options: [
    'Bachelor of Science (B.Sc.)',
    'Bachelor of Arts (B.A.)',
    'Bachelor of Engineering (B.Eng.)',
    'Bachelor of Technology (B.Tech.)',
    'Bachelor of Business Administration (B.B.A.)',
    'Bachelor of Fine Arts (B.F.A.)',
    'Bachelor of Laws (LL.B.)',
    'Bachelor of Medicine, Bachelor of Surgery (MBBS)',
    'Bachelor of Computer Applications (BCA)',
    ],
},
{
    category: "Master's Degrees",
    options: [
    'Master of Science (M.Sc.)',
    'Master of Arts (M.A.)',
    'Master of Business Administration (MBA)',
    'Master of Engineering (M.Eng.)',
    'Master of Technology (M.Tech.)',
    'Master of Fine Arts (M.F.A.)',
    'Master of Laws (LL.M.)',
    'Master of Public Health (MPH)',
    ],
},
{
    category: 'Doctorate & Professional',
    options: [
    'Doctor of Philosophy (Ph.D.)',
    'Doctor of Medicine (M.D.)',
    'Doctor of Business Administration (DBA)',
    'Juris Doctor (J.D.)',
    'Doctor of Education (Ed.D.)',
    ],
},
{
    category: 'Diplomas & Certifications',
    options: [
    'Postgraduate Diploma (PGD)',
    'Higher National Diploma (HND)',
    'Ordinary National Diploma (OND)',
    'Professional Certificate',
    ],
},
];

export default function DegreeSelect({
label = 'Degree / Qualification *',
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
    onChange({ target: { name: 'degree', value: optionValue } });
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
        {value || 'Select Degree / Qualification'}
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
        {DEGREE_OPTIONS.map((group) => (
            <div key={group.category} className="mb-3 last:mb-1">
            {/* Category Header Card */}
            <div className="sticky top-0 z-10 my-1 px-3 py-1.5 rounded-lg bg-(--bg-surface) border border-(--border-subtle) text-[13px] font-bold uppercase tracking-wider text-(--accent-warm)">
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
            <span>Other / Custom Qualification</span>
            {value === 'Other' && <Check className="w-3.5 h-3.5 shrink-0 ml-2" />}
            </button>
        </div>
        </div>
    )}

    {error && <span className="text-xs text-red-400 mt-0.5">{error}</span>}
    </div>
);
}