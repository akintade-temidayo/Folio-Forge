'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Star, Quote } from 'lucide-react';
import TestimonialCard from '@/components/portfolio/TestimonialCard';
import Modal from '@/components/ui/Modal';

export default function ModernTestimonials({ testimonials = [], handle = '' }) {
const [selectedTestimonial, setSelectedTestimonial] = useState(null);

// Clean handle string safely for see-more route
let userHandle = String(handle || '').replace(/^\/+|\/+$/g, '');
if (!userHandle && typeof window !== 'undefined') {
userHandle = window.location.pathname.split('/')[1] || '';
}

// Links directly to app/(public)/[handle]/testimonials/page.jsx
const seeAllHref = userHandle ? `/${userHandle}/testimonials` : '/testimonials';

const approvedTestimonials = Array.isArray(testimonials)
? testimonials.filter((testimonial) => testimonial.isApproved !== false)
: [];
const hasTestimonials = approvedTestimonials.length > 0;
const featuredTestimonials = approvedTestimonials.slice(0, 2);

if (!hasTestimonials) return null;

// Modal helper data extraction
const clientName = selectedTestimonial?.clientName || 'Client';
const clientRole = selectedTestimonial?.clientRole || '';
const rating = Number(selectedTestimonial?.rating) || 5;
const comment = selectedTestimonial?.comment || '';

const initials = clientName
.split(' ')
.map((n) => n[0])
.join('')
.toUpperCase()
.slice(0, 2);

return (
<section id="reviews" className="space-y-4 py-4 max-w-4xl mx-auto">
    {/* Header */}
    <div className="flex items-end justify-between border-b border-(--border-subtle) pb-3">
    <div>
        <h2 className="text-lg font-bold tracking-tight text-(--text-primary)">
        Client Reviews
        </h2>
        <p className="text-xs text-(--text-secondary) mt-0.5">
        Feedback and testimonials from past clients
        </p>
    </div>

    {/* ALWAYS SHOW SEE ALL LINK */}
    <Link
        href={seeAllHref}
        className="inline-flex items-center gap-1 text-xs font-bold text-(--accent-warm) hover:underline transition-all shrink-0"
    >
        <span>See all ({approvedTestimonials.length})</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
    </Link>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featuredTestimonials.map((testimonial) => (
        <TestimonialCard
            key={testimonial._id || testimonial.id}
            testimonial={testimonial}
            onClick={() => setSelectedTestimonial(testimonial)}
        />
        ))}
    </div>

    {/* Pop-out Testimonial Details Modal */}
    <Modal
    isOpen={!!selectedTestimonial}
    onClose={() => setSelectedTestimonial(null)}
    title="Client Review"
    >
    {selectedTestimonial && (
        <div className="space-y-6 text-(--text-primary)">
        {/* Client Profile Header */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-(--border-subtle)">
            <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-(--accent-warm)/10 border border-(--border-subtle) flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-(--accent-warm)">
                    {initials}
                </span>
            </div>

            <div>
                <h3 className="text-base font-bold text-(--text-primary)">
                {clientName}
                </h3>
                {clientRole && (
                <p className="text-xs text-(--text-secondary)">
                    {clientRole}
                </p>
                )}
            </div>
            </div>

            {/* Star Rating in Modal */}
            <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                key={i}
                className={`w-4 h-4 ${
                    i < rating
                    ? 'fill-(--accent-warm) text-(--accent-warm)'
                    : 'text-(--border-subtle)'
                }`}
                />
            ))}
            </div>
        </div>

        {/* Complete Testimonial Quote */}
        <div className="relative space-y-2 bg-(--bg-main) p-4 rounded-xl border border-(--border-subtle)">
            <Quote className="w-8 h-8 text-(--accent-warm)/20 absolute top-2 right-2 pointer-events-none" />
            <p className="text-sm leading-relaxed text-(--text-secondary) italic relative z-10 whitespace-pre-line">
            &ldquo;{comment}&rdquo;
            </p>
        </div>

        {/* Action Footer */}
        <div className="pt-2 flex items-center justify-end">
            <button
            onClick={() => setSelectedTestimonial(null)}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-(--accent-warm) text-white hover:opacity-90 transition-opacity"
            >
            Close
            </button>
        </div>
        </div>
    )}
    </Modal>
</section>
);
}
