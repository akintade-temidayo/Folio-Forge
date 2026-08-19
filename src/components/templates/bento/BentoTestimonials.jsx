//Bento template testimonial
'use client';

import React from 'react';
import Link from 'next/link';
import { MessageSquareQuote, Star, ArrowRight, User } from 'lucide-react';

export default function BentoTestimonials({ testimonials = [], userHandle = '' }) {
// 1. Dynamic path handle resolution
let handle = userHandle;
if (!handle && typeof window !== 'undefined') {
handle = window.location.pathname.split('/')[1] || '';
}

const seeAllHref = handle ? `/${handle}/testimonials` : '/testimonials';

// 2. Filter approved testimonials matching the Reviews Page logic
const approvedTestimonials = Array.isArray(testimonials)
? testimonials.filter((testimonial) => testimonial.isApproved !== false)
: [];

if (approvedTestimonials.length === 0) return null;

// --- POPULATED STATE (UP TO 4 ITEMS) ---
const displayedTestimonials = approvedTestimonials.slice(0, 4);

return (
<section id="testimonials" className="space-y-4">
    {/* Section Header */}
    <div className="flex items-center justify-between pb-1">
    <h2 
        className="text-xs font-bold uppercase tracking-widest flex items-center gap-2"
        style={{ color: 'var(--text-secondary)' }}
    >
        <MessageSquareQuote className="w-4 h-4" style={{ color: 'var(--accent-warm)' }} />
        <span>Reviews & Testimonials</span>
    </h2>
    </div>

    {/* Bento Grid (2 Columns on MD) */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {displayedTestimonials.map((item, idx) => {
        const name = item.clientName || 'Anonymous';
        const role = item.clientRole || '';
        const comment = item.comment || '';
        const rating = Number(item.rating) || 5;

        return (
        <div
            key={item._id || item.id || idx}
            className="group rounded-2xl p-5 border flex flex-col justify-between space-y-4 transition-all duration-300 hover:border-(--accent-warm)/50"
            style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
            }}
        >
            {/* Top: Stars & Quote */}
            <div className="space-y-3">
            {/* Rating Badges */}
            <div className="flex items-center gap-1">
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

            {/* Quote Text */}
            {comment && (
                <p
                className="text-xs line-clamp-3 leading-relaxed italic"
                style={{ color: 'var(--text-secondary)' }}
                >
                &ldquo;{comment}&rdquo;
                </p>
            )}
            </div>

            {/* Bottom: Author Avatar & Title */}
            <div 
            className="flex items-center gap-3 pt-3 border-t"
            style={{ borderColor: 'var(--border-subtle)' }}
            >
            <div 
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border"
                style={{
                    backgroundColor: 'var(--bg-main)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-secondary)'
                }}
                >
                <User className="w-4 h-4 opacity-70" />
            </div>

            <div className="min-w-0">
                <h4
                className="text-xs font-bold truncate transition-colors group-hover:text-(--accent-warm)"
                style={{ color: 'var(--text-primary)' }}
                >
                {name}
                </h4>
                {role && (
                <p
                    className="text-[10px] truncate"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    {role}
                </p>
                )}
            </div>
            </div>
        </div>
        );
    })}
    </div>

    {/* Footer Link */}
    <div className="pt-2 flex justify-end">
    <Link
        href={seeAllHref}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all hover:underline"
        style={{ color: 'var(--accent-warm)' }}
    >
        <span>View All Reviews ({approvedTestimonials.length})</span>
        <ArrowRight className="w-3.5 h-3.5" />
    </Link>
    </div>
</section>
);
}
