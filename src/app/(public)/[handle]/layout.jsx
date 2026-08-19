import dbConnect from '@/lib/db';
import User from '@/models/User';
import Navbar from '@/components/portfolio/layout/Navbar';
import Footer from '@/components/portfolio/layout/Footer';
import { THEMES } from '@/lib/themes';
import { notFound } from 'next/navigation';

export const revalidate = 0; // Dynamic server rendering for live theme changes

async function getPortfolioUser(handle) {
try {
await dbConnect();
const cleanHandle = (handle || '').toLowerCase();

const user = await User.findOne({
    $or: [
    { handle: cleanHandle },
    { handle: new RegExp(`^${cleanHandle}$`, 'i') },
    { name: new RegExp(`^${cleanHandle}$`, 'i') },
    ],
})
    .select('-password -resetCode -resetCodeExpiry')
    .lean();

if (!user) return null;

return {
    ...user,
    _id: user._id.toString(),
};
} catch (err) {
console.error('Error in layout fetching user profile:', err);
return null;
}
}

export async function generateMetadata({ params }) {
const { handle } = await params;
const user = await getPortfolioUser(handle);

if (!user) {
return { title: 'Portfolio Not Found' };
}

return {
title: `${user.name} | Portfolio`,
description: user.bio || `Explore ${user.name}'s public portfolio of projects and services.`,
};
}

export default async function PublicPortfolioLayout({ children, params }) {
const { handle } = await params;
const user = await getPortfolioUser(handle);

if (!user) {
notFound();
}

// Find theme from user profile or fallback to default
const activeThemeId = user.portfolioTheme || 'espresso';
const themeConfig = THEMES.find((t) => t.id === activeThemeId) || THEMES[0];

// Extract variables safely (handles both theme.variables and theme.vars definitions)
const themeVariables = themeConfig.variables || themeConfig.vars || {};

return (
<div
    data-theme={activeThemeId}
    className="min-h-screen flex flex-col font-sans transition-colors duration-300"
    style={{
    ...themeVariables,
    backgroundColor: 'var(--bg-main)',
    color: 'var(--text-primary)',
    }}
>
    <Navbar user={user} />
    <main className="flex-1 max-w-6xl w-full mx-auto px-6">
    {children}
    </main>
    <Footer user={user} />
</div>
);
}