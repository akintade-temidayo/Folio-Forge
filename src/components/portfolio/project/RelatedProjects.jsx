'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProjectCard from '@/components/portfolio/ProjectCard';

export default function RelatedProjects({ projects = [], currentProjectId, handle }) {
// Filter out the active project
const otherProjects = projects
.filter((p) => (p._id || p.id)?.toString() !== currentProjectId?.toString())
.slice(0, 3);

if (otherProjects.length === 0) return null;

return (
<section className="pt-10 border-t border-(--border-subtle) space-y-6">
    <div className="flex items-center justify-between">
    <h3 className="text-xl font-bold text-(--text-primary)">
        More Projects
    </h3>
    <Link
        href={`/${handle}/projects`}
        className="group flex items-center gap-1.5 text-xs font-semibold text-(--accent-warm) hover:underline"
    >
        <span>View All</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
    </Link>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {otherProjects.map((project) => {
        const id = project._id || project.id;
        return (
        <ProjectCard
            key={id}
            project={project}
            handle={handle}
        />
        );
    })}
    </div>
</section>
);
}