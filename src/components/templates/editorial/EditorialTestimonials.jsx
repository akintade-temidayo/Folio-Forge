'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Star, Quote, MessageSquare } from 'lucide-react';
import Modal from '@/components/ui/Modal';

export default function EditorialTestimonials({ testimonials = [], handle = '', userHandle: rawUserHandle = '' }) {
const [selectedTestimonial, setSelectedTestimonial] = useState(null);

// Clean handle string safely for see-more route
const handleProp = handle || rawUserHandle;
let userHandle = String(handleProp || '').replace(/^\/+|\/+$/g, '');
if (!userHandle && typeof window !== 'undefined') {
userHandle = window.location.pathname.split('/')[1] || '';
}

// Links directly to app/(public)/[handle]/testimonials/page.jsx
const seeAllHref = userHandle ? `/${userHandle}/testimonials` : '/testimonials';

const approvedTestimonials = Array.isArray(testimonials)
? testimonials.filter((testimonial) => testimonial.isApproved !== false)
: [];

if (approvedTestimonials.length === 0) return null;

const featuredTestimonials = approvedTestimonials.slice(0, 2);

// Modal helper data extraction
const clientName = selectedTestimonial?.clientName || selectedTestimonial?.name || selectedTestimonial?.author || 'Client';
const clientRole = selectedTestimonial?.clientRole || selectedTestimonial?.role || selectedTestimonial?.title || '';
const clientCompany = selectedTestimonial?.company || '';
const rating = Number(selectedTestimonial?.rating) || 5;
const comment = selectedTestimonial?.comment || selectedTestimonial?.content || selectedTestimonial?.text || '';

const initials = clientName
.split(' ')
.map((n) => n[0])
.join('')
.toUpperCase()
.slice(0, 2);

return (
<section id="reviews" className="space-y-8">
    {/* Header */}
    <div className="flex items-center justify-between border-b border-(--border-subtle) pb-4">
    <div className="flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-(--accent-warm)" />
        <h2 className="text-xs font-bold uppercase tracking-widest text-(--text-secondary)">
        Client Endorsements
        </h2>
    </div>

    <Link
        href={seeAllHref}
        className="text-xs font-semibold hover:text-(--accent-warm) transition-colors flex items-center gap-1 text-(--text-secondary)"
    >
        <span>See all ({approvedTestimonials.length})</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
    </Link>
    </div>

    {/* Grid Layout */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {featuredTestimonials.map((item, index) => {
        const name = item.clientName || item.name || item.author || 'Client';
        const role = item.clientRole || item.role || item.title || '';
        const text = item.comment || item.content || item.text || '';
        const itemInitials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

        return (
        <div
            key={item._id || item.id || index}
            onClick={() => setSelectedTestimonial(item)}
            className="group cursor-pointer rounded-3xl p-6 sm:p-8 border flex flex-col justify-between space-y-6 transition-all duration-300 hover:border-(--accent-warm)/50"
            style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
            }}
        >
            <div className="space-y-4">
            <Quote className="w-6 h-6 text-(--accent-warm) opacity-60" />
            <p
                className="text-sm font-serif italic leading-relaxed line-clamp-4"
                style={{ color: 'var(--text-primary)' }}
            >
                &ldquo;{text}&rdquo;
            </p>
            </div>

            {/* Author Meta */}
            <div className="flex items-center justify-between pt-4 border-t border-(--border-subtle)">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-(--bg-main) border border-(--border-subtle) flex items-center justify-center font-serif font-bold text-xs text-(--accent-warm) shrink-0">
                {itemInitials}
                </div>

                <div>
                <h3
                    className="text-xs font-bold group-hover:text-(--accent-warm) transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                >
                    {name}
                </h3>
                {(role || item.company) && (
                    <p className="text-[11px] text-(--text-secondary)">
                    {role} {item.company ? `@ ${item.company}` : ''}
                    </p>
                )}
                </div>
            </div>

            {/* Rating */}
            {item.rating && (
                <div className="flex items-center gap-0.5">
                <Star className="w-3.5 h-3.5 fill-(--accent-warm) text-(--accent-warm)" />
                <span className="text-xs font-semibold text-(--text-primary)">
                    {item.rating}
                </span>
                </div>
            )}
            </div>
        </div>
        );
    })}
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
                {(clientRole || clientCompany) && (
                <p className="text-xs text-(--text-secondary)">
                    {clientRole} {clientCompany ? `@ ${clientCompany}` : ''}
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
            <p className="text-sm font-serif italic leading-relaxed text-(--text-secondary) relative z-10 whitespace-pre-line">
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