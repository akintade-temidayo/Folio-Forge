'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import CertificationCard from '@/components/admin/certifications/CertificationCard';
import CertificationForm from '@/components/admin/certifications/CertificationForm';
import {
fetchCertifications,
createCertification,
updateCertification,
deleteCertification,
} from '@/lib/certification-functions';
import { Award, Plus, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function CertificationsPage() {
const [certifications, setCertifications] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

// Modal State
const [isModalOpen, setIsModalOpen] = useState(false);
const [editingCert, setEditingCert] = useState(null);

const loadCertifications = React.useCallback(async () => {
    try {
    setLoading(true);
    setError('');
    const data = await fetchCertifications();
    setCertifications(data || []);
    } catch (err) {
    setError(err.message || 'Failed to load certifications.');
    } finally {
    setLoading(false);
    }
}, []);

useEffect(() => {
    let isMounted = true;

    const fetchInitialCertifications = async () => {
    try {
        setLoading(true);
        setError('');
        const data = await fetchCertifications();
        if (isMounted) {
        setCertifications(data || []);
        }
    } catch (err) {
        if (isMounted) {
        setError(err.message || 'Failed to load certifications.');
        }
    } finally {
        if (isMounted) {
        setLoading(false);
        }
    }
    };

    fetchInitialCertifications();

    return () => {
    isMounted = false;
    };
}, []);

const handleOpenCreateModal = () => {
    setEditingCert(null);
    setIsModalOpen(true);
};

const handleOpenEditModal = (cert) => {
    setEditingCert(cert);
    setIsModalOpen(true);
};

const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCert(null);
};

const handleFormSubmit = async (formData) => {
    if (editingCert) {
    await updateCertification(editingCert._id, formData);
    toast.warning('Certification updated successfully.');
    } else {
    await createCertification(formData);
    toast.success('Certification created successfully.');
    }
    handleCloseModal();
    await loadCertifications();
};

const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this certification?')) return;
    try {
    await deleteCertification(id);
    setCertifications((prev) => prev.filter((item) => item._id !== id));
    toast.error('Certification deleted successfully.');
    } catch (err) {
    toast.error(err.message || 'Failed to delete certification.');
    }
};

return (
    <div className="space-y-8 max-w-6xl mx-auto p-4 md:p-6">
    {/* Header Section */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
        <div className="flex items-center gap-2.5">
            <Award className="w-6 h-6" style={{ color: 'var(--accent-warm)' }} />
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Certifications
            </h1>
        </div>
        <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            Manage and showcase your professional credentials, licenses, and verified achievements.
        </p>
        </div>

        <Button variant="primary" onClick={handleOpenCreateModal} className="gap-2 shrink-0">
        <Plus className="w-4 h-4" />
        <span>Add Certification</span>
        </Button>
    </div>

    {/* Error Alert */}
    {error && (
        <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-medium">
        <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
        <span>{error}</span>
        </div>
    )}

    {/* Loading State */}
    {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--accent-warm)' }} />
        <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            Fetching certifications...
        </p>
        </div>
    ) : certifications.length === 0 ? (
        /* Empty State */
        <div
        className="flex flex-col items-center justify-center text-center p-10 md:p-16 rounded-2xl border space-y-4"
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
            <Award className="w-8 h-8" />
        </div>
        <div className="space-y-1 max-w-sm">
            <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
            No Certifications Added Yet
            </h3>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Highlight your credentials by uploading your certificates or adding direct verification links.
            </p>
        </div>
        <Button variant="primary" onClick={handleOpenCreateModal} className="gap-2 text-xs">
            <Plus className="w-4 h-4" />
            <span>Add Your First Certification</span>
        </Button>
        </div>
    ) : (
        /* Certifications Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
            <CertificationCard
            key={cert._id}
            cert={cert}
            onEdit={handleOpenEditModal}
            onDelete={handleDelete}
            />
        ))}
        </div>
    )}

    {/* Create / Edit Modal */}
    <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCert ? 'Edit Certification' : 'Add New Certification'}
    >
        <CertificationForm
        initialData={editingCert}
        onSubmit={handleFormSubmit}
        onCancel={handleCloseModal}
        />
    </Modal>
    </div>
);
}