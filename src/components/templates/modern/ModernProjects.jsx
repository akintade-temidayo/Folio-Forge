'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ProjectCard from '@/components/portfolio/ProjectCard'; 

export default function ModernProjects({ projects = [], handle = '' }) {
// Limit to latest 4 projects for the main view
const recentProjects = projects.slice(0, 4);

if (!projects || projects.length === 0) return null;

// Clean handle for the "See all" route
const userHandle = String(handle || '').replace(/^\/+|\/+$/g, '');
const seeAllHref = userHandle ? `/${userHandle}/projects` : '/projects';

return (
<section id="work" className="space-y-4 py-4 max-w-4xl mx-auto">
    {/* Header with See All link */}
    <div className="flex items-end justify-between border-b border-(--border-subtle) pb-3">
    <div>
        <h2 className="text-lg font-bold tracking-tight text-(--text-primary)">
        Featured Work
        </h2>
        <p className="text-xs text-(--text-secondary) mt-0.5">
        Recent projects and selected work
        </p>
    </div>

    {projects.length > 0 && (
        <Link
        href={seeAllHref}
        className="inline-flex items-center gap-1 text-xs font-bold text-(--accent-warm) hover:underline transition-all"
        >
        <span>See all ({projects.length})</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
    )}
    </div>

    {/* Responsive Compact 2-Column Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {recentProjects.map((project) => (
        <ProjectCard
        key={project._id || project.id}
        project={project}
        handle={userHandle}
        />
    ))}
    </div>
</section>
);
}