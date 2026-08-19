'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

export default function MinimalProjects({ projects = [], userHandle = '' }) {
if (!projects || projects.length === 0) return null;

// Limit display to 4 projects on main page
const displayedProjects = projects.slice(0, 4);
const projectsHref = userHandle ? `/${userHandle}/projects` : '/projects';

return (
<section id="projects" className="space-y-6 scroll-mt-24">
    {/* Section Label */}
    <div className="pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
    <h2 
        className="text-xs uppercase tracking-widest font-semibold"
        style={{ color: 'var(--text-secondary)' }}
    >
        Projects
    </h2>
    </div>

    {/* Full-Width Project List */}
    <div 
    className="divide-y border-t border-b"
    style={{ borderColor: 'var(--border-subtle)' }}
    >
    {displayedProjects.map((project) => {
        const projectHref = userHandle
        ? `/${userHandle}/projects/${project._id}`
        : `/projects/${project._id}`;

        return (
        <Link
            key={project._id}
            href={projectHref}
            className="group py-5 flex items-center justify-between gap-4 transition-all hover:px-3 rounded-lg -mx-3 cursor-pointer duration-500"
        >
            {/* Left: Title & Short Description */}
            <div className="space-y-1 min-w-0">
            <h3 
                className="font-serif font-semibold text-base sm:text-lg transition-colors group-hover:text-(--accent)"
                style={{ color: 'var(--text-primary)' }}
            >
                {project.title}
            </h3>
            {project.description && (
                <p 
                className="text-xs sm:text-sm line-clamp-1 max-w-xl"
                style={{ color: 'var(--text-secondary)' }}
                >
                {project.description}
                </p>
            )}
            </div>

            {/* Right: View Link */}
            <div 
            className="flex items-center gap-1 text-xs font-mono shrink-0 transition-all opacity-70 group-hover:opacity-100"
            style={{ color: 'var(--text-primary)' }}
            >
            <span>View</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
        </Link>
        );
    })}
    </div>

    {/* Always Visible "See All Projects" Link */}
    <div className="pt-2 flex justify-end">
    <Link
        href={projectsHref}
        className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider transition-colors group cursor-pointer hover:opacity-80"
        style={{ color: 'var(--text-primary)' }}
    >
        <span>See All Projects ({projects.length})</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
    </Link>
    </div>
</section>
);
}