'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function TestimonialCard({ testimonial }) {
const { clientName, clientRole, comment, rating = 5 } = testimonial;

return (
<div className="rounded-2xl bg-(--bg-surface) border border-(--border-subtle) p-6 flex flex-col justify-between hover:border-(--accent-warm)/40 transition-all shadow-xs space-y-4">
    <div className="space-y-3">
    {/* Rating Stars */}
    <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
        <Star
            key={i}
            className={`w-4 h-4 ${
            i < rating
                ? 'text-(--accent-warm) fill-(--accent-warm)'
                : 'text-(--border-subtle)'
            }`}
        />
        ))}
    </div>

    {/* Comment Text */}
    <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed italic relative">
        <Quote className="w-6 h-6 text-(--accent-warm)/20 absolute -top-2 -left-2 z-0" />
        <span className="relative z-10">&ldquo;{comment}&rdquo;</span>
    </p>
    </div>

    {/* Client Meta */}
    <div className="pt-4 border-t border-(--border-subtle)/60 flex items-center justify-between">
    <div>
        <h4 className="text-sm font-bold text-(--text-primary)">{clientName}</h4>
        {clientRole && (
        <p className="text-xs text-(--text-secondary)">{clientRole}</p>
        )}
    </div>
    </div>
</div>
);
}