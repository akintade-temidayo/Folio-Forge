'use client';

import React from 'react';

const MONTHS = [
'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// Generate years from current year down to 1980
const currentYearNum = new Date().getFullYear();
const YEARS = Array.from({ length: currentYearNum - 1980 + 1 }, (_, i) => String(currentYearNum - i));

export default function DateSelect({
label,
value = '',
onChange,
allowPresent = false,
error,
}) {
const isPresentVal = value?.toLowerCase() === 'present';

// Derive month & year directly from `value` prop without useEffect state!
let selectedMonth = '';
let selectedYear = '';

if (!isPresentVal && value) {
if (value.includes(' ')) {
    const [m, y] = value.split(' ');
    selectedMonth = MONTHS.includes(m) ? m : '';
    selectedYear = y || '';
} else if (YEARS.includes(value)) {
    selectedYear = value;
}
}

const emitValue = (m, y) => {
if (m && y) {
    onChange(`${m} ${y}`);
} else if (y) {
    onChange(y);
} else {
    onChange('');
}
};

const handleMonthChange = (e) => {
const m = e.target.value;
emitValue(m, selectedYear);
};

const handleYearChange = (e) => {
const y = e.target.value;
emitValue(selectedMonth, y);
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
<div className="w-full flex flex-col gap-1.5">
    {label && (
    <label className="text-xs font-medium tracking-wide" style={{ color: 'var(--text-secondary)' }}>
        {label}
    </label>
    )}

    {isPresentVal ? (
    <div className="flex items-center justify-between rounded-lg px-4 py-2.5 text-sm border border-(--border-subtle) bg-(--bg-main) text-(--accent-warm) font-medium">
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
    <div className="flex items-center gap-2">
        {/* Month Dropdown */}
        <select
        value={selectedMonth}
        onChange={handleMonthChange}
        className="w-1/2 rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors border border-(--border-subtle) bg-(--bg-main) text-(--text-primary) cursor-pointer"
        >
        <option value="">Select Month</option>
        {MONTHS.map((m) => (
            <option key={m} value={m}>
            {m}
            </option>
        ))}
        </select>

        {/* Year Dropdown */}
        <select
        value={selectedYear}
        onChange={handleYearChange}
        className="w-1/2 rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors border border-(--border-subtle) bg-(--bg-main) text-(--text-primary) cursor-pointer"
        >
        <option value="">Select Year</option>
        {YEARS.map((y) => (
            <option key={y} value={y}>
            {y}
            </option>
        ))}
        </select>
    </div>
    )}

    {/* Checkbox for Present option */}
    {allowPresent && !isPresentVal && (
    <label className="flex items-center gap-2 text-xs text-(--text-secondary) mt-1 cursor-pointer select-none">
        <input
        type="checkbox"
        checked={false}
        onChange={handleTogglePresent}
        className="rounded accent-(--accent-warm)"
        />
        I currently work here (Present)
    </label>
    )}

    {error && <span className="text-xs text-red-400 mt-0.5">{error}</span>}
</div>
);
}