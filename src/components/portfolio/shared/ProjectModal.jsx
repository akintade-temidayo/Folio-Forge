'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button'; 
import { FaGithub } from "react-icons/fa";

export default function ProjectModal({ project, userHandle = '', onClose }) {
if (!project) return null;

const projectId = project._id || project.id;
const projectDetailHref = userHandle 
? `/${userHandle}/projects/${projectId}` 
: `/projects/${projectId}`;

return (
<Modal
    isOpen={!!project}
    onClose={onClose}
    title={project.title || 'Project Details'}
>
    <div className="space-y-6">
    {/* Project Image Header */}
    {project.image && (
        <div 
        className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden border"
        style={{ borderColor: 'var(--border-subtle)' }}
        >
        <Image
            src={project.image}
            alt={project.title || 'Project preview'}
            fill
            className="object-cover"
        />
        </div>
    )}

    {/* Project Meta / Links */}
    <div className="flex flex-wrap items-center justify-between gap-3">
        {/* External Links */}
        <div className="flex items-center gap-3">
        {project.liveUrl && (
            <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            >
            <Button size="sm" className="gap-1.5">
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
            </Button>
            </a>
        )}

        {project.githubUrl && (
            <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            >
            <Button variant="outline" size="sm" className="gap-1.5">
                <FaGithub className="w-3.5 h-3.5" />
                <span>Source</span>
            </Button>
            </a>
        )}
        </div>

        {/* Direct Link to Dedicated Project Page */}
        {projectId && (
        <Link
            href={projectDetailHref}
            className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider transition-opacity hover:opacity-80"
            style={{ color: 'var(--accent-warm)' }}
        >
            <span>View Full Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        )}
    </div>

    {/* Project Description */}
    {project.description && (
        <div className="space-y-2">
        <h4 
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: 'var(--text-secondary)' }}
        >
            About
        </h4>
        <p 
            className="text-xs sm:text-sm leading-relaxed whitespace-pre-line"
            style={{ color: 'var(--text-primary)' }}
        >
            {project.description}
        </p>
        </div>
    )}

    {/* Project Tags */}
    {(project.tags || project.technologies) && (
        <div className="space-y-2">
        <h4 
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: 'var(--text-secondary)' }}
        >
            Technologies Used
        </h4>
        <div className="flex flex-wrap gap-1.5">
            {(project.tags || project.technologies).map((tech, idx) => (
            <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-md border font-mono"
                style={{
                backgroundColor: 'var(--bg-main)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-secondary)',
                }}
            >
                {tech}
            </span>
            ))}
        </div>
        </div>
    )}
    </div>
</Modal>
);
}