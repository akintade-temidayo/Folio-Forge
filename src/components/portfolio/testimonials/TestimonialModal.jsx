'use client';

import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';

export default function TestimonialModal({ isOpen, onClose, handle, onSuccess }) {
const [formData, setFormData] = useState({
clientName: '',
clientRole: '',
comment: '',
rating: 0,
});
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

if (!isOpen) return null;

const handleSubmit = async (e) => {
e.preventDefault();
if (!formData.clientName || !formData.comment) {
    setError('Please fill in your name and comment.');
    return;
}

try {
    setLoading(true);
    setError('');

    const res = await fetch(`/api/public/${handle}/testimonials`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
    toast.success('Review submitted successfully and is awaiting approval.');
    setFormData({ clientName: '', clientRole: '', comment: '', rating: 5 });
    onSuccess?.();
    onClose();
    } else {
    setError(data.message || 'Failed to submit review.');
    }
} catch (err) {
    console.error(err);
    setError('An unexpected error occurred.');
} finally {
    setLoading(false);
}
};

return (
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
    <div className="w-full max-w-lg rounded-2xl bg-(--bg-surface) border border-(--border-subtle) p-6 sm:p-8 space-y-6 shadow-2xl relative">
    {/* Modal Header */}
    <div className="flex items-center justify-between border-b border-(--border-subtle) pb-4">
        <div>
        <h3 className="text-xl font-bold text-(--text-primary)">Leave a Review</h3>
        <p className="text-xs text-(--text-secondary) mt-0.5">
            Share your feedback or experience working with {handle}.
        </p>
        </div>
        <button
        onClick={onClose}
        className="p-1 rounded-lg text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-main) transition-colors"
        >
        <X className="w-5 h-5" />
        </button>
    </div>

    {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">
        {error}
        </div>
    )}

    {/* Form Inputs */}
    <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
        <label className="text-xs font-semibold text-(--text-primary)">
            Your Name *
        </label>
        <input
            type="text"
            required
            placeholder="e.g. Jane Doe"
            value={formData.clientName}
            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-lg bg-(--bg-main) border border-(--border-subtle) text-(--text-primary) focus:outline-none focus:border-(--accent-warm)"
        />
        </div>

        <div className="space-y-1">
        <label className="text-xs font-semibold text-(--text-primary)">
            Your Role / Company (Optional)
        </label>
        <input
            type="text"
            placeholder="e.g. Founder at TechCorp"
            value={formData.clientRole}
            onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-lg bg-(--bg-main) border border-(--border-subtle) text-(--text-primary) focus:outline-none focus:border-(--accent-warm)"
        />
        </div>

        {/* Star Rating Picker */}
        <div className="space-y-1">
        <label className="text-xs font-semibold text-(--text-primary)">Rating</label>
        <div className="flex items-center gap-1.5 pt-1">
            {[1, 2, 3, 4, 5].map((star) => (
            <button
                type="button"
                key={star}
                onClick={() => setFormData({ ...formData, rating: star })}
                className="p-1 hover:scale-110 transition-transform focus:outline-none"
            >
                <Star
                className={`w-6 h-6 ${
                    star <= formData.rating
                    ? 'text-(--accent-warm) fill-(--accent-warm)'
                    : 'text-(--border-subtle)'
                }`}
                />
            </button>
            ))}
        </div>
        </div>

        <div className="space-y-1">
        <label className="text-xs font-semibold text-(--text-primary)">
            Review / Feedback *
        </label>
        <textarea
            required
            rows={4}
            placeholder="Write your testimonial here..."
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-lg bg-(--bg-main) border border-(--border-subtle) text-(--text-primary) focus:outline-none focus:border-(--accent-warm) resize-none"
        />
        </div>

        <div className="pt-2 flex items-center justify-end gap-3">
        <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onClose}
            disabled={loading}
        >
            Cancel
        </Button>
        <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={loading}
        >
            Submit Review
        </Button>
        </div>
    </form>
    </div>
</div>
);
}