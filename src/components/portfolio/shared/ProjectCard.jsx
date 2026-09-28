'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Film, ArrowUpRight } from 'lucide-react';

/**
 * Renders either Video or Picture depending on project data.
 * Exported so Bento, Grid, or Related Projects can reuse the exact same media logic.
 */
export function CardMediaPreview({ project, priority = false }) {
if (!project) return null;

const isPicture = project?.projectType === 'picture';

// previewClip takes priority — matches backend conventions
const videoUrl = project?.previewClip || project?.videoUrl || project?.previewVideoUrl;

const imageSrc =
project?.images?.[0] ||
project?.coverImage ||
project?.thumbnail ||
project?.image ||
project?.mediaUrl;

// 1. VIDEO PROJECTS
if (!isPicture && videoUrl) {
// YouTube Embed
if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
    const videoId = videoUrl.includes('youtu.be')
    ? videoUrl.split('/').pop()?.split('?')[0]
    : videoUrl.split('v=')[1]?.split('&')[0];
    return (
    <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&rel=0`}
        title={project.title || 'Project Video'}
        className="w-full h-full border-0 pointer-events-none scale-125"
    />
    );
}

// Vimeo Embed
if (videoUrl.includes('vimeo.com')) {
    const videoId = videoUrl.split('/').pop()?.split('?')[0];
    return (
    <iframe
        src={`https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&byline=0&title=0`}
        title={project.title || 'Project Video'}
        className="w-full h-full border-0 pointer-events-none scale-125"
    />
    );
}

// Direct MP4 / Cloudinary / AWS S3 Video
return (
    <video
    src={videoUrl}
    muted
    loop
    playsInline
    autoPlay
    className="w-full h-full object-cover pointer-events-none"
    />
);
}

// 2. PICTURE / PHOTO PROJECTS (OR VIDEO FALLBACK IMAGE)
if (imageSrc) {
return (
    <Image
    src={imageSrc}
    alt={project?.title || 'Project'}
    fill
    loading={priority ? 'eager' : 'lazy'}
    sizes="(max-width: 768px) 100vw, 50vw"
    className="object-cover group-hover:scale-105 transition-transform duration-500"
    />
);
}

// 3. FALLBACK WHEN NO MEDIA EXISTS
return (
<div 
    className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center"
    style={{ color: 'var(--text-secondary)' }}
>
    <Film className="w-6 h-6 opacity-40 mb-1" />
    <span className="text-[10px] font-medium opacity-60">No Media</span>
</div>
);
}

/**
 * Standard reusable Project Card component
 */
export default function ProjectCard({ project, handle }) {
if (!project) return null;

const projectId = project._id || project.id;
const categoryName = project.category?.name || '';

// Get handle from props, OR fallback to extracting it from current URL
let userHandle = String(handle || '').replace(/^\/+|\/+$/g, '');

if (!userHandle && typeof window !== 'undefined') {
userHandle = window.location.pathname.split('/')[1] || '';
}

// Construct valid dynamic route: /username/projects/123456
const projectHref = userHandle
? `/${userHandle}/projects/${projectId}`
: `/projects/${projectId}`;

return (
<Link
    href={projectHref}
    className="group flex flex-col rounded-xl border overflow-hidden transition-all duration-300 w-full hover:border-(--accent-warm)"
    style={{
    backgroundColor: 'var(--bg-surface)',
    borderColor: 'var(--border-subtle)',
    }}
>
    {/* Fixed Aspect Ratio Media Container */}
    <div className="relative aspect-16/10 w-full bg-black/20 overflow-hidden shrink-0">
    <CardMediaPreview project={project} />

    {categoryName && (
        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-medium text-white border border-white/10 z-10">
        {categoryName}
        </span>
    )}
    </div>

    {/* Meta Content */}
    <div className="p-3 flex-1 flex flex-col justify-between space-y-1">
    <div>
        <div className="flex items-center justify-between gap-2">
        <h3 
            className="text-xs md:text-sm font-bold transition-colors line-clamp-1 group-hover:text-(--accent-warm)"
            style={{ color: 'var(--text-primary)' }}
        >
            {project.title}
        </h3>
        <ArrowUpRight 
            className="w-3.5 h-3.5 transition-colors shrink-0 group-hover:text-(--accent-warm)"
            style={{ color: 'var(--text-secondary)' }} 
        />
        </div>

        {project.description && (
        <p 
            className="text-[11px] line-clamp-2 leading-tight mt-1"
            style={{ color: 'var(--text-secondary)' }}
        >
            {project.description}
        </p>
        )}
    </div>
    </div>
</Link>
);
}
