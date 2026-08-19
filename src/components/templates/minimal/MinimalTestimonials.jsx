'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Star, Quote } from 'lucide-react';
import Modal from '@/components/ui/Modal';

export default function MinimalTestimonials({ testimonials = [], userHandle = '' }) {
const [selectedTestimonial, setSelectedTestimonial] = useState(null);

// Fallback handle resolution
let handle = userHandle;
if (!handle && typeof window !== 'undefined') {
handle = window.location.pathname.split('/')[1] || '';
}

const testimonialsHref = handle ? `/${handle}/testimonials` : '/testimonials';
const approvedTestimonials = Array.isArray(testimonials)
? testimonials.filter((testimonial) => testimonial.isApproved !== false)
: [];
const hasTestimonials = approvedTestimonials.length > 0;
const displayedTestimonials = approvedTestimonials.slice(0, 3);

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
<section id="testimonials" className="space-y-6 scroll-mt-24">
    {/* Section Header */}
    <div className="pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
    <h2 
        className="text-xs uppercase tracking-widest font-semibold"
        style={{ color: 'var(--text-secondary)' }}
    >
        Client Reviews
    </h2>
    </div>

    <div 
        className="divide-y border-t border-b"
        style={{ borderColor: 'var(--border-subtle)' }}
    >
        {displayedTestimonials.map((item) => {
        const role = item.clientRole || '';
        const itemRating = Number(item.rating) || 5;
        const commentText = item.comment || '';

        return (
            <div 
            key={item._id || item.id}
            onClick={() => setSelectedTestimonial(item)}
            className="py-5 space-y-2 cursor-pointer transition-colors group hover:opacity-80"
            >
            {/* Star Rating */}
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`w-3 h-3 ${
                    i < itemRating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-(--border-subtle)'
                    }`}
                />
                ))}
            </div>

            {/* Comment Preview */}
            <p 
                className="text-xs sm:text-sm italic leading-relaxed line-clamp-2 max-w-2xl font-serif"
                style={{ color: 'var(--text-primary)' }}
            >
                &quot;{commentText}&quot;
            </p>

            {/* Client Meta */}
            <div className="flex items-center gap-2 pt-0.5 text-xs">
                <span 
                className="font-medium"
                style={{ color: 'var(--text-primary)' }}
                >
                {item.clientName || 'Client'}
                </span>
                {role && (
                <>
                    <span style={{ color: 'var(--text-secondary)' }}>•</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{role}</span>
                </>
                )}
            </div>
            </div>
        );
        })}
    </div>

    {/* Always Visible "See All Reviews" Link */}
    <div className="pt-1 flex justify-end">
    <Link
        href={testimonialsHref}
        className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider transition-colors group cursor-pointer hover:opacity-80"
        style={{ color: 'var(--text-primary)' }}
    >
        <span>See All Reviews ({approvedTestimonials.length})</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
    </Link>
    </div>

    {/* Pop-out Testimonial Details Modal */}
    <Modal
    isOpen={!!selectedTestimonial}
    onClose={() => setSelectedTestimonial(null)}
    title="Client Review"
    >
    {selectedTestimonial && (
        <div className="space-y-6 pt-2" style={{ color: 'var(--text-primary)' }}>
        {/* Header: Client Info & Stars */}
        <div 
            className="flex items-center justify-between gap-4 pb-4 border-b"
            style={{ borderColor: 'var(--border-subtle)' }}
        >
            <div className="flex items-center gap-3">
            <div 
                className="relative w-10 h-10 rounded-full overflow-hidden border flex items-center justify-center shrink-0"
                style={{ 
                borderColor: 'var(--border-subtle)',
                backgroundColor: 'var(--bg-surface)' 
                }}
            >
                <span 
                    className="text-xs font-mono font-bold"
                    style={{ color: 'var(--text-primary)' }}
                >
                {initials}
                </span>
            </div>

            <div>
                <h3 
                className="text-sm font-semibold"
                style={{ color: 'var(--text-primary)' }}
                >
                {clientName}
                </h3>
                {clientRole && (
                <p 
                    className="text-xs"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    {clientRole}
                </p>
                )}
            </div>
            </div>

            {/* Star Rating in Modal */}
            <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
                <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                    i < rating
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-(--border-subtle)'
                }`}
                />
            ))}
            </div>
        </div>

        {/* Testimonial Quote Body */}
        <div 
            className="relative space-y-2 p-4 rounded-lg border font-serif"
            style={{ 
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)' 
            }}
        >
            <Quote 
            className="w-6 h-6 absolute top-3 right-3 pointer-events-none opacity-10"
            style={{ color: 'var(--text-primary)' }} 
            />
            <p 
            className="text-sm italic leading-relaxed relative z-10 whitespace-pre-line"
            style={{ color: 'var(--text-primary)' }}
            >
            &ldquo;{comment}&rdquo;
            </p>
        </div>

        {/* Modal Actions */}
        <div className="pt-1 flex items-center justify-end">
            <button
            onClick={() => setSelectedTestimonial(null)}
            className="px-4 py-2 text-xs font-mono uppercase tracking-wider rounded border transition-opacity hover:opacity-80"
            style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)',
            }}
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
