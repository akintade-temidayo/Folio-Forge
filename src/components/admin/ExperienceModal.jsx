'use client';

import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import DateSelect from '@/components/ui/DateSelect';
import { toast } from 'sonner';

export default function ExperienceModal({ isOpen, onClose, onSuccess, initialData = null }) {
// Store prev initialData ID to detect switching between items/modal states seamlessly
const [prevId, setPrevId] = useState(initialData?._id || null);
const [submitting, setSubmitting] = useState(false);
const [error, setError] = useState('');

// Helper to construct form data from initialData
const getInitialForm = (data) => {
let start = '';
let end = 'Present';

if (data?.period) {
    const parts = data.period.split('-').map((s) => s.trim());
    start = parts[0] || '';
    end = parts[1] || 'Present';
}

return {
    role: data?.role || '',
    company: data?.company || '',
    location: data?.location || '',
    startDate: start,
    endDate: end,
    description: data?.description || '',
};
};

const [formData, setFormData] = useState(() => getInitialForm(initialData));

// Sync state cleanly when initialData changes (e.g. clicking different items to edit)
const currentId = initialData?._id || null;
if (currentId !== prevId) {
setPrevId(currentId);
setFormData(getInitialForm(initialData));
setError('');
}

const isEditing = Boolean(initialData?._id);

const handleChange = (e) => {
const { name, value } = e.target;
setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = async (e) => {
e.preventDefault();
setError('');

if (!formData.role.trim() || !formData.company.trim() || !formData.startDate) {
    setError('Role, Company, and Start Date are required.');
    return;
}

const period = `${formData.startDate} - ${formData.endDate || 'Present'}`;

const payload = {
    role: formData.role,
    company: formData.company,
    location: formData.location,
    period,
    description: formData.description,
};

try {
    setSubmitting(true);
    const url = isEditing
    ? `/api/admin/experiences/${initialData._id}`
    : '/api/admin/experiences';
    const method = isEditing ? 'PUT' : 'POST';

    const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success || res.ok) {
    if (isEditing) {
    toast.warning('Experience updated successfully.');
    } else {
    toast.success('Experience created successfully.');
    }
    onSuccess(data.experience || data);
    onClose();
    } else {
    setError(data.message || data.error || 'Something went wrong.');
    }
} catch (err) {
    console.error('Submit experience error:', err);
    setError('Failed to save experience. Please try again.');
} finally {
    setSubmitting(false);
}
};

return (
<Modal
    isOpen={isOpen}
    onClose={onClose}
    title={isEditing ? 'Edit Work Experience' : 'Add Work Experience'}
>
    <form onSubmit={handleSubmit} className="space-y-4">
    {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
        {error}
        </div>
    )}

    {/* Role Input */}
    <Input
        label="Job Title / Role *"
        name="role"
        required
        placeholder="e.g. Lead Video Editor or Senior Frontend Engineer"
        value={formData.role}
        onChange={handleChange}
    />

    {/* Company & Location Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
        label="Company / Client *"
        name="company"
        required
        placeholder="e.g. Acme Corp or YouTube Studio"
        value={formData.company}
        onChange={handleChange}
        />

        <Input
        label="Location (Optional)"
        name="location"
        placeholder="e.g. Remote, London, or New York"
        value={formData.location}
        onChange={handleChange}
        />
    </div>

    {/* Duration: Date Started -> Date Finished */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <DateSelect
        label="Date Started *"
        value={formData.startDate}
        onChange={(val) => setFormData((prev) => ({ ...prev, startDate: val }))}
        />

        <DateSelect
        label="Date Finished *"
        value={formData.endDate}
        allowPresent={true}
        onChange={(val) => setFormData((prev) => ({ ...prev, endDate: val }))}
        />
    </div>

    {/* Description Textarea */}
    <Input
        isTextarea
        rows={4}
        label="Description / Key Achievements"
        name="description"
        placeholder="Outline key responsibilities, tools used, or notable achievements..."
        value={formData.description}
        onChange={handleChange}
    />

    {/* Actions using UI Button */}
    <div className="flex items-center justify-end gap-3 pt-3 border-t border-(--border-subtle)">
        <Button
        type="button"
        variant="outline"
        onClick={onClose}
        disabled={submitting}
        >
        Cancel
        </Button>

        <Button
        type="submit"
        disabled={submitting}
        className="bg-(--accent-warm) text-[#1c1917] hover:opacity-90"
        >
        {submitting ? (
            <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving...
            </span>
        ) : (
            <span>{isEditing ? 'Update Experience' : 'Save Experience'}</span>
        )}
        </Button>
    </div>
    </form>
</Modal>
);
}