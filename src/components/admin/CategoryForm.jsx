'use client';

import React, { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';

export default function CategoryForm({ initialData = null, onSuccess }) {
const [name, setName] = useState(initialData?.name || '');
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState('');

const handleSubmit = async (e) => {
e.preventDefault();
if (!name.trim()) return;

setIsLoading(true);
setError('');

try {
    const endpoint = initialData?._id ? `/api/categories/${initialData._id}` : '/api/categories';
    const method = initialData?._id ? 'PUT' : 'POST';

    const res = await fetch(endpoint, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name.trim() }),
    });

    if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to save category');
    }

    if (initialData) {
    toast.warning('Category updated successfully.');
    } else {
    toast.success('Category created successfully.');
    }
    setName('');
    if (onSuccess) onSuccess();
} catch (err) {
    setError(err.message);
} finally {
    setIsLoading(false);
}
};

return (
<form onSubmit={handleSubmit} className="space-y-4">
    {error && <div className="text-xs text-red-400">{error}</div>}

    <Input
    label="Category Name"
    placeholder="e.g. Music Videos, Commercials"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
    />

    <Button type="submit" variant="primary" isLoading={isLoading} className="w-full">
    {initialData ? 'Update Category' : 'Create Category'}
    </Button>
</form>
);
}