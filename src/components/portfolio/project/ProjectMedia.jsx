'use client';

import React from 'react';
import PictureGallery from '@/components/projects/PictureGallery';

export default function ProjectMedia({ project }) {
if (!project) return null;

const isPicture = project.projectType === 'picture';
const videoUrl = project.videoUrl || project.previewVideoUrl || project.previewClip;

return (
<div className="w-full my-6">
    {!isPicture && videoUrl ? (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-(--bg-surface) border border-(--border-subtle) shadow-lg">
        {/* YouTube Embed */}
        {videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
        (() => {
            const videoId = videoUrl.includes('youtu.be')
            ? videoUrl.split('/').pop()?.split('?')[0]
            : videoUrl.split('v=')[1]?.split('&')[0];

            return (
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
                title={project.title || 'Project Video'}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
            );
        })()
        ) : videoUrl.includes('vimeo.com') ? (
        /* Vimeo Embed */
        (() => {
            const videoId = videoUrl.split('/').pop()?.split('?')[0];

            return (
            <iframe
                src={`https://player.vimeo.com/video/${videoId}`}
                title={project.title || 'Project Video'}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
            />
            );
        })()
        ) : (
        /* Direct MP4 / Cloudinary / AWS S3 Video */
        <video
            src={videoUrl}
            controls
            playsInline
            className="w-full h-full object-cover"
        />
        )}
    </div>
    ) : (
    /* Picture Type Projects */
    <PictureGallery images={project.images || []} title={project.title} />
    )}
</div>
);
}