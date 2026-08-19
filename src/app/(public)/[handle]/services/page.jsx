'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import ServicesHeader from '@/components/portfolio/services/ServicesHeader';
import ServicesGrid from '@/components/portfolio/services/ServicesGrid';
import Button from '@/components/ui/Button';

export default function ServicesPage({ params }) {
const [handle, setHandle] = useState('');
const [services, setServices] = useState([]);
const [userEmail, setUserEmail] = useState('');
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
        setServices(result.data.services || []);
        setUserEmail(result.data.user?.email || '');
    }
    } catch (err) {
    console.error('Failed to load services:', err);
    } finally {
    setLoading(false);
    }
}

fetchPublicData();
}, [handle]);

return (
<div className="min-h-screen bg-(--bg-main) text-(--text-primary) pt-15 pb-16 px-4 md:px-8 max-w-5xl mx-auto space-y-12">
    {/* 1. Page Header */}
    <ServicesHeader handle={handle} totalCount={services.length} />

    {/* 2. Services Grid */}
    {loading ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {[1, 2].map((i) => (
        <div
            key={i}
            className="rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-6 space-y-4 animate-pulse"
        >
            <div className="h-5 bg-white/5 rounded w-1/3" />
            <div className="h-6 bg-white/5 rounded w-3/4" />
            <div className="h-16 bg-white/5 rounded w-full" />
        </div>
        ))}
    </div>
    ) : (
    <ServicesGrid
        services={services}
        userEmail={userEmail}
        handle={handle}
    />
    )}

    {/* 3. Divider Line */}
    <hr className="border-t border-(--border-subtle) my-8" />

    {/* 4. Custom Package / General Inquiry */}
    <div className="rounded-2xl bg-(--bg-surface) border border-(--border-subtle) p-8 text-center space-y-4">
    <h3 className="text-xl font-bold text-(--text-primary)">
        Need a custom service or package?
    </h3>
    <p className="text-xs sm:text-sm text-(--text-secondary) max-w-md mx-auto">
        Have a unique project requirement not listed above? Feel free to reach out and let&apos;s structure a tailored offering.
    </p>
    <div className="pt-2 flex justify-center">
        <a
        href={`mailto:${userEmail}?subject=${encodeURIComponent(
            `Custom Solution Inquiry (${handle})`
        )}`}
        >
        <Button variant="primary" size="md" className="gap-2">
            <Mail className="w-4 h-4" />
            <span>Get in Touch</span>
        </Button>
        </a>
    </div>
    </div>
</div>
);
}