import React from 'react';

export default function Button({
children,
variant = 'primary',
size = 'md',
isLoading = false,
className = '',
disabled,
...props
}) {
const baseStyles =
'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed';

// Variant inline styling maps
const variantStyles = {
primary: {
    backgroundColor: 'var(--accent-warm)',
    color: 'var(--bg-main)',
    fontWeight: '600',
},
secondary: {
    backgroundColor: 'var(--bg-surface-hover)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-subtle)',
},
outline: {
    backgroundColor: 'transparent',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-subtle)',
},
danger: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    color: '#f87171',
    border: '1px solid rgba(239, 68, 68, 0.3)',
},
};

const sizes = {
sm: 'px-3 py-1.5 text-xs',
md: 'px-4 py-2 text-sm',
lg: 'px-6 py-3 text-base',
};

return (
<button
    className={`${baseStyles} ${sizes[size]} ${className}`}
    style={variantStyles[variant]}
    disabled={disabled || isLoading}
    {...props}
>
    {isLoading ? (
    <span className="inline-block animate-spin mr-2 border-2 border-current border-t-transparent rounded-full w-4 h-4" />
    ) : null}
    {children}
</button>
);
}