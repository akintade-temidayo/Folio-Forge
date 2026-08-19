import React from 'react';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Project from '@/models/Project';
import Category from '@/models/Category';

// Import Modular Components
import ProjectsPageHeader from '@/components/portfolio/project/ProjectsPageHeader';
import ProjectsGrid from '@/components/portfolio/project/ProjectsGrid';

export const revalidate = 0;

async function getAllProjectsData(handle) {
try {
await dbConnect();
const cleanHandle = (handle || '').toLowerCase();

// 1. Find Creator
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

// 2. Fetch all projects & categories
const [projects, categories] = await Promise.all([
    Project.find({ userId: user._id })
    .populate('category')
    .sort({ createdAt: -1 })
    .lean(),
    Category.find({ userId: user._id }).lean(),
]);

return {
    user: JSON.parse(JSON.stringify(user)),
    projects: JSON.parse(JSON.stringify(projects)),
    categories: JSON.parse(JSON.stringify(categories)),
};
} catch (err) {
console.error('Error fetching projects list:', err);
return null;
}
}

export async function generateMetadata({ params }) {
const { handle } = await params;
const data = await getAllProjectsData(handle);

if (!data) return { title: 'Projects Not Found' };

return {
title: `All Projects | ${data.user.name || handle}`,
description: `Browse all work and showcase entries by ${data.user.name || handle}.`,
};
}

export default async function AllProjectsPage({ params }) {
const { handle } = await params;
const data = await getAllProjectsData(handle);

if (!data) {
notFound();
}

const { user, projects, categories } = data;

return (
<main className="min-h-screen bg-(--bg-main) text-(--text-primary) py-10 px-4 sm:px-8">
    <div className="max-w-6xl mx-auto space-y-8">
    {/* Page Header */}
    <ProjectsPageHeader
        user={user}
        handle={handle}
        totalCount={projects.length}
    />

    {/* Category Tabs & Interactive Project Grid */}
    <ProjectsGrid
        projects={projects}
        categories={categories}
        handle={handle}
    />
    </div>
</main>
);
}