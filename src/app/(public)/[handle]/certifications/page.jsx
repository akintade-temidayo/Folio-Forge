'use client';

import React, { useState, useEffect } from 'react';
import CertificationsHeader from '@/components/portfolio/certifications/CertificationsHeader';
import CertificationsGrid from '@/components/portfolio/certifications/CertificationsGrid';

export default function CertificationsPage({ params }) {
const [handle, setHandle] = useState('');
const [certifications, setCertifications] = useState([]);
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
    async function unwrapParams() {
    const resolvedParams = await params;
    setHandle(resolvedParams.handle);
    }
    unwrapParams();
}, [params]);

useEffect(() => {
    if (!handle) return;

    async function fetchPublicData() {
    try {
        setLoading(true);
        const res = await fetch(`/api/public/${handle}`);
        const result = await res.json();

        if (result.success && result.data) {
        setCertifications(result.data.certifications || []);
        setUser(result.data.user || null);
        }
    } catch (err) {
        console.error('Failed to load certifications:', err);
    } finally {
        setLoading(false);
    }
    }

    fetchPublicData();
}, [handle]);

const userName = user?.name || user?.username || handle || 'Creator';

return (
    <div className="min-h-screen bg-(--bg-main) text-(--text-primary) pt-15 pb-16 px-4 md:px-8 max-w-5xl mx-auto space-y-10">
    <CertificationsHeader handle={handle} userName={userName} />
    <CertificationsGrid certifications={certifications} userName={userName} loading={loading} />
    </div>
);
}