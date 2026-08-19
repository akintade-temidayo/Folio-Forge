import React from 'react';

export default function Input({
label,
error,
isTextarea = false,
className = '',
rows = 4,
...props
}) {
return (
<div className="w-full flex flex-col gap-1.5">
    {label && (
    <label className="text-xs font-medium tracking-wide" style={{ color: 'var(--text-secondary)' }}>
        {label}
    </label>
    )}

    {isTextarea ? (
    <textarea
        rows={rows}
        className={`w-full rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors ${
        error ? 'border-red-500' : ''
        } ${className}`}
        style={{
        backgroundColor: 'var(--bg-main)',
        borderColor: error ? 'rgba(239, 68, 68, 0.8)' : 'var(--border-subtle)',
        color: 'var(--text-primary)',
        borderWidth: '1px',
        }}
        {...props}
    />
    ) : (
    <input
        className={`w-full rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors ${
        error ? 'border-red-500' : ''
        } ${className}`}
        style={{
        backgroundColor: 'var(--bg-main)',
        borderColor: error ? 'rgba(239, 68, 68, 0.8)' : 'var(--border-subtle)',
        color: 'var(--text-primary)',
        borderWidth: '1px',
        }}
        {...props}
    />
    )}

    {error && <span className="text-xs text-red-400 mt-0.5">{error}</span>}
</div>
);
}