'use client';

import React, { useState, useEffect } from 'react';
import EducationHeader from '@/components/portfolio/education/EducationHeader';
import EducationList from '@/components/portfolio/education/EducationList';

export default function EducationPage({ params }) {
const [handle, setHandle] = useState('');
const [education, setEducation] = useState([]);
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
        setEducation(result.data.education || []);
        setUser(result.data.user || null);
        }
    } catch (err) {
        console.error('Failed to load education details:', err);
    } finally {
        setLoading(false);
    }
    }

    fetchPublicData();
}, [handle]);

const userName = user?.name || user?.username || handle || 'Creator';

return (
    <div className="min-h-screen bg-(--bg-main) text-(--text-primary) pt-15 pb-16 px-4 md:px-8 max-w-4xl mx-auto space-y-10">
    <EducationHeader handle={handle} userName={userName} />
    <EducationList education={education} userName={userName} loading={loading} />
    </div>
);
}