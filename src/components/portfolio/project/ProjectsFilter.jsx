'use client';

import React from 'react';

export default function ProjectsFilter({
categories = [],
activeCategory,
onSelectCategory,
}) {
if (!categories || categories.length === 0) return null;

return (
<div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
    <button
    type="button"
    onClick={() => onSelectCategory('all')}
    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
        activeCategory === 'all'
        ? 'bg-(--accent-warm) text-(--bg-main) shadow-sm'
        : 'bg-(--bg-surface) text-(--text-secondary) hover:text-(--text-primary) border border-(--border-subtle)'
    }`}
    >
    All Works
    </button>

    {categories.map((cat) => {
    const catId = cat._id || cat.id || cat.name;
    const isActive = activeCategory === catId;

    return (
        <button
        key={catId}
        type="button"
        onClick={() => onSelectCategory(catId)}
        className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            isActive
            ? 'bg-(--accent-warm) text-(--bg-main) shadow-sm'
            : 'bg-(--bg-surface) text-(--text-secondary) hover:text-(--text-primary) border border-(--border-subtle)'
        }`}
        >
        {cat.name}
        </button>
    );
    })}
</div>
);
}