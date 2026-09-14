'use client';

import { useState, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import NoCategoriesBanner from '@/components/admin/services/NoCategoriesBanner';
import ServicesGrid from '@/components/admin/services/ServicesGrid';
import ServiceFormModal from '@/components/admin/services/ServiceFormModal';
import { toast } from 'sonner';

export default function ServicesPage() {
const [services, setServices] = useState([]);
const [categories, setCategories] = useState([]);
const [loading, setLoading] = useState(true);
const [isModalOpen, setIsModalOpen] = useState(false);
const [servicePendingDeletion, setServicePendingDeletion] = useState(null);
const [isDeleting, setIsDeleting] = useState(false);

useEffect(() => {
async function fetchServicesData() {
    try {
    setLoading(true);
    const res = await fetch('/api/admin/services');
    const data = await res.json();
    if (data.success) {
        setServices(data.services || []);
        setCategories(data.categories || []);
    }
    } catch (err) {
    console.error('Failed loading services:', err);
    } finally {
    setLoading(false);
    }
}
fetchServicesData();
}, []);

const handleCreateService = async (payload) => {
const res = await fetch('/api/admin/services', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
});
const data = await res.json();
if (!res.ok) throw new Error(data.message || 'Failed to add service');
setServices((prev) => [data.service, ...prev]);
setIsModalOpen(false);
toast.success('Service created successfully.');
};

const handleDeleteService = async () => {
const id = servicePendingDeletion?._id;
if (!id) return;

try {
    setIsDeleting(true);
    const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.error || 'Failed to delete service');
    setServices((prev) => prev.filter((service) => service._id !== id));
    setServicePendingDeletion(null);
    toast.error('Service deleted successfully.');
} catch (err) {
    console.error('Failed to delete service:', err);
    toast.error(err.message || 'Failed to delete service.');
} finally {
    setIsDeleting(false);
}
};

if (loading) {
return (
    <div className="flex flex-col items-center justify-center min-h-100">
    <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--accent-warm)' }} />
    <p className="text-sm mt-3" style={{ color: 'var(--text-secondary)' }}>Loading services...</p>
    </div>
);
}

const hasNoCategories = categories.length === 0;

return (
<div className="space-y-8">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
        <h1 className="text-2xl font-serif font-bold" style={{ color: 'var(--text-primary)' }}>
        Services Offered
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
        Manage your service offerings and pricing tiers for prospective clients.
        </p>
    </div>

    <button
        disabled={hasNoCategories}
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: 'var(--accent-warm)', color: 'var(--bg-main)' }}
        title={hasNoCategories ? 'Create a category first to add services' : undefined}
    >
        <Plus className="w-4 h-4" />
        <span>Add Service</span>
    </button>
    </div>

    {hasNoCategories && <NoCategoriesBanner />}

    <ServicesGrid
    services={services}
    hasNoCategories={hasNoCategories}
    onDelete={(id) => setServicePendingDeletion(services.find((service) => service._id === id) || null)}
    />

    {isModalOpen && (
    <ServiceFormModal
        categories={categories}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateService}
    />
    )}

    <Modal
    isOpen={Boolean(servicePendingDeletion)}
    onClose={() => {
        if (!isDeleting) setServicePendingDeletion(null);
    }}
    title="Delete Service?"
    >
    <div className="space-y-6">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        Are you sure you want to delete <strong style={{ color: 'var(--text-primary)' }}>{servicePendingDeletion?.title}</strong>?
        This cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={() => setServicePendingDeletion(null)} disabled={isDeleting}>
            Cancel
        </Button>
        <Button variant="danger" onClick={handleDeleteService} isLoading={isDeleting}>
            Delete Service
        </Button>
        </div>
    </div>
    </Modal>
</div>
);
}
