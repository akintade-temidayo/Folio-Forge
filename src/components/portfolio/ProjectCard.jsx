//prject card
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Film, ArrowUpRight } from 'lucide-react';

// Renders either Video or Picture depending on project data.
// Exported so other components (e.g. RelatedProjects) can reuse the exact
// same media-resolution logic instead of re-implementing it.
export function CardMediaPreview({ project, priority = false }) {
const isPicture = project?.projectType === 'picture';
// previewClip takes priority — it's the field the backend actually sets
// on save (previewClip: previewClip || videoUrl), so it's the most
// reliable source, matching ProjectTable/ReorderableList elsewhere.
const videoUrl = project?.previewClip || project?.videoUrl || project?.previewVideoUrl;
const imageSrc =

project?.images?.[0] ||
project?.coverImage ||
project?.thumbnail ||
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
<div className="absolute inset-0 flex flex-col items-center justify-center text-(--text-secondary) p-4 text-center">
    <Film className="w-6 h-6 opacity-40 mb-1" />
    <span className="text-[10px] font-medium opacity-60">No Media</span>
</div>
);
}

export default function ProjectCard({ project, handle, priority = false }) {
if (!project) return null;

const projectId = project._id || project.id;
const categoryName = project.category?.name || '';

// Get handle from props, OR fallback to extracting it from the current URL if rendered client-side
let userHandle = String(handle || '').replace(/^\/+|\/+$/g, '');

if (!userHandle && typeof window !== 'undefined') {
// Extracts "name" from "http://localhost:3000/name"
userHandle = window.location.pathname.split('/')[1] || '';
}

// Construct valid dynamic route: /name/projects/123456
const projectHref = userHandle
? `/${userHandle}/projects/${projectId}`
: `/projects/${projectId}`;
return (
<Link
    href={projectHref}
    className="group flex flex-col rounded-xl bg-(--bg-surface) border border-(--border-subtle) overflow-hidden hover:border-(--accent-warm) transition-all duration-300 w-full"
>
    {/* Fixed Aspect Ratio Media Container */}
    <div className="relative aspect-16/10 w-full bg-black/20 overflow-hidden shrink-0">
    <CardMediaPreview project={project} priority={priority} />

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
        <h3 className="text-xs md:text-sm font-bold text-(--text-primary) group-hover:text-(--accent-warm) transition-colors line-clamp-1">
            {project.title}
        </h3>
        <ArrowUpRight className="w-3.5 h-3.5 text-(--text-secondary) group-hover:text-(--accent-warm) transition-colors shrink-0" />
        </div>

        {project.description && (
        <p className="text-[11px] text-(--text-secondary) line-clamp-2 leading-tight mt-1">
            {project.description}
        </p>
        )}
    </div>
    </div>
</Link>
);
}
