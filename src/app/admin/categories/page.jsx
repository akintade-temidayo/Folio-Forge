'use client';

import React, { useEffect, useState, useCallback } from 'react';
import CategoryForm from '@/components/admin/CategoryForm';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { Plus, Trash2, Tag, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminCategoriesPage() {
const [categories, setCategories] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [categoryPendingDeletion, setCategoryPendingDeletion] = useState(null);
const [isDeleting, setIsDeleting] = useState(false);

// Simple trigger to refetch data cleanly on create/delete
const [refreshKey, setRefreshKey] = useState(0);
const refreshCategories = () => setRefreshKey((prev) => prev + 1);

// Helper to safely parse response
const parseCategoriesResponse = (data) => {
if (Array.isArray(data)) return data;
if (data && Array.isArray(data.categories)) return data.categories;
if (data && Array.isArray(data.data)) return data.data;
return [];
};

useEffect(() => {
let active = true;

async function loadCategories() {
    try {
    setError(null);
    const res = await fetch('/api/categories');

    if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
    }

    const data = await res.json();
    console.log('Categories API Payload:', data);

    if (active) {
        setCategories(parseCategoriesResponse(data));
    }
    } catch (err) {
    console.error('Failed to fetch categories:', err);
    if (active) {
        setError(err.message || 'Failed to load categories');
        setCategories([]);
    }
    } finally {
    if (active) {
        setLoading(false);
    }
    }
}

loadCategories();

return () => {
    active = false;
};
}, [refreshKey]); // Dependencies stay 100% constant!

const handleDelete = async () => {
const id = categoryPendingDeletion?._id || categoryPendingDeletion?.id;
if (!id) return;

try {
    setIsDeleting(true);
    const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || data.error || 'Failed to delete category');
    }
    setCategoryPendingDeletion(null);
    refreshCategories();
    toast.error('Category deleted successfully.');
} catch (err) {
    console.error(err);
    toast.error(err.message || 'Error deleting category.');
} finally {
    setIsDeleting(false);
}
};

return (
<div className="space-y-6">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
        <h1 
        className="text-2xl font-serif font-bold transition-colors"
        style={{ color: 'var(--text-primary, #1a1918)' }}
        >
        Categories Manager
        </h1>
        <p 
        className="text-sm mt-1 transition-colors"
        style={{ color: 'var(--text-secondary, #666059)' }}
        >
        Create and manage project categories for video filters.
        </p>
    </div>

    <Button variant="primary" onClick={() => setIsModalOpen(true)} className="gap-2">
        <Plus className="w-4 h-4" />
        <span>Add Category</span>
    </Button>
    </div>

    {/* Error Banner */}
    {error && (
    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2">
        <AlertCircle className="w-4 h-4 shrink-0" />
        <span>{error}</span>
    </div>
    )}

    {/* Main Grid / State Handling */}
    {loading ? (
    <div className="text-sm font-medium" style={{ color: 'var(--text-secondary, #666059)' }}>
        Loading categories...
    </div>
    ) : categories.length === 0 ? (
    <div 
        className="p-12 text-center rounded-2xl border text-sm font-medium transition-colors"
        style={{
        backgroundColor: 'var(--bg-surface, #ffffff)',
        borderColor: 'var(--border-subtle, #e5e0d8)',
        color: 'var(--text-secondary, #666059)',
        }}
    >
        No categories found. Click &quot;Add Category&quot; to create one.
    </div>
    ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
        <div
            key={cat._id || cat.id}
            className="p-4 border rounded-xl flex items-center justify-between transition-colors shadow-sm"
            style={{
            backgroundColor: 'var(--bg-surface, #ffffff)',
            borderColor: 'var(--border-subtle, #e5e0d8)',
            }}
        >
            <div className="flex items-center gap-3">
            <Tag className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-warm, #c88346)' }} />
            <span className="font-semibold text-sm" style={{ color: 'var(--text-primary, #1a1918)' }}>
                {cat.name}
            </span>
            </div>
            <Button size="sm" variant="danger" onClick={() => setCategoryPendingDeletion(cat)}>
            <Trash2 className="w-3.5 h-3.5" />
            </Button>
        </div>
        ))}
    </div>
    )}

    {/* Modal Container */}
    <Modal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    title="Add New Category"
    >
    <CategoryForm
        onSuccess={() => {
        setIsModalOpen(false);
        refreshCategories();
        }}
    />
    </Modal>

    <Modal
    isOpen={Boolean(categoryPendingDeletion)}
    onClose={() => {
        if (!isDeleting) setCategoryPendingDeletion(null);
    }}
    title="Delete Category?"
    >
    <div className="space-y-6">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        Are you sure you want to delete <strong style={{ color: 'var(--text-primary)' }}>{categoryPendingDeletion?.name}</strong>?
        This cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
        <Button
            type="button"
            variant="secondary"
            onClick={() => setCategoryPendingDeletion(null)}
            disabled={isDeleting}
        >
            Cancel
        </Button>
        <Button
            type="button"
            variant="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
        >
            Delete Category
        </Button>
        </div>
    </div>
    </Modal>
</div>
);
}
