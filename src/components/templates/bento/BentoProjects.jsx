'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, FolderGit2, Star, ArrowRight } from 'lucide-react';
import ProjectModal from '@/components/portfolio/shared/ProjectModal';
import { CardMediaPreview } from '@/components/portfolio/shared/ProjectCard'; 

export default function BentoProjects({ projects = [], userHandle = '' }) {
const [selectedProject, setSelectedProject] = useState(null);

if (!projects || projects.length === 0) return null;

// Clean handle for links
let handle = userHandle;
if (!handle && typeof window !== 'undefined') {
handle = window.location.pathname.split('/')[1] || '';
}

const projectsHref = handle ? `/${handle}/projects` : '/projects';

// 1. Featured project
const featuredProject = projects.find((p) => p.isFeatured || p.featured) || projects[0];
const featuredId = featuredProject?._id || featuredProject?.id;

// 2. Exactly 4 other projects (Total = 5 projects max)
const otherProjects = projects
.filter((p) => (p._id || p.id) !== featuredId)
.slice(0, 4);

return (
<section id="projects" className="space-y-4">
    {/* Section Header */}
    <div className="flex items-center justify-between pb-1">
    <h2 
        className="text-xs font-bold uppercase tracking-widest flex items-center gap-2"
        style={{ color: 'var(--text-secondary)' }}
    >
        <FolderGit2 className="w-4 h-4" style={{ color: 'var(--accent-warm)' }} />
        <span>Projects</span>
    </h2>
    </div>

    {/* Bento Grid Layout */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* 1. Tall Featured Hero Box (Spans 1 Column, Tall) */}
    {featuredProject && (
        <div
        onClick={() => setSelectedProject(featuredProject)}
        className="group relative md:col-span-1 rounded-2xl p-5 border flex flex-col justify-between min-h-70 cursor-pointer overflow-hidden transition-all duration-300 hover:border-(--accent-warm)/50"
        style={{ 
            backgroundColor: 'var(--bg-surface)', 
            borderColor: 'var(--border-subtle)' 
        }}
        >
        {/* Background Media Overlay using CardMediaPreview */}
        <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none">
            <CardMediaPreview project={featuredProject} priority />
        </div>

        {/* Gradient Overlay to ensure text readability over media */}
        <div className="absolute inset-0 z-0 bg-linear-to-t from-(--bg-surface) via-(--bg-surface)/60 to-transparent" />

        {/* Top Bar */}
        <div className="relative z-10 flex items-center justify-between">
            <span 
            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
            style={{ 
                backgroundColor: 'var(--bg-main)', 
                borderColor: 'var(--border-subtle)',
                color: 'var(--accent-warm)' 
            }}
            >
            <Star className="w-3 h-3 fill-current" />
            Featured
            </span>

            <div 
            className="w-8 h-8 rounded-full border flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ 
                backgroundColor: 'var(--bg-main)', 
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)' 
            }}
            >
            <ArrowUpRight className="w-4 h-4" />
            </div>
        </div>

        {/* Bottom Info */}
        <div className="relative z-10 space-y-2 mt-auto pt-6">
            <h3 
            className="text-lg font-bold transition-colors"
            style={{ color: 'var(--text-primary)' }}
            >
            {featuredProject.title}
            </h3>
            
            <p 
            className="text-xs line-clamp-2 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
            >
            {featuredProject.description}
            </p>

            {/* Tags */}
            {featuredProject.tags && featuredProject.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
                {featuredProject.tags.slice(0, 3).map((tag, i) => (
                <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded border"
                    style={{ 
                    backgroundColor: 'var(--bg-main)', 
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-secondary)' 
                    }}
                >
                    {tag}
                </span>
                ))}
            </div>
            )}
        </div>
        </div>
    )}

    {/* 2. Up to 4 Stacked Projects (Spans 2 Columns, 2x2 Grid) */}
    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {otherProjects.map((project) => (
        <div
            key={project._id || project.id || project.title}
            onClick={() => setSelectedProject(project)}
            className="group relative rounded-2xl p-5 border flex flex-col justify-between cursor-pointer overflow-hidden transition-all duration-300 hover:border-(--accent-warm)/50 space-y-4"
            style={{ 
            backgroundColor: 'var(--bg-surface)', 
            borderColor: 'var(--border-subtle)' 
            }}
        >
            {/* Background Media Overlay */}
            <div className="absolute inset-0 z-0 opacity-15 group-hover:opacity-25 transition-opacity duration-300 pointer-events-none">
            <CardMediaPreview project={project} />
            </div>

            {/* Gradient Overlay for legibility */}
            <div className="absolute inset-0 z-0 bg-linear-to-t from-(--bg-surface) via-(--bg-surface)/70 to-transparent" />

            <div className="relative z-10 flex items-start justify-between gap-2">
            <div className="space-y-1">
                <h3 
                className="text-sm font-bold transition-colors"
                style={{ color: 'var(--text-primary)' }}
                >
                {project.title}
                </h3>
                <p 
                className="text-xs line-clamp-2 leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
                >
                {project.description}
                </p>
            </div>

            <div 
                className="w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ 
                backgroundColor: 'var(--bg-main)', 
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)' 
                }}
            >
                <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
            <div className="relative z-10 flex flex-wrap gap-1 pt-2">
                {project.tags.slice(0, 3).map((tag, i) => (
                <span
                    key={i}
                    className="text-[9px] px-2 py-0.5 rounded border"
                    style={{ 
                    backgroundColor: 'var(--bg-main)', 
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-secondary)' 
                    }}
                >
                    {tag}
                </span>
                ))}
            </div>
            )}
        </div>
        ))}
    </div>
    </div>

    {/* See All Projects Footer Link */}
    <div className="pt-2 flex justify-end">
    <Link
        href={projectsHref}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all hover:underline"
        style={{ color: 'var(--accent-warm)' }}
    >
        <span>See All Projects ({projects.length})</span>
        <ArrowRight className="w-3.5 h-3.5" />
    </Link>
    </div>

    {/* Detail Modal */}
    <ProjectModal
    project={selectedProject}
    userHandle={handle}
    onClose={() => setSelectedProject(null)}
    />
</section>
);
}
