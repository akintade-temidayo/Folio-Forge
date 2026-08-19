'use client';

import React from 'react';
import Image from 'next/image';
import { Star, ArrowUpRight } from 'lucide-react';

export default function TestimonialCard({ testimonial, onClick }) {
if (!testimonial) return null;

const clientName = testimonial.clientName || testimonial.name || 'Client';
const clientRole = testimonial.clientRole || testimonial.role || testimonial.company || '';
const avatar = testimonial.avatar || testimonial.image || testimonial.clientImage || '';
const rating = Number(testimonial.rating) || 5;
const quote = testimonial.quote || testimonial.content || testimonial.message || '';

// Get initials for fallback avatar
const initials = clientName
.split(' ')
.map((n) => n[0])
.join('')
.toUpperCase()
.slice(0, 2);

return (
<div
    onClick={onClick}
    className="group cursor-pointer rounded-xl bg-(--bg-surface) border border-(--border-subtle) p-5 flex flex-col justify-between space-y-4 hover:border-(--accent-warm) transition-all duration-300 shadow-xs"
>
    <div className="space-y-3">
    {/* Top Header: Avatar, Info & Stars */}
    <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
        {/* Avatar image or initial badge */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-(--accent-warm)/10 border border-(--border-subtle) flex items-center justify-center shrink-0">
            {avatar ? (
            <Image
                src={avatar}
                alt={clientName}
                fill
                sizes="40px"
                className="object-cover"
            />
            ) : (
            <span className="text-xs font-bold text-(--accent-warm)">
                {initials}
            </span>
            )}
        </div>

        <div className="min-w-0">
            <h3 className="text-xs md:text-sm font-bold text-(--text-primary) truncate group-hover:text-(--accent-warm) transition-colors">
            {clientName}
            </h3>
            {clientRole && (
            <p className="text-[11px] text-(--text-secondary) truncate">
                {clientRole}
            </p>
            )}
        </div>
        </div>

        {/* Star Rating */}
        <div className="flex items-center gap-0.5 shrink-0">
        {Array.from({ length: 5 }).map((_, i) => (
            <Star
            key={i}
            className={`w-3.5 h-3.5 ${
                i < rating
                ? 'fill-(--accent-warm) text-(--accent-warm)'
                : 'text-(--border-subtle)'
            }`}
            />
        ))}
        </div>
    </div>

    {/* Quote Content Preview */}
    {quote && (
        <p className="text-xs text-(--text-secondary) leading-relaxed line-clamp-3 italic">
        &ldquo;{quote}&rdquo;
        </p>
    )}
    </div>

    {/* Footer Callout */}
    <div className="flex items-center justify-end pt-2 border-t border-(--border-subtle) text-xs">
    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-(--accent-warm) group-hover:underline">
        <span>Read Full Review</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
    </span>
    </div>
</div>
);
}