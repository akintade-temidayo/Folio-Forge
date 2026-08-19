'use client';

import React from 'react';
import { Video, Image as ImageIcon } from 'lucide-react';

export default function ProjectTypeModal({ onSelect }) {
return (
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <button
    type="button"
    onClick={() => onSelect('video')}
    className="p-6 rounded-2xl border flex flex-col items-center gap-3 text-center transition-colors hover:border-(--accent-warm)"
    style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-subtle)' }}
    >
    <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(200, 131, 70, 0.15)', color: 'var(--accent-warm)' }}>
        <Video className="w-6 h-6" />
    </div>
    <div>
        <h4 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Video Project</h4>
        <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
        Upload a video file or paste a Vimeo/YouTube link
        </p>
    </div>
    </button>

    <button
    type="button"
    onClick={() => onSelect('picture')}
    className="p-6 rounded-2xl border flex flex-col items-center gap-3 text-center transition-colors hover:border-(--accent-warm)"
    style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-subtle)' }}
    >
    <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(200, 131, 70, 0.15)', color: 'var(--accent-warm)' }}>
        <ImageIcon className="w-6 h-6" />
    </div>
    <div>
        <h4 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Picture Project</h4>
        <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
        Upload an image, plus a link to GitHub, a live site, Drive, or Instagram
        </p>
    </div>
    </button>
</div>
);
}