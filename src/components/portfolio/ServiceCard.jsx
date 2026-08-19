'use client';

import React from 'react';
import { Video, Film, Sparkles, Clapperboard, Camera, CheckCircle2, ArrowUpRight } from 'lucide-react';

// Icon map helper matching backend options
const ICON_MAP = {
Video: Video,
Film: Film,
Sparkles: Sparkles,
Clapperboard: Clapperboard,
Camera: Camera,
};

export default function ServiceCard({ service, onClick }) {
if (!service) return null;

const IconComponent = ICON_MAP[service.icon] || Video;
const categoryName = service.category?.name || '';

// Format price display matching backend minPrice & maxPrice
const formatPrice = () => {
if (service.price) return service.price; // Fallback string if provided

const min = service.minPrice ? `₦${Number(service.minPrice).toLocaleString()}` : '';
const max = service.maxPrice ? `₦${Number(service.maxPrice).toLocaleString()}` : '';

if (min && max) return `${min} – ${max}`;
if (min) return `From ${min}`;
if (max) return `Up to ${max}`;
return null;
};

const formattedPrice = formatPrice();

return (
<div
    onClick={onClick}
    className="group cursor-pointer rounded-xl bg-(--bg-surface) border border-(--border-subtle) p-5 flex flex-col justify-between space-y-4 hover:border-(--accent-warm) transition-all duration-300 shadow-xs"
>
    <div className="space-y-3">
    {/* Top bar: Icon & Category */}
    <div className="flex items-center justify-between gap-2">
        <div className="w-9 h-9 rounded-lg bg-(--accent-warm)/10 flex items-center justify-center text-(--accent-warm)">
        <IconComponent className="w-5 h-5" />
        </div>
        {categoryName && (
        <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-(--border-subtle)/30 text-(--text-secondary) border border-(--border-subtle)">
            {categoryName}
        </span>
        )}
    </div>

    {/* Title */}
    <h3 className="text-base font-bold text-(--text-primary) group-hover:text-(--accent-warm) transition-colors">
        {service.title}
    </h3>

    {/* Description preview */}
    {service.description && (
        <p className="text-xs text-(--text-secondary) leading-relaxed line-clamp-3">
        {service.description}
        </p>
    )}
    </div>

    {/* Footer: Price Range & Interactive Callout */}
    <div className="flex items-center justify-between pt-3 border-t border-(--border-subtle) text-xs">
    <div>
        {formattedPrice && (
        <span className="text-xs font-bold text-(--text-primary)">
            {formattedPrice}
        </span>
        )}
    </div>

    <span className="inline-flex items-center gap-1 text-xs font-bold text-(--accent-warm) group-hover:underline">
        <span>View Details</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
    </span>
    </div>
</div>
);
}