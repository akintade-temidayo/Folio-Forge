'use client';

import React from 'react';
import { GraduationsCap, Calendar, Award, Pencil, Trash2, Building2 } from 'lucide-react';

export default function EducationCard({ item, onEdit, onDelete }) {
return (
    <div
    className="p-5 rounded-2xl border transition-all hover:border-white/20 shadow-xs flex flex-col justify-between gap-4"
    style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
    }}
    >
    <div className="space-y-3">
        {/* Card Header: Degree & Action Buttons */}
        <div className="flex items-start justify-between gap-4">
        <div>
            <h4
            className="text-lg font-semibold leading-snug"
            style={{ color: 'var(--text-primary)' }}
            >
            {item.degree}
            </h4>
            {item.fieldOfStudy && (
            <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--accent-warm)' }}>
                {item.fieldOfStudy}
            </p>
            )}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1.5 shrink-0">
            <button
            onClick={() => onEdit(item)}
            className="p-2 rounded-lg border transition-all hover:bg-white/5 cursor-pointer"
            style={{
                backgroundColor: 'var(--bg-main)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-secondary)',
            }}
            title="Edit Education"
            >
            <Pencil className="w-4 h-4" />
            </button>

            <button
            onClick={() => onDelete(item._id)}
            className="p-2 rounded-lg border transition-all hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 cursor-pointer"
            style={{
                backgroundColor: 'var(--bg-main)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-secondary)',
            }}
            title="Delete Education"
            >
            <Trash2 className="w-4 h-4" />
            </button>
        </div>
        </div>

        {/* Metadata Badges Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
        {/* Institution */}
        <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-medium"
            style={{
            backgroundColor: 'var(--bg-main)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-primary)',
            }}
        >
            <Building2 className="w-3.5 h-3.5" style={{ color: 'var(--accent-warm)' }} />
            <span>{item.institution}</span>
        </div>

        {/* Date Range Badge */}
        <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-medium"
            style={{
            backgroundColor: 'var(--bg-main)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-secondary)',
            }}
        >
            <Calendar className="w-3.5 h-3.5 text-(--text-secondary)" />
            <span>
            {item.startDate} – {item.endDate}
            </span>
        </div>

        {/* Optional Grade / GPA Pill */}
        {item.grade && (
            <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-medium"
            style={{
                backgroundColor: 'var(--bg-main)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--accent-warm)',
            }}
            >
            <Award className="w-3.5 h-3.5" />
            <span>{item.grade}</span>
            </div>
        )}
        </div>

        {/* Description Body */}
        {item.description && (
        <p
            className="text-xs leading-relaxed pt-1"
            style={{ color: 'var(--text-secondary)' }}
        >
            {item.description}
        </p>
        )}
    </div>
    </div>
);
}