'use client';

import React, { useEffect, useState, useCallback } from 'react';
import StarRating from '@/components/testimonials/StarRating';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { Check, Trash2 } from 'lucide-react';

export default function AdminTestimonialsPage() {
const [testimonials, setTestimonials] = useState([]);
const [loading, setLoading] = useState(true);
const [testimonialPendingDeletion, setTestimonialPendingDeletion] = useState(null);
const [isDeleting, setIsDeleting] = useState(false);

const fetchTestimonials = useCallback(async (signal) => {
try {
    setLoading(true);
    const res = await fetch('/api/admin/testimonials', signal ? { signal } : undefined);
    if (!res.ok) {
    throw new Error(`Could not load testimonials (${res.status})`);
    }
    const data = await res.json();
    
    if (!signal?.aborted) {
    // Extract array from { success: true, testimonials: [...] }
    const list = Array.isArray(data.testimonials)
        ? data.testimonials
        : Array.isArray(data)
        ? data
        : [];
    setTestimonials(list);
    }
} catch (err) {
    if (err.name !== 'AbortError') {
    console.error('Fetch error:', err);
    }
} finally {
    if (!signal?.aborted) {
    setLoading(false);
    }
}
}, []);

useEffect(() => {
const abortController = new AbortController();
const timeoutId = setTimeout(() => {
    void fetchTestimonials(abortController.signal);
}, 0);

return () => {
    clearTimeout(timeoutId);
    abortController.abort();
};
}, [fetchTestimonials]);

// 2. Approve testimonial handler (updates isApproved: true)
const handleApprove = async (id) => {
try {
    const res = await fetch(`/api/admin/testimonials/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isApproved: true }),
    });
    if (res.ok) {
    fetchTestimonials();
    }
} catch (err) {
    console.error(err);
}
};

// 3. Delete testimonial handler
const handleDelete = async () => {
const id = testimonialPendingDeletion?._id;
if (!id) return;

try {
    setIsDeleting(true);
    const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete review');
    setTestimonialPendingDeletion(null);
    fetchTestimonials();
} catch (err) {
    console.error(err);
    alert(err.message || 'Failed to delete review');
} finally {
    setIsDeleting(false);
}
};

return (
<div className="space-y-6">
    <div>
    <h1 className="text-2xl font-serif font-bold" style={{ color: 'var(--text-primary)' }}>
        Review Moderation
    </h1>
    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Approve client reviews before they appear publicly on your site.
    </p>
    </div>

    {loading ? (
    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Loading testimonials...
    </div>
    ) : testimonials.length === 0 ? (
    <div
        className="p-8 text-center rounded-xl border text-sm"
        style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-secondary)',
        }}
    >
        No client reviews submitted yet.
    </div>
    ) : (
    <div className="space-y-4">
        {testimonials.map((item) => {
        // Support both isApproved and approved flags safely
        const isApproved = item.isApproved ?? item.approved ?? false;
        const clientRole = item.clientRole || item.companyOrRole;

        return (
            <div
            key={item._id}
            className="p-5 border rounded-xl flex flex-col md:flex-row justify-between gap-4 transition-colors"
            style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
            }}
            >
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                <h4 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {item.clientName}
                </h4>
                {clientRole && (
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    ({clientRole})
                    </span>
                )}
                <span
                    className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold ${
                    isApproved
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/80'
                        : 'bg-amber-950/60 text-amber-400 border border-amber-800/80'
                    }`}
                >
                    {isApproved ? 'Approved' : 'Pending'}
                </span>
                </div>
                
                <StarRating rating={item.rating || 5} />
                
                <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>
                &quot;{item.comment}&quot;
                </p>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center">
                {!isApproved && (
                <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleApprove(item._id)}
                    className="gap-1.5"
                >
                    <Check className="w-3.5 h-3.5" /> Approve
                </Button>
                )}
                <Button
                size="sm"
                variant="danger"
                onClick={() => setTestimonialPendingDeletion(item)}
                >
                <Trash2 className="w-3.5 h-3.5" />
                </Button>
            </div>
            </div>
        );
        })}
    </div>
    )}

    <Modal
    isOpen={Boolean(testimonialPendingDeletion)}
    onClose={() => {
        if (!isDeleting) setTestimonialPendingDeletion(null);
    }}
    title="Delete Review?"
    >
    <div className="space-y-6">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        Are you sure you want to permanently delete the review from{' '}
        <strong style={{ color: 'var(--text-primary)' }}>{testimonialPendingDeletion?.clientName}</strong>?
        </p>
        <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={() => setTestimonialPendingDeletion(null)} disabled={isDeleting}>
            Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete} isLoading={isDeleting}>
            Delete Review
        </Button>
        </div>
    </div>
    </Modal>
</div>
);
}
