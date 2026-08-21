'use client';

import React, { useState } from 'react';
import { Sparkles, Film, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import ProjectActionsMenu from '@/components/projects/ProjectActionsMenu';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

export default function ProjectTable({ projects = [], handle, onEdit, onDelete, onToggleFeatured }) {
const [projectToDelete, setProjectToDelete] = useState(null);

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

const handleConfirmDelete = () => {
if (projectToDelete) {
    onDelete(projectToDelete._id);
    setProjectToDelete(null);
}
};

return (
<>
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

                <td className="px-6 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>
                {project.title}
                </td>

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

                <td className="px-6 py-3 text-right">
                <div className="flex items-center justify-end">
                    <ProjectActionsMenu
                    projectId={project._id}
                    handle={handle}
                    onEdit={() => onEdit(project)}
                    onDelete={() => setProjectToDelete(project)}
                    />
                </div>
                </td>
            </tr>
            );
        })}
        </tbody>
    </table>
    </div>

    {/* Delete Confirmation Modal */}
    <Modal
    isOpen={Boolean(projectToDelete)}
    onClose={() => setProjectToDelete(null)}
    title="Delete Project"
    >
    <div className="space-y-4">
        <div className="flex items-start gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs">
        <AlertTriangle className="w-5 h-5 shrink-0" />
        <p>
            Are you sure you want to delete <span className="font-semibold text-red-600">&quot;{projectToDelete?.title}&quot;</span>? This action cannot be undone.
        </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <button
            type="button"
            onClick={() => setProjectToDelete(null)}
            className="px-4 py-2 rounded-xl text-xs font-medium border transition-colors"
            style={{
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-secondary)',
            }}
        >
            Cancel
        </button>
        <Button
            type="button"
            onClick={handleConfirmDelete}
            className="px-4 py-2 rounded-xl text-xs font-medium bg-red-600 hover:bg-red-700 text-white transition-colors"
        >
            Delete Project
        </Button>
        </div>
    </div>
    </Modal>
</>
);
}