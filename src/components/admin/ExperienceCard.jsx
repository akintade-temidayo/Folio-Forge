'use client';

import React from 'react';
import { Building2, Calendar, MapPin, Pencil, Trash2, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ExperienceCard({
experience,
onEdit,
onDelete,
isDeleting = false,
}) {
const { _id, role, company, location, period, description } = experience;

return (
<div className="rounded-xl bg-(--bg-surface) border border-(--border-subtle) p-5 space-y-3 hover:border-(--accent-warm)/40 transition-colors">
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-(--border-subtle) pb-3">
    <div className="space-y-1">
        <h3 className="text-base font-bold text-(--text-primary)">
        {role}
        </h3>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-(--text-secondary)">
        <span className="flex items-center gap-1.5 font-medium text-(--accent-warm)">
            <Building2 className="w-3.5 h-3.5" />
            {company}
        </span>

        {location && (
            <span className="flex items-center gap-1 text-(--text-secondary)">
            <MapPin className="w-3.5 h-3.5" />
            {location}
            </span>
        )}

        <span className="flex items-center gap-1 font-mono text-[11px] bg-(--bg-main) px-2 py-0.5 rounded border border-(--border-subtle)">
            <Calendar className="w-3 h-3 text-(--accent-warm)" />
            {period}
        </span>
        </div>
    </div>

    {/* Card Action Buttons */}
    <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
        <Button
        variant="outline"
        onClick={() => onEdit(experience)}
        className="p-2 h-auto"
        title="Edit Experience"
        >
        <Pencil className="w-3.5 h-3.5 text-(--text-secondary)" />
        </Button>

        <Button
        variant="outline"
        onClick={() => onDelete(_id)}
        disabled={isDeleting}
        className="p-2 h-auto text-red-400 hover:bg-red-500/10 border-(--border-subtle) hover:border-red-500/30"
        title="Delete Experience"
        >
        {isDeleting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
            <Trash2 className="w-3.5 h-3.5" />
        )}
        </Button>
    </div>
    </div>

    {/* Description */}
    {description && (
    <p className="text-xs text-(--text-secondary) leading-relaxed whitespace-pre-line">
        {description}
    </p>
    )}
</div>
);
}