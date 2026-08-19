'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
Film,
FolderTree,
Star,
Briefcase,
User,
LogOut,
LayoutDashboard,
Menu,
X,
MessageSquarePlus,
History,
} from 'lucide-react';
import { FaInfoCircle } from 'react-icons/fa';
import SidebarThemeSwitcher from '@/components/ui/SidebarThemeSwitcher';
import OnboardingTour from '@/components/layout/OnboardingTour';
import { OnboardingProvider } from '@/context/OnboardingContext';

export default function AdminLayout({ children, user: initialUser }) {
const [currentUser, setCurrentUser] = useState(initialUser || null);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [runTour, setRunTour] = useState(false);
const pathname = usePathname();
const router = useRouter();

const isAuthPage =
pathname.includes('/admin/login') ||
pathname.includes('/admin/forgot-password') ||
pathname.includes('/admin/reset-password');

useEffect(() => {
async function fetchUser() {
    try {
    const res = await fetch('/api/admin/profile');
    const data = await res.json();
    if (data.success && data.user) {
        setCurrentUser(data.user);
    } else {
        setCurrentUser(null);
    }
    } catch (error) {
    console.error('Failed to fetch sidebar user:', error);
    setCurrentUser(null);
    }
}

fetchUser();
}, [pathname]);

// First-visit auto-start
useEffect(() => {
if (isAuthPage || !currentUser) return;

const userId = currentUser._id || currentUser.id;
const key = `folioforge_onboarding_${userId || 'guest'}`;
const hasSeenGuide = localStorage.getItem(key);

if (!hasSeenGuide) {
    const timer = window.setTimeout(() => setRunTour(true), 300);
    return () => window.clearTimeout(timer);
}
}, [currentUser, isAuthPage]);

const handleLogout = async () => {
try {
    await fetch('/api/auth/logout', { method: 'POST' });
    setCurrentUser(null);
    router.push('/admin/login');
} catch (err) {
    console.error('Logout failed:', err);
}
};

const userName = currentUser?.name || 'Guest User';
const userAvatar = currentUser?.avatarUrl || '';
const userInitial = userName.charAt(0).toUpperCase();

const navItems = [
{ label: 'Overview', href: '/admin/overview', icon: LayoutDashboard, tourId: 'tour-overview' },
{ label: 'Projects', href: '/admin/projects', icon: Film, tourId: 'tour-projects' },
{ label: 'Experience', href: '/admin/experience', icon: History, tourId: 'tour-experience' },
{ label: 'Services', href: '/admin/services', icon: Briefcase, tourId: 'tour-services' },
{ label: 'Categories', href: '/admin/categories', icon: FolderTree, tourId: 'tour-categories' },
{ label: 'Testimonials', href: '/admin/testimonials', icon: Star, tourId: 'tour-testimonials' },
{ label: 'Profile', href: '/admin/profile', icon: User, tourId: 'tour-profile-nav' },
];

const openOnboarding = () => setRunTour(true);
const isRequestPageActive = pathname === '/admin/request-page';

const handleTourEnd = () => {
setRunTour(false);
const userId = currentUser?._id || currentUser?.id;
const key = `folioforge_onboarding_${userId || 'guest'}`;
localStorage.setItem(key, 'true');
};

return (
<div className="min-h-screen md:h-screen md:overflow-hidden bg-(--bg-main) text-(--text-primary) flex flex-col md:flex-row transition-colors duration-200">
    {/* Mobile Top Navigation Header */}
    <div className="md:hidden flex items-center justify-between p-4 bg-(--bg-surface) border-b border-(--border-subtle) sticky top-0 z-40">
    <div className="flex items-center gap-3">
        <div className="relative w-8 h-8 rounded-lg bg-(--accent-warm) overflow-hidden flex items-center justify-center font-bold text-[#1c1917] text-sm shrink-0 border border-(--border-subtle)">
        {userAvatar ? (
            <Image src={userAvatar} alt={userName} fill sizes="32px" className="object-cover" />
        ) : (
            userInitial
        )}
        </div>
        <div>
        <h2 className="font-semibold text-sm text-(--text-primary) line-clamp-1">{userName}</h2>
        <span className="text-[10px] text-(--text-secondary) block -mt-0.5">Admin Portal</span>
        </div>
        {!isAuthPage && currentUser && (
        <button
            type="button"
            onClick={openOnboarding}
            className="p-1.5 rounded-lg text-(--text-secondary) hover:text-(--accent-warm) transition-colors"
            title="View onboarding guide"
            data-tour="tour-info-icon"
        >
            <FaInfoCircle className="w-4 h-4" />
        </button>
        )}
    </div>

    <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="p-2 rounded-lg bg-(--bg-main) text-(--text-secondary) hover:text-(--text-primary) border border-(--border-subtle) transition-colors"
        aria-label="Toggle menu"
    >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
    </button>
    </div>

    {/* Sidebar Navigation */}
    <aside
    className={`${
        isMobileMenuOpen ? 'flex' : 'hidden'
    } md:flex w-full md:w-64 md:h-screen md:overflow-y-auto no-scrollbar bg-(--bg-surface) border-b md:border-b-0 md:border-r border-(--border-subtle) p-6 flex-col justify-between shrink-0 transition-all duration-200`}
    >
    <div>
        {isAuthPage || !currentUser ? (
        <div className="hidden md:flex items-center gap-3 mb-8 p-2 -mx-2 opacity-50 cursor-not-allowed">
            <div className="relative w-9 h-9 rounded-lg bg-(--accent-warm) overflow-hidden flex items-center justify-center font-bold text-[#1c1917] shrink-0 border border-(--border-subtle)">
            {userAvatar ? (
                <Image src={userAvatar} alt={userName} fill sizes="36px" className="object-cover" />
            ) : (
                userInitial
            )}
            </div>
            <div className="min-w-0 flex-1">
            <h2 className="font-semibold text-sm text-(--text-primary) truncate">{userName}</h2>
            <span className="text-xs text-(--text-secondary) block truncate">Portal Locked</span>
            </div>
        </div>
        ) : (
        <div className="hidden md:flex items-center gap-2 mb-8 p-2 -mx-2 rounded-xl hover:bg-(--bg-surface-hover) transition-colors group" data-tour="tour-profile-row">
            <Link href="/admin/profile" className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative w-9 h-9 rounded-lg bg-(--accent-warm) overflow-hidden flex items-center justify-center font-bold text-[#1c1917] shrink-0 border border-(--border-subtle)">
                {userAvatar ? (
                <Image src={userAvatar} alt={userName} fill sizes="36px" className="object-cover" />
                ) : (
                userInitial
                )}
            </div>
            <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-sm text-(--text-primary) group-hover:text-(--accent-warm) transition-colors truncate">
                {userName}
                </h2>
                <span className="text-xs text-(--text-secondary) block truncate">View Profile</span>
            </div>
            </Link>
            <button
            type="button"
            onClick={openOnboarding}
            className="p-1.5 rounded-lg text-(--text-secondary) hover:text-(--accent-warm) transition-colors shrink-0"
            title="View onboarding guide"
            data-tour="tour-info-icon"
            >
            <FaInfoCircle className="w-4 h-4" />
            </button>
        </div>
        )}

        <nav className="space-y-1">
        {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            if (isAuthPage || !currentUser) {
            return (
                <div
                key={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-(--text-secondary) opacity-40 cursor-not-allowed select-none"
                >
                <Icon className="w-4 h-4 text-(--text-secondary)" />
                <span>{item.label}</span>
                </div>
            );
            }

            return (
            <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                data-tour={item.tourId}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                    ? 'bg-(--bg-surface-hover) text-(--text-primary) font-medium'
                    : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-surface-hover)'
                }`}
            >
                <Icon className={`w-4 h-4 ${isActive ? 'text-(--accent-warm)' : 'text-(--text-secondary)'}`} />
                <span>{item.label}</span>
            </Link>
            );
        })}
        </nav>
    </div>

    <div className="pt-4 border-t border-(--border-subtle) mt-6 md:mt-0 space-y-1">
        {!isAuthPage && currentUser && (
        <Link
            href="/admin/request-page"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
            isRequestPageActive
                ? 'bg-(--accent-warm)/10 text-(--accent-warm) font-semibold'
                : 'text-(--text-secondary) hover:text-(--accent-warm) hover:bg-(--bg-surface-hover)'
            }`}
        >
            <MessageSquarePlus className="w-4 h-4 text-(--accent-warm)" />
            <span>Send Request</span>
        </Link>
        )}

        <SidebarThemeSwitcher />

        {!isAuthPage && currentUser && (
        <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors text-left"
        >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Logout</span>
        </button>
        )}
    </div>
    </aside>

    {/* Main Content Area */}
    <main className="flex-1 md:h-screen p-4 md:p-10 overflow-y-auto no-scrollbar">
    <div className="max-w-5xl mx-auto">
        <OnboardingProvider openOnboarding={openOnboarding}>{children}</OnboardingProvider>
    </div>
    </main>

    {!isAuthPage && currentUser && (
    <OnboardingTour run={runTour} onEnd={handleTourEnd} />
    )}
</div>
);
}