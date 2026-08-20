'use client';

import React from 'react';
import { Sparkles, Film } from 'lucide-react';
import Image from 'next/image';
import ProjectActionsMenu from '@/components/projects/ProjectActionsMenu';

export default function ProjectTable({ projects = [], handle, onEdit, onDelete, onToggleFeatured }) {
const isVideoUrl = (url = '') => {
if (!url) return false;
const lower = url.toLowerCase();
return (
    lower.endsWith('.mp4') ||
    lower.endsWith('.webm') ||
    lower.endsWith('.mov') ||
    lower.endsWith('.m4v') ||
    lower.includes('/video/upload/') ||
    lower.includes('cloudinary.com')
);
};

return (
<div 
    className="w-full overflow-x-auto rounded-xl border transition-colors"
    style={{
    backgroundColor: 'var(--bg-surface)',
    borderColor: 'var(--border-subtle)',
    }}
>
    <table className="w-full text-left text-sm" style={{ color: 'var(--text-secondary)' }}>
    <thead 
        className="text-xs uppercase tracking-wider border-b transition-colors"
        style={{
        backgroundColor: 'var(--bg-main)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-secondary)',
        }}
    >
        <tr>
        <th className="px-6 py-4">Thumbnail</th>
        <th className="px-6 py-4">Title</th>
        <th className="px-6 py-4">Category</th>
        <th className="px-6 py-4">Featured</th>
        <th className="px-6 py-4 text-right">Actions</th>
        </tr>
    </thead>
    <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
        {projects.map((project) => {
        // Priority fallback ensures videoUrl/imageUrl is picked up if previewClip or thumbnailUrl aren't set
        const mediaUrl = project.previewClip || project.videoUrl || project.images?.[0] || project.thumbnailUrl || project.previewVideoUrl;
        const categoryName = project.category?.name || project.category || 'Uncategorized';

        return (
            <tr 
            key={project._id} 
            className="transition-colors"
            style={{
                borderBottomColor: 'var(--border-subtle)',
            }}
            >
            {/* Media Thumbnail Cell */}
            <td className="px-6 py-3">
                <div 
                className="relative w-14 h-9 rounded overflow-hidden border flex items-center justify-center"
                style={{
                    backgroundColor: 'var(--bg-main)',
                    borderColor: 'var(--border-subtle)',
                }}
                >
                {mediaUrl ? (
                    isVideoUrl(mediaUrl) ? (
                    <video
                        src={mediaUrl}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                        autoPlay
                        loop
                    />
                    ) : (
                    <Image
                        src={mediaUrl}
                        alt={project.title || 'Project thumbnail'}
                        fill
                        sizes="56px"
                        className="object-cover"
                    />
                    )
                ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ color: 'var(--text-secondary)' }}>
                    <Film className="w-3.5 h-3.5" />
                    </div>
                )}
                </div>
            </td>

            {/* Title Cell */}
            <td className="px-6 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>
                {project.title}
            </td>

            {/* Category Cell */}
            <td className="px-6 py-3">
                <span 
                className="px-2.5 py-1 rounded-full text-xs border"
                style={{
                    backgroundColor: 'var(--bg-main)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-secondary)',
                }}
                >
                {categoryName}
                </span>
            </td>

            {/* Featured Toggle Cell */}
            <td className="px-6 py-3">
                <button
                onClick={() => onToggleFeatured(project._id, !project.isFeatured)}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border transition-colors"
                style={{
                    backgroundColor: project.isFeatured ? 'rgba(236, 72, 153, 0.1)' : 'transparent',
                    borderColor: project.isFeatured ? 'var(--accent-warm)' : 'var(--border-subtle)',
                    color: project.isFeatured ? 'var(--accent-warm)' : 'var(--text-secondary)',
                }}
                >
                <Sparkles className="w-3 h-3" />
                <span>{project.isFeatured ? 'Yes' : 'No'}</span>
                </button>
            </td>

            {/* Action Buttons Cell — collapsed into a single dropdown menu */}
            <td className="px-6 py-3 text-right">
                <div className="flex items-center justify-end">
                <ProjectActionsMenu
                    projectId={project._id}
                    handle={handle}
                    onEdit={() => onEdit(project)}
                    onDelete={() => onDelete(project._id)}
                />
                </div>
            </td>
            </tr>
        );
        })}
    </tbody>
    </table>
</div>
);
}
