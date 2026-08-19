'use client';

import React, { useState } from 'react';
import ProjectCard from '@/components/portfolio/ProjectCard';
import ProjectsFilter from './ProjectsFilter';

export default function ProjectsGrid({ projects = [], categories = [], handle }) {
const [selectedCategory, setSelectedCategory] = useState('all');

// Filter projects by category
const filteredProjects = projects.filter((p) => {
if (selectedCategory === 'all') return true;

const catId = typeof p.category === 'object' ? p.category?._id || p.category?.id : p.category;
return catId === selectedCategory;
});

return (
<div className="space-y-6">
    {/* Category Filter Tabs */}
    <ProjectsFilter
    categories={categories}
    activeCategory={selectedCategory}
    onSelectCategory={setSelectedCategory}
    />

    {/* Grid List */}
    {filteredProjects.length === 0 ? (
    <div className="rounded-2xl border border-dashed border-(--border-subtle) bg-(--bg-surface)/50 p-12 text-center text-xs text-(--text-secondary)">
        No projects found in this category.
    </div>
    ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((p) => {
        const id = p._id || p.id;
        return <ProjectCard key={id} project={p} handle={handle} />;
        })}
    </div>
    )}
</div>
);
}