'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Film, Star, FolderTree, Plus } from 'lucide-react';
import { FaInfoCircle } from 'react-icons/fa';
import PortfolioLinkCard from '@/components/admin/PortfolioLinkCard';
import { useOnboarding } from '@/context/OnboardingContext';

export default function AdminOverviewPage() {
const [user, setUser] = useState(null);
const [projectsCount, setProjectsCount] = useState(0);
const [isLoading, setIsLoading] = useState(true);
const { openOnboarding } = useOnboarding();

useEffect(() => {
async function fetchDashboardData() {
    try {
    const res = await fetch('/api/admin/profile');
    if (res.ok) {
        const data = await res.json();
        if (data.user) {
        setUser(data.user);
        }
        const count = data.counts?.projects ?? data.stats?.projectsCount ?? 0;
        setProjectsCount(count);
    }
    } catch (err) {
    console.error('Failed to load dashboard data:', err);
    } finally {
    setIsLoading(false);
    }
}

fetchDashboardData();
}, []);

const handleThemeChange = (newTheme) => {
setUser((prev) => (prev ? { ...prev, portfolioTheme: newTheme } : prev));
};

const handleTemplateChange = (newTemplate) => {
setUser((prev) => (prev ? { ...prev, portfolioTemplate: newTemplate } : prev));
};

return (
<div className="space-y-8">
    {/* Header Tour Target */}
    <div className="tour-overview-header">
    <h1 className="text-3xl font-serif font-bold" style={{ color: 'var(--text-primary)' }}>
        Welcome Back, {user?.name ? user.name.split(' ')[0] : 'Admin'}
    </h1>
    <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
        Manage your video projects, filter categories, and client reviews.
    </p>
    </div>

    {/* Portfolio Card Tour Target */}
    <div className="tour-portfolio-card">
    <PortfolioLinkCard 
        user={user} 
        projectsCount={projectsCount} 
        onThemeChange={handleThemeChange} 
        onTemplateChange={handleTemplateChange}
    />
    </div>

    {/* Quick Action Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="p-6 border rounded-xl space-y-4 transition-colors" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--bg-main)', color: 'var(--accent-warm)' }}>
        <Film className="w-5 h-5" />
        </div>
        <div>
        <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Projects</h3>
        <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Add new video entries or feature standout work.</p>
        </div>
        <Link href="/admin/projects" className="inline-block w-full">
        <Button variant="secondary" className="w-full text-xs gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Manage Projects
        </Button>
        </Link>
    </div>

    <div className="p-6 border rounded-xl space-y-4 transition-colors" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--bg-main)', color: 'var(--accent-warm)' }}>
        <FolderTree className="w-5 h-5" />
        </div>
        <div>
        <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Categories</h3>
        <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Manage portfolio tags (e.g. Ad Campaigns, Music Videos).</p>
        </div>
        <Link href="/admin/categories" className="inline-block w-full">
        <Button variant="secondary" className="w-full text-xs">Manage Categories</Button>
        </Link>
    </div>

    <div className="p-6 border rounded-xl space-y-4 transition-colors" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--bg-main)', color: 'var(--accent-warm)' }}>
        <Star className="w-5 h-5" />
        </div>
        <div>
        <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Testimonials</h3>
        <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Review and approve incoming feedback from past clients.</p>
        </div>
        <Link href="/admin/testimonials" className="inline-block w-full">
        <Button variant="secondary" className="w-full text-xs">Review Moderation</Button>
        </Link>
    </div>
    </div>
</div>
);
}