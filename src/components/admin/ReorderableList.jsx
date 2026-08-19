'use client';

import React, { useState } from 'react';
import { Sparkles, GripVertical, Film } from 'lucide-react';
import Image from 'next/image';
import ProjectActionsMenu from '@/components/projects/ProjectActionsMenu';

export default function ReorderableList({ projects = [], onEdit, onDelete, onToggleFeatured, onReorder }) {
const [items, setItems] = useState(projects);

const [prevProjects, setPrevProjects] = useState(projects);
if (projects !== prevProjects) {
setPrevProjects(projects);
setItems(projects);
}

const handleDragStart = (e, index) => {
e.dataTransfer.setData('text/plain', index);
};

const handleDrop = (e, dropIndex) => {
e.preventDefault();
const dragIndex = Number(e.dataTransfer.getData('text/plain'));
if (dragIndex === dropIndex) return;

const newItems = [...items];
const [draggedItem] = newItems.splice(dragIndex, 1);
newItems.splice(dropIndex, 0, draggedItem);

setItems(newItems);
if (onReorder) {
    onReorder(newItems.map((item, idx) => ({ _id: item._id, order: idx })));
}
};

const handleDragOver = (e) => {
e.preventDefault();
};

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
<div className="space-y-3">
    {items.map((project, index) => {
    // Priority fallback ensures videoUrl/imageUrl is picked up if previewClip or thumbnailUrl aren't set
    const mediaUrl = project.previewClip || project.videoUrl || project.images?.[0] || project.thumbnailUrl || project.previewVideoUrl;
    const categoryName = project.category?.name || project.category || 'Uncategorized';

    return (
        <div
        key={project._id}
        draggable
        onDragStart={(e) => handleDragStart(e, index)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, index)}
        className="flex items-center justify-between p-4 border rounded-xl transition-colors cursor-move group gap-3"
        style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
        }}
        >
        <div className="flex items-center gap-4 min-w-0">
            <GripVertical className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity shrink-0" style={{ color: 'var(--text-secondary)' }} />
            
            <div 
            className="relative w-16 h-10 rounded-md overflow-hidden shrink-0 border flex items-center justify-center"
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
                    alt={project.title || 'Project preview'}
                    fill
                    sizes="64px"
                    className="object-cover"
                />
                )
            ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ color: 'var(--text-secondary)' }}>
                <Film className="w-4 h-4" />
                </div>
            )}
            </div>

            <div className="min-w-0">
            <h4 className="font-medium text-sm truncate" style={{ color: 'var(--text-primary)' }}>{project.title}</h4>
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{categoryName}</span>
            </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
            <button
            onClick={() => onToggleFeatured(project._id, !project.isFeatured)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all"
            style={{
                backgroundColor: project.isFeatured ? 'rgba(236, 72, 153, 0.1)' : 'var(--bg-main)',
                borderColor: project.isFeatured ? 'var(--accent-warm)' : 'var(--border-subtle)',
                color: project.isFeatured ? 'var(--accent-warm)' : 'var(--text-secondary)',
            }}
            >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{project.isFeatured ? 'Featured' : 'Feature'}</span>
            </button>

            {/* View/Edit/Delete collapsed into a single dropdown menu */}
            <ProjectActionsMenu
            projectId={project._id}
            onEdit={() => onEdit(project)}
            onDelete={() => onDelete(project._id)}
            />
        </div>
        </div>
    );
    })}
</div>
);
}