'use client';

import { useState } from 'react';

export default function PriceRangeInput({ minPrice, maxPrice, onMinChange, onMaxChange }) {
const [minTouched, setMinTouched] = useState(false);
const [maxTouched, setMaxTouched] = useState(false);

const MINIMUM_AMOUNT = 1000;

const handleChange = (value, onChange) => {
// Strip anything that isn't a digit (also blocks '-', '.', etc.)
let sanitized = value.replace(/[^0-9]/g, '');
// Strip leading zeros (but allow a single "0")
sanitized = sanitized.replace(/^0+(?=\d)/, '');
onChange(sanitized);
};

const isBelowMinimum = (value) =>
value !== '' && Number(value) > 0 && Number(value) < MINIMUM_AMOUNT;

const showMinError = minTouched && isBelowMinimum(minPrice);
const showMaxError = maxTouched && isBelowMinimum(maxPrice);

return (
<div>
    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
    Price Range (₦)
    </label>
    <div className="grid grid-cols-2 gap-3">
    <div>
        <div className="relative">
        <span className="absolute left-3.5 top-2.5 text-sm font-bold" style={{ color: 'var(--accent-warm)' }}>₦</span>
        <input
            type="text"
            inputMode="numeric"
            placeholder="From (e.g. 500,000)"
            value={minPrice ? Number(minPrice).toLocaleString('en-US') : ''}
            onChange={(e) => handleChange(e.target.value, onMinChange)}
            onBlur={() => setMinTouched(true)}
            className="w-full pl-8 pr-3.5 py-2.5 rounded-xl text-sm focus:outline-none transition-colors border"
            style={{
            backgroundColor: 'var(--bg-main)',
            borderColor: showMinError ? '#f87171' : 'var(--border-subtle)',
            color: 'var(--text-primary)',
            }}
        />
        </div>
        {showMinError && (
        <p className="text-[11px] text-red-400 mt-1">Minimum amount is ₦{MINIMUM_AMOUNT.toLocaleString('en-US')}</p>
        )}
    </div>

    <div>
        <div className="relative">
        <span className="absolute left-3.5 top-2.5 text-sm font-bold" style={{ color: 'var(--accent-warm)' }}>₦</span>
        <input
            type="text"
            inputMode="numeric"
            placeholder="To (e.g. 800,000)"
            value={maxPrice ? Number(maxPrice).toLocaleString('en-US') : ''}
            onChange={(e) => handleChange(e.target.value, onMaxChange)}
            onBlur={() => setMaxTouched(true)}
            className="w-full pl-8 pr-3.5 py-2.5 rounded-xl text-sm focus:outline-none transition-colors border"
            style={{
            backgroundColor: 'var(--bg-main)',
            borderColor: showMaxError ? '#f87171' : 'var(--border-subtle)',
            color: 'var(--text-primary)',
            }}
        />
        </div>
        {showMaxError && (
        <p className="text-[11px] text-red-400 mt-1">Minimum amount is ₦{MINIMUM_AMOUNT.toLocaleString('en-US')}</p>
        )}
    </div>
    </div>
</div>
);
}