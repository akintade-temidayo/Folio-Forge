'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const MONTHS = [
'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const currentYearNum = new Date().getFullYear();
const YEARS = Array.from({ length: currentYearNum - 1990 + 1 }, (_, i) => String(currentYearNum - i));

export default function DateSelect({
label,
value = '',
onChange,
allowPresent = false,
error,
}) {
const isPresentVal = value?.toLowerCase() === 'present';

const yearScrollRef = useRef(null);
const [canScrollUp, setCanScrollUp] = useState(false);
const [canScrollDown, setCanScrollDown] = useState(true);

let selectedMonth = '';
let selectedYear = '';

if (!isPresentVal && value) {
    if (value.includes(' ')) {
    const [m, y] = value.split(' ');
    selectedMonth = MONTHS.includes(m) ? m : '';
    selectedYear = y || '';
    } else if (MONTHS.includes(value)) {
    selectedMonth = value;
    } else if (YEARS.includes(value)) {
    selectedYear = value;
    }
}

const handleYearScroll = () => {
    if (!yearScrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = yearScrollRef.current;
    
    setCanScrollUp(scrollTop > 4);
    setCanScrollDown(scrollTop + clientHeight < scrollHeight - 4);
};

useEffect(() => {
    handleYearScroll();
}, []);

const emitValue = (m, y) => {
    if (m && y) {
    onChange(`${m} ${y}`);
    } else if (m) {
    onChange(m);
    } else if (y) {
    onChange(y);
    } else {
    onChange('');
    }
};

const handleSelectMonth = (m) => {
    const nextMonth = selectedMonth === m ? '' : m;
    emitValue(nextMonth, selectedYear);
};

const handleSelectYear = (y) => {
    const nextYear = selectedYear === y ? '' : y;
    emitValue(selectedMonth, nextYear);
};

const handleTogglePresent = (e) => {
    if (e.target.checked) {
    onChange('Present');
    } else {
    const defaultM = MONTHS[0];
    const defaultY = String(currentYearNum);
    emitValue(defaultM, defaultY);
    }
};

return (
    <div className="w-full flex flex-col gap-2">
    {label && (
        <label className="text-xs font-medium tracking-wide" style={{ color: 'var(--text-secondary)' }}>
        {label}
        </label>
    )}

    {isPresentVal ? (
        <div className="flex items-center justify-between rounded-xl px-4 py-3 text-sm border border-(--border-subtle) bg-(--bg-main) text-(--accent-warm) font-medium">
        <span>Present</span>
        {allowPresent && (
            <label className="flex items-center gap-1.5 text-xs text-(--text-secondary) cursor-pointer select-none">
            <input
                type="checkbox"
                checked={true}
                onChange={handleTogglePresent}
                className="rounded accent-(--accent-warm)"
            />
            Currently working here
            </label>
        )}
        </div>
    ) : (
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        {/* Month Selector Box */}
        <div className="sm:col-span-7 p-3 rounded-2xl border border-(--border-subtle) bg-(--bg-main) space-y-2">
            <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-(--text-secondary)">
                Month
            </span>
            <span className="text-xs font-medium text-(--accent-warm)">
                {selectedMonth || 'Select'}
            </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
            {MONTHS.map((m) => {
                const isSelected = selectedMonth === m;
                return (
                <button
                    key={m}
                    type="button"
                    onClick={() => handleSelectMonth(m)}
                    className={`py-2 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                    isSelected
                        ? 'bg-(--accent-warm) text-white shadow-xs'
                        : 'text-(--text-primary) hover:bg-(--bg-surface)'
                    }`}
                >
                    {m}
                </button>
                );
            })}
            </div>
        </div>

        {/* Year Selector Box with Scroll Indicators */}
        <div className="sm:col-span-5 p-3 rounded-2xl border border-(--border-subtle) bg-(--bg-main) space-y-2 flex flex-col justify-between relative">
            <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-(--text-secondary)">
                Year
            </span>
            <span className="text-xs font-medium text-(--accent-warm)">
                {selectedYear || 'Select'}
            </span>
            </div>

            {/* Scrollable Container with Indicator Wrappers */}
            <div className="relative flex-1">
            {canScrollUp && (
                <div className="absolute top-0 left-0 right-0 h-6 bg-linear-to-b from-(--bg-main) to-transparent z-10 flex items-start justify-center pointer-events-none">
                <ChevronUp className="w-3.5 h-3.5 text-(--accent-warm) animate-bounce" />
                </div>
            )}

            <div
                ref={yearScrollRef}
                onScroll={handleYearScroll}
                className="h-28 overflow-y-auto no-scrollbar grid grid-cols-2 gap-1.5 py-1"
            >
                {YEARS.map((y) => {
                const isSelected = selectedYear === y;
                return (
                    <button
                    key={y}
                    type="button"
                    onClick={() => handleSelectYear(y)}
                    className={`py-2 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                        isSelected
                        ? 'bg-(--accent-warm) text-white shadow-xs'
                        : 'text-(--text-primary) hover:bg-(--bg-surface)'
                    }`}
                    >
                    {y}
                    </button>
                );
                })}
            </div>

            {canScrollDown && (
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-linear-to-t from-(--bg-main) to-transparent z-10 flex items-end justify-center pointer-events-none">
                <ChevronDown className="w-3.5 h-3.5 text-(--accent-warm) animate-bounce" />
                </div>
            )}
            </div>
        </div>
        </div>
    )}

    {/* Checkbox for Present option */}
    {allowPresent && !isPresentVal && (
        <label className="flex items-center gap-2 text-xs text-(--text-secondary) mt-0.5 cursor-pointer select-none">
        <input
            type="checkbox"
            checked={false}
            onChange={handleTogglePresent}
            className="rounded accent-(--accent-warm)"
        />
        Still here (Present)
        </label>
    )}

    {error && <span className="text-xs text-red-400 mt-0.5">{error}</span>}
    </div>
);
}