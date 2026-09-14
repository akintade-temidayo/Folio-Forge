'use client';

import React, { useState, useEffect } from 'react';
import { Plus, History, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import ExperienceModal from '@/components/admin/ExperienceModal';
import ExperienceCard from '@/components/admin/ExperienceCard';
import { toast } from 'sonner';

export default function AdminExperiencePage() {
const [experiences, setExperiences] = useState([]);
const [loading, setLoading] = useState(true);
const [deletingId, setDeletingId] = useState(null);
const [experiencePendingDeletion, setExperiencePendingDeletion] = useState(null);

// Modal State
const [isModalOpen, setIsModalOpen] = useState(false);
const [editingExperience, setEditingExperience] = useState(null);

// Load experiences safely inside useEffect
useEffect(() => {
let isMounted = true;

async function fetchData() {
    try {
    const res = await fetch('/api/admin/experiences');
    const data = await res.json();

    if (isMounted && data.success) {
        setExperiences(data.experiences || []);
    }
    } catch (error) {
    console.error('Failed to load experiences:', error);
    } finally {
    if (isMounted) {
        setLoading(false);
    }
    }
}

fetchData();

return () => {
    isMounted = false;
};
}, []);

// Modal handlers
const handleOpenAddModal = () => {
setEditingExperience(null);
setIsModalOpen(true);
};

const handleOpenEditModal = (experience) => {
setEditingExperience(experience);
setIsModalOpen(true);
};

const handleModalSuccess = (savedItem) => {
if (editingExperience) {
    setExperiences((prev) =>
    prev.map((item) => (item._id === savedItem._id ? savedItem : item))
    );
} else {
    setExperiences((prev) => [savedItem, ...prev]);
}
};

// Handle deletion
const handleDelete = async () => {
const id = experiencePendingDeletion?._id;
if (!id) return;

try {
    setDeletingId(id);
    const res = await fetch(`/api/admin/experiences/${id}`, {
    method: 'DELETE',
    });
    const data = await res.json();

    if (data.success) {
    setExperiences((prev) => prev.filter((item) => item._id !== id));
    setExperiencePendingDeletion(null);
    toast.error('Experience deleted successfully.');
    } else {
    toast.error(data.error || 'Failed to delete entry.');
    }
} catch (error) {
    console.error('Error deleting experience:', error);
    toast.error('An error occurred while deleting.');
} finally {
    setDeletingId(null);
}
};

return (
<div className="space-y-6">
    {/* Page Header */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--border-subtle) pb-5">
    <div>
        <h1 className="text-2xl font-bold tracking-tight text-(--text-primary)">
        Work Experience
        </h1>
        <p className="text-xs sm:text-sm text-(--text-secondary) mt-1">
        Manage your career history, past roles, and professional milestones.
        </p>
    </div>

    {/* Add Experience Button */}
    <Button
        onClick={handleOpenAddModal}
        className="bg-(--accent-warm) text-[#1c1917] hover:opacity-90 font-semibold"
    >
        <Plus className="w-4 h-4 stroke-[2.5]" />
        <span>Add Experience</span>
    </Button>
    </div>

    {/* Content Area */}
    {loading ? (
    <div className="flex flex-col items-center justify-center py-16 text-(--text-secondary) space-y-3">
        <Loader2 className="w-6 h-6 animate-spin text-(--accent-warm)" />
        <p className="text-xs font-medium">Loading experience timeline...</p>
    </div>
    ) : experiences.length === 0 ? (
    /* Empty State */
    <div className="rounded-2xl border border-dashed border-(--border-subtle) bg-(--bg-surface)/40 p-10 text-center flex flex-col items-center justify-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-(--accent-warm)/10 flex items-center justify-center text-(--accent-warm)">
        <History className="w-6 h-6" />
        </div>
        <div className="space-y-1">
        <h3 className="text-base font-bold text-(--text-primary)">
            No experience added yet
        </h3>
        <p className="text-xs text-(--text-secondary) max-w-sm mx-auto">
            Showcase your career highlights, previous roles, and agencies you&apos;ve worked with.
        </p>
        </div>
        <Button
        variant="outline"
        onClick={handleOpenAddModal}
        className="mt-2 text-(--accent-warm) hover:border-(--accent-warm)"
        >
        <Plus className="w-3.5 h-3.5" />
        <span>Add First Role</span>
        </Button>
    </div>
    ) : (
    /* Experience List Grid */
    <div className="grid gap-4">
        {experiences.map((exp) => (
        <ExperienceCard
            key={exp._id}
            experience={exp}
            onEdit={handleOpenEditModal}
            onDelete={() => setExperiencePendingDeletion(exp)}
            isDeleting={deletingId === exp._id}
        />
        ))}
    </div>
    )}

    {/* Add / Edit Experience Modal */}
    <ExperienceModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    onSuccess={handleModalSuccess}
    initialData={editingExperience}
    />

    <Modal
    isOpen={Boolean(experiencePendingDeletion)}
    onClose={() => {
        if (!deletingId) setExperiencePendingDeletion(null);
    }}
    title="Delete Experience?"
    >
    <div className="space-y-6">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        Are you sure you want to delete your <strong style={{ color: 'var(--text-primary)' }}>{experiencePendingDeletion?.role}</strong>
        {' '}experience at <strong style={{ color: 'var(--text-primary)' }}>{experiencePendingDeletion?.company}</strong>?
        This cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={() => setExperiencePendingDeletion(null)} disabled={Boolean(deletingId)}>
            Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete} isLoading={Boolean(deletingId)}>
            Delete Experience
        </Button>
        </div>
    </div>
    </Modal>
</div>
);
}
