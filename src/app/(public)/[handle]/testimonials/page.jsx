//public side testimonials page
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import ReviewsHeader from '@/components/portfolio/testimonials/ReviewsHeader';
import TestimonialGrid from '@/components/portfolio/testimonials/TestimonialGrid';
import TestimonialModal from '@/components/portfolio/testimonials/TestimonialModal';

export default function ReviewsPage({ params }) {
const [handle, setHandle] = useState('');
const [testimonials, setTestimonials] = useState([]);
const [loading, setLoading] = useState(true);
const [isModalOpen, setIsModalOpen] = useState(false);
const [toastMessage, setToastMessage] = useState('');

// 1. Resolve Next.js async params
useEffect(() => {
async function unwrapParams() {
    const resolvedParams = await params;
    setHandle(resolvedParams.handle);
}
unwrapParams();
}, [params]);

// 2. Fetch public data
useEffect(() => {
if (!handle) return;

async function fetchPublicData() {
    try {
        setLoading(true);
        const res = await fetch(`/api/public/${handle}`);
        const result = await res.json();

        if (result.success && result.data) {
        // Filter approved testimonials
        const approvedOnly = (result.data.testimonials || []).filter(
            (t) => t.isApproved !== false
        );
        setTestimonials(approvedOnly);
        }
    } catch (err) {
        console.error('Failed to load testimonials:', err);
    } finally {
        setLoading(false);
    }
}

fetchPublicData();
}, [handle]);

const handleSuccessSubmission = () => {
setToastMessage('Thank you! Your review has been submitted');
setTimeout(() => setToastMessage(''), 5000);
};

return (
<div className="min-h-screen bg-(--bg-main) text-(--text-primary) pt-15 pb-16 px-4 md:px-8 max-w-6xl mx-auto space-y-10">
    {/* Toast Notification */}
    {toastMessage && (
    <div className="fixed top-24 right-4 z-50 p-4 rounded-xl bg-(--accent-warm) text-(--bg-main) font-semibold text-xs shadow-lg animate-in fade-in slide-in-from-top duration-400">
        {toastMessage}
    </div>
    )}

    {/* Header */}
    <ReviewsHeader
    handle={handle}
    totalCount={testimonials.length}
    onOpenModal={() => setIsModalOpen(true)}
    />

    {/* Grid Display */}
    {loading ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
        {[1, 2, 3].map((i) => (
        <div
            key={i}
            className="rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-6 space-y-4 animate-pulse"
        >
            <div className="h-4 bg-white/5 rounded w-1/4" />
            <div className="h-12 bg-white/5 rounded w-full" />
            <div className="h-4 bg-white/5 rounded w-1/3" />
        </div>
        ))}
    </div>
    ) : (
    <TestimonialGrid testimonials={testimonials} />
    )}

    {/* Leave Review Modal */}
    <TestimonialModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    handle={handle}
    onSuccess={handleSuccessSubmission}
    />
</div>
);
}