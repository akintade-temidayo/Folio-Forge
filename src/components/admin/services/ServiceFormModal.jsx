'use client';

import { useState, useMemo } from 'react';
import { X, Loader2 } from 'lucide-react';
import Select from '@/components/ui/Select';
import IconPicker from './IconPicker';
import PriceRangeInput from './PriceRangeInput';

export default function ServiceFormModal({ categories, onClose, onCreate }) {
const [title, setTitle] = useState('');
const [categoryId, setCategoryId] = useState(categories[0]?._id || '');
const [minPrice, setMinPrice] = useState('');
const [maxPrice, setMaxPrice] = useState('');
const [description, setDescription] = useState('');
const [selectedIcon, setSelectedIcon] = useState('Video');
const [submitting, setSubmitting] = useState(false);
const [errorMsg, setErrorMsg] = useState('');

const categoryOptions = useMemo(
() => categories.map((cat) => ({ value: cat._id, label: cat.name })),
[categories]
);

const handleSubmit = async (e) => {
e.preventDefault();
setErrorMsg('');

if (!title.trim() || !description.trim() || !categoryId) {
    setErrorMsg('Please fill in all required fields.');
    return;
}
if (Number(minPrice) > Number(maxPrice) && Number(maxPrice) > 0) {
    setErrorMsg('Minimum price cannot be greater than Maximum price.');
    return;
}

try {
    setSubmitting(true);
    await onCreate({
    title,
    categoryId,
    minPrice: Number(minPrice) || 0,
    maxPrice: Number(maxPrice) || 0,
    description,
    icon: selectedIcon,
    });
} catch (err) {
    setErrorMsg(err.message);
} finally {
    setSubmitting(false);
}
};

return (
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
    <div
    className="w-full max-w-lg rounded-2xl border p-6 shadow-2xl space-y-5"
    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
    >
    <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--border-subtle)' }}>
        <h2 className="text-lg font-bold font-serif" style={{ color: 'var(--text-primary)' }}>Add New Service</h2>
        <button onClick={onClose} className="p-1 rounded-lg" style={{ color: 'var(--text-secondary)' }}>
        <X className="w-5 h-5" />
        </button>
    </div>

    {errorMsg && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
        {errorMsg}
        </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
            Category <span className="text-red-400">*</span>
        </label>
        <Select
            options={categoryOptions}
            value={categoryId}
            onChange={setCategoryId}
            placeholder="Select a category"
        />
        </div>

        <div>
        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
            Service Title <span className="text-red-400">*</span>
        </label>
        <input
            type="text"
            placeholder="e.g. Full Music Video Production"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl text-sm focus:outline-none transition-colors border"
            style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
        />
        </div>

        <PriceRangeInput
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinChange={setMinPrice}
        onMaxChange={setMaxPrice}
        />

        <div>
        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
            Select Display Icon
        </label>
        <IconPicker selectedIcon={selectedIcon} onSelect={setSelectedIcon} />
        </div>

        <div>
        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
            Description <span className="text-red-400">*</span>
        </label>
        <textarea
            rows={3}
            placeholder="Detail what is included in this service..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl text-sm focus:outline-none transition-colors border resize-none"
            style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
        />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
            style={{ color: 'var(--text-secondary)' }}
        >
            Cancel
        </button>
        <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-colors disabled:opacity-50"
            style={{ backgroundColor: 'var(--accent-warm)', color: 'var(--bg-main)' }}
        >
            {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>Save Service</span>
        </button>
        </div>
    </form>
    </div>
</div>
);
}