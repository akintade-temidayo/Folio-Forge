'use client';

import React from 'react';

export default function ProjectContent({ description }) {
if (!description) return null;

return (
<div className="rounded-2xl bg-(--bg-surface) border border-(--border-subtle) p-6 sm:p-8 space-y-4">
    <h2 className="text-lg font-bold text-(--text-primary)">
    About the Project
    </h2>
    <div className="text-sm text-(--text-secondary) leading-relaxed whitespace-pre-line">
    {description}
    </div>
</div>
);
}