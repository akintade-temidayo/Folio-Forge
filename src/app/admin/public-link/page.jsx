'use client';

import React, { useState, useEffect } from 'react';
import PortfolioLinkCard from '@/components/admin/PortfolioLinkCard';

export default function PublicLinkPage() {
const [user, setUser] = useState(null);
const [projectsCount, setProjectsCount] = useState(0);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    async function fetchData() {
    try {
        const res = await fetch('/api/admin/profile');
        if (res.ok) {
        const data = await res.json();
        if (data.user) setUser(data.user);
        const count = data.counts?.projects ?? data.stats?.projectsCount ?? 0;
        setProjectsCount(count);
        }
    } catch (err) {
        console.error('Failed to load user profile:', err);
    } finally {
        setIsLoading(false);
    }
    }

    fetchData();
}, []);

const handleThemeChange = (newTheme) => {
    setUser((prev) => (prev ? { ...prev, portfolioTheme: newTheme } : prev));
};

const handleTemplateChange = (newTemplate) => {
    setUser((prev) => (prev ? { ...prev, portfolioTemplate: newTemplate } : prev));
};

if (isLoading) {
    return (
    <div className="py-12 text-center text-xs text-(--text-secondary)">
        Loading public link settings...
    </div>
    );
}

return (
    <div className="space-y-6">
    <div>
        <h1 className="text-3xl font-serif font-bold text-(--text-primary)">
        Public Portfolio Link
        </h1>
        <p className="text-sm text-(--text-secondary) mt-1">
        Customize your live portfolio link, theme accent, and layout template.
        </p>
    </div>

    <PortfolioLinkCard
        user={user}
        projectsCount={projectsCount}
        onThemeChange={handleThemeChange}
        onTemplateChange={handleTemplateChange}
    />
    </div>
);
}