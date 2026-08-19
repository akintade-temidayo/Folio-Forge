'use client';

import { Loader2, UploadCloud, CheckCircle } from 'lucide-react';

export default function VideoUploadField({ videoUrl, onVideoUrlChange, onFileSelect, isUploading }) {
return (
<div>
    <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary, #666059)' }}>
    Main Video File / URL <span className="text-red-400">*</span>
    </label>

    <div className="space-y-2">
    <div
        className="relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors hover:border-[#c88346]"
        style={{ borderColor: 'var(--border-subtle, #e5e0d8)', backgroundColor: 'var(--bg-main, #f5f2eb)' }}
    >
        <input
        type="file"
        accept="video/*"
        disabled={isUploading}
        onChange={(e) => onFileSelect(e.target.files[0])}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        <div className="flex flex-col items-center justify-center gap-1">
        {isUploading ? (
            <Loader2 className="w-6 h-6 animate-spin text-[#c88346]" />
        ) : videoUrl ? (
            <CheckCircle className="w-6 h-6 text-emerald-500" />
        ) : (
            <UploadCloud className="w-6 h-6 text-[#c88346]" />
        )}
        <p className="text-xs font-medium" style={{ color: 'var(--text-primary, #1a1918)' }}>
            {isUploading ? 'Uploading video...' : videoUrl ? 'Video Attached / Ready' : 'Click or Drag & Drop MP4 Video File'}
        </p>
        <p className="text-[10px]" style={{ color: 'var(--text-secondary, #666059)' }}>
            Supports MP4, MOV, WebM
        </p>
        </div>
    </div>

    <input
        type="text"
        placeholder="Or paste direct URL (Vimeo, YouTube, Cloudinary MP4)..."
        value={videoUrl}
        onChange={(e) => onVideoUrlChange(e.target.value)}
        className="w-full px-3.5 py-2 rounded-xl text-xs border focus:outline-none transition-colors"
        style={{
        backgroundColor: 'var(--bg-main, #f5f2eb)',
        borderColor: 'var(--border-subtle, #e5e0d8)',
        color: 'var(--text-primary, #1a1918)',
        }}
    />
    </div>
</div>
);
}