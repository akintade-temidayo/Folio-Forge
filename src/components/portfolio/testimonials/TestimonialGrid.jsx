'use client';

import React from 'react';
import TestimonialCard from './TestimonialCard';

export default function TestimonialGrid({ testimonials = [] }) {
if (!testimonials || testimonials.length === 0) {
return (
    <div className="w-full text-center py-16 border border-dashed border-(--border-subtle) rounded-2xl bg-(--bg-surface)/30">
    <p className="text-sm text-(--text-secondary)">
        No client reviews published yet. Be the first to leave one!
    </p>
    </div>
);
}

return (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
    {testimonials.map((item, index) => {
    const id = item._id || item.id || index;
    return <TestimonialCard key={id} testimonial={item} />;
    })}
</div>
);
}