'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Camera, User, X } from 'lucide-react';

export default function AvatarUpload({ value, onChange, disabled = false }) {
const [preview, setPreview] = useState(value || '');
const fileInputRef = useRef(null);

const handleCircleClick = () => {
if (disabled) return;
fileInputRef.current?.click();
};

const handleFileChange = (e) => {
const file = e.target.files?.[0];
if (!file) return;

const previewUrl = URL.createObjectURL(file);
setPreview(previewUrl);

if (onChange) {
    onChange(file);
}
};

const handleClear = (e) => {
e.stopPropagation();
setPreview('');
if (fileInputRef.current) fileInputRef.current.value = '';
if (onChange) onChange(null);
};

return (
<div className="flex flex-col items-center justify-center space-y-3">
    <div 
    onClick={handleCircleClick}
    className="relative w-24 h-24 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden group cursor-pointer transition-colors"
    style={{
        backgroundColor: 'var(--bg-main)',
        borderColor: 'var(--border-subtle)',
    }}
    >
    {preview ? (
        <>
        <Image
            src={preview}
            alt="Avatar Preview"
            fill
            className="object-cover"
        />
        <button
            type="button"
            onClick={handleClear}
            disabled={disabled}
            className="absolute top-1 right-1 p-1 rounded-full bg-black/70 text-white hover:bg-black transition-colors z-20"
            title="Remove image"
        >
            <X className="w-3.5 h-3.5" />
        </button>
        </>
    ) : (
        <div 
        className="flex flex-col items-center justify-center transition-colors pointer-events-none"
        style={{ color: 'var(--text-secondary)' }}
        >
        <User className="w-8 h-8 mb-1 opacity-70" />
        <span className="text-[10px] font-medium uppercase tracking-wider">Photo</span>
        </div>
    )}

    {/* Hidden File Input */}
    <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
    />

    {/* Hover Overlay */}
    {!preview && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <Camera className="w-5 h-5 text-white" />
        </div>
    )}
    </div>

    <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>
    Upload your profile picture (Optional)
    </p>
</div>
);
}