'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import ExperienceHeader from '@/components/portfolio/experience/ExperienceHeader';
import ExperienceTimeline from '@/components/portfolio/experience/ExperienceTimeline';
import Button from '@/components/ui/Button';

export default function ExperiencePage({ params }) {
const [handle, setHandle] = useState('');
const [experiences, setExperiences] = useState([]);
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
        setExperiences(result.data.experiences || []);
    }
    } catch (err) {
    console.error('Failed to load experience records:', err);
    } finally {
    setLoading(false);
    }
}

fetchPublicData();
}, [handle]);

return (
<div className="min-h-screen bg-(--bg-main) text-(--text-primary) pt-24 pb-16 px-4 md:px-8 max-w-5xl mx-auto space-y-12">
    {/* 1. Page Header */}
    <ExperienceHeader handle={handle} totalCount={experiences.length} />

    {/* 2. Timeline Section */}
    {loading ? (
    <div className="space-y-6 my-8">
        {[1, 2, 3].map((i) => (
        <div
            key={i}
            className="rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-6 space-y-4 animate-pulse"
        >
            <div className="h-5 bg-white/5 rounded w-1/3" />
            <div className="h-4 bg-white/5 rounded w-1/4" />
            <div className="h-12 bg-white/5 rounded w-full" />
        </div>
        ))}
    </div>
    ) : (
    <ExperienceTimeline experiences={experiences} />
    )}

    <hr className="border-t border-(--border-subtle) my-8" />

    {/* 4. CTA Section */}
    <div className="rounded-2xl bg-(--bg-surface) border border-(--border-subtle) p-8 text-center space-y-4">
    <h3 className="text-xl font-bold text-(--text-primary)">
        Want to discuss a potential role or collaboration?
    </h3>
    <p className="text-xs sm:text-sm text-(--text-secondary) max-w-md mx-auto">
        I am always open to discussing new opportunities, creative ideas, or being part of your vision.
    </p>
    <div className="pt-2 flex justify-center">
        <Link href={`/${handle}#contact`}>
        <Button variant="primary" size="md" className="gap-2">
            <Mail className="w-4 h-4" />
            <span>Get in Touch</span>
        </Button>
        </Link>
    </div>
    </div>
</div>
);
}