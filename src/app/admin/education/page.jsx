'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button'; 
import EducationCard from '@/components/admin/Education/EducationCard';
import EducationModal from '@/components/admin/Education/EducationModal';
import DeleteEducationModal from '@/components/admin/Education/DeleteEducationModal';
import { Plus, GraduationCap, Loader2 } from 'lucide-react';

export default function EducationPage() {
const [educationList, setEducationList] = useState([]);
const [loading, setLoading] = useState(true);
const [submitting, setSubmitting] = useState(false);
const [deleting, setDeleting] = useState(false);

// Modal states
const [isFormModalOpen, setIsFormModalOpen] = useState(false);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

// Active selected item for Edit or Delete
const [selectedItem, setSelectedItem] = useState(null);

// 1. Fetch Education Data
const fetchEducation = async () => {
    try {
    setLoading(true);
    const res = await fetch('/api/admin/education');
    const data = await res.json();
    if (res.ok && data.success) {
        setEducationList(data.data || []);
    }
    } catch (error) {
    console.error('Failed to load education data:', error);
    } finally {
    setLoading(false);
    }
};

useEffect(() => {
    let isActive = true;

    const loadEducation = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/education');
            const data = await res.json();

            if (!isActive) return;

            if (res.ok && data.success) {
                setEducationList(data.data || []);
            }
        } catch (error) {
            console.error('Failed to load education data:', error);
        } finally {
            if (isActive) {
                setLoading(false);
            }
        }
    };

    void loadEducation();

    return () => {
        isActive = false;
    };
}, []);

// 2. Open Modal Handlers
const handleOpenAdd = () => {
    setSelectedItem(null);
    setIsFormModalOpen(true);
};

const handleOpenEdit = (item) => {
    setSelectedItem(item);
    setIsFormModalOpen(true);
};

const handleOpenDelete = (id) => {
    const itemToDelete = educationList.find((item) => item._id === id);
    setSelectedItem(itemToDelete);
    setIsDeleteModalOpen(true);
};

// 3. Create or Update API Handler
const handleSubmit = async (formData) => {
    try {
    setSubmitting(true);
    const isEditing = !!selectedItem;
    const url = isEditing
        ? `/api/admin/education/${selectedItem._id}`
        : '/api/admin/education';

    const res = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok && data.success) {
        setIsFormModalOpen(false);
        setSelectedItem(null);
        fetchEducation();
    } else {
        alert(data.message || 'Something went wrong');
    }
    } catch (error) {
    console.error('Error saving education:', error);
    } finally {
    setSubmitting(false);
    }
};

// 4. Delete API Handler
const handleConfirmDelete = async () => {
    if (!selectedItem) return;
    try {
    setDeleting(true);
    const res = await fetch(`/api/admin/education/${selectedItem._id}`, {
        method: 'DELETE',
    });

    const data = await res.json();

    if (res.ok && data.success) {
        setIsDeleteModalOpen(false);
        setSelectedItem(null);
        fetchEducation();
    } else {
        alert(data.message || 'Failed to delete record');
    }
    } catch (error) {
    console.error('Error deleting education:', error);
    } finally {
    setDeleting(false);
    }
};

return (
    <div className="space-y-6">
    {/* Header Section */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-(--border-subtle)">
        <div>
        <h1 className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Education
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Manage your academic background, degrees, and qualifications.
        </p>
        </div>

        <Button onClick={handleOpenAdd} className="gap-2 shrink-0">
        <Plus className="w-4 h-4" />
        <span>Add Education</span>
        </Button>
    </div>

    {/* Content Area */}
    {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-(--accent-warm)" />
        <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            Loading education background...
        </p>
        </div>
    ) : educationList.length === 0 ? (
        /* Empty State */
        <div
        className="p-12 text-center rounded-2xl border flex flex-col items-center justify-center gap-3"
        style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
        }}
        >
        <div
            className="p-4 rounded-2xl border"
            style={{
            backgroundColor: 'var(--bg-main)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--accent-warm)',
            }}
        >
            <GraduationCap className="w-8 h-8" />
        </div>
        <h3 className="text-base font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>
            No Education Records Found
        </h3>
        <p className="text-xs max-w-sm" style={{ color: 'var(--text-secondary)' }}>
            Start building your portfolio profile by adding your degrees, certifications, or academic milestones.
        </p>
        <Button onClick={handleOpenAdd} variant="secondary" size="sm" className="mt-2 gap-1.5">
            <Plus className="w-4 h-4" />
            <span>Add Education</span>
        </Button>
        </div>
    ) : (
        /* Education Stacked List */
        <div className="flex flex-col gap-4">
        {educationList.map((item) => (
            <EducationCard
            key={item._id}
            item={item}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
            />
        ))}
        </div>
    )}

    {/* Create / Edit Form Modal */}
    <EducationModal
        isOpen={isFormModalOpen}
        onClose={() => {
        setIsFormModalOpen(false);
        setSelectedItem(null);
        }}
        onSubmit={handleSubmit}
        initialData={selectedItem}
        isLoading={submitting}
    />

    {/* Custom Confirmation Delete Modal */}
    <DeleteEducationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
        setIsDeleteModalOpen(false);
        setSelectedItem(null);
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={deleting}
    />
    </div>
);
}