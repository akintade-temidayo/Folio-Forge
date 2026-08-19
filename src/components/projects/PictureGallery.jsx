'use client';

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PictureGallery({ images = [], title }) {
const [activeIndex, setActiveIndex] = useState(null);

if (!images || images.length === 0) return null;

const openLightbox = (index) => setActiveIndex(index);
const closeLightbox = () => setActiveIndex(null);

const showNext = (e) => {
e.stopPropagation();
setActiveIndex((prev) => (prev + 1) % images.length);
};

const showPrev = (e) => {
e.stopPropagation();
setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
};

return (
<>
    {/* Thumbnail grid — modest size, preserves aspect ratio, no distortion */}
    <div
    className={`grid gap-3 ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-2'}`}
    >
    {images.map((url, i) => (
        <button
        key={url}
        type="button"
        onClick={() => openLightbox(i)}
        className="relative rounded-xl overflow-hidden border cursor-zoom-in transition-transform hover:scale-[1.01]"
        style={{ borderColor: '#38322c', backgroundColor: '#26221f', maxHeight: '280px' }}
        >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
            src={url}
            alt={`${title || 'Project'} image ${i + 1}`}
            className="w-full h-full object-contain"
            style={{ maxHeight: '280px' }}
        />
        </button>
    ))}
    </div>

    {/* Lightbox */}
    {activeIndex !== null && (
    <div
        className="fixed inset-0 z-100 bg-black/90 flex items-center justify-center p-4"
        onClick={closeLightbox}
    >
        <button
        type="button"
        onClick={closeLightbox}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
        <X className="w-5 h-5 text-white" />
        </button>

        {images.length > 1 && (
        <>
            <button
            type="button"
            onClick={showPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
            <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
            type="button"
            onClick={showNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
            <ChevronRight className="w-6 h-6 text-white" />
            </button>
        </>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
        src={images[activeIndex]}
        alt={`${title || 'Project'} full view`}
        className="max-w-full max-h-full object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
        />

        {images.length > 1 && (
        <span className="absolute bottom-4 text-xs text-white/70">
            {activeIndex + 1} / {images.length}
        </span>
        )}
    </div>
    )}
</>
);
}