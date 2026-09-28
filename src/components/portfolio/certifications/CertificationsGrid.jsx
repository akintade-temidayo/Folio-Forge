'use client';

import React from 'react';
import { Award, ExternalLink, Calendar, FileText, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

const isPdfUrl = (url) => {
    if (!url) return false;
    return url.split('?')[0].toLowerCase().endsWith('.pdf');
};

export default function CertificationsGrid({ certifications = [], userName = 'Creator', loading = false }) {
{/* Skeleton Loading State */}
if (loading) {
    return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
        <div
            key={i}
            className="rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-6 space-y-4 animate-pulse"
        >
            <div className="h-5 bg-white/5 rounded w-1/3" />
            <div className="h-6 bg-white/5 rounded w-2/3" />
            <div className="h-10 bg-white/5 rounded w-full" />
        </div>
        ))}
    </div>
    );
}

{/* Empty State */}
if (certifications.length === 0) {
    return (
    <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl border border-dashed border-(--border-subtle) bg-(--bg-surface) text-center space-y-3">
        <Award className="w-12 h-12 text-(--text-secondary) stroke-[1.5]" />
        <h3 className="text-base font-semibold text-(--text-primary)">
        No Certifications Listed
        </h3>
        <p className="text-xs text-(--text-secondary) max-w-sm">
        {userName} hasn&apos;t published any verified certifications or licenses yet.
        </p>
    </div>
    );
}

{/* Certifications Grid */}
return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {certifications.map((item) => {
        const certificateUrl = item.fileUrl || item.credentialUrl || item.link;
        const isPdf = isPdfUrl(certificateUrl);

        return (
        <div
        key={item._id}
        className="rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-6 shadow-sm hover:border-(--accent-warm)/40 transition-all flex flex-col justify-between space-y-4 group"
        >
        <div className="space-y-3">
            {/* Issuing Organization & Date */}
            <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold text-(--accent-warm) uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                {item.issuingOrganization || item.issuer}
            </span>
            {(item.issueDate || item.date) && (
                <div className="inline-flex items-center gap-1 text-xs text-(--text-secondary)">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                    {item.issueDate || item.date}
                    {item.expirationDate ? ` – ${item.expirationDate}` : ''}
                </span>
                </div>
            )}
            </div>

            {/* Title */}
            <h2 className="text-lg font-bold text-(--text-primary) group-hover:text-(--accent-warm) transition-colors">
            {item.title || item.name}
            </h2>

            {/* Credential ID / Description */}
            {item.credentialId && (
            <p className="text-xs font-mono text-(--text-secondary) bg-(--bg-main) px-2.5 py-1 rounded border border-(--border-subtle) inline-block">
                ID: {item.credentialId}
            </p>
            )}

            {item.description && (
            <p className="text-xs text-(--text-secondary) leading-relaxed line-clamp-3">
                {item.description}
            </p>
            )}

            {certificateUrl && (
            <a
                href={certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block h-44 overflow-hidden rounded-xl border border-(--border-subtle) bg-(--bg-main)"
                title={`View ${item.title || item.name} certificate`}
            >
                {isPdf ? (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-xs font-medium text-(--text-secondary)">
                    <FileText className="h-9 w-9 text-(--accent-warm)" />
                    <span>PDF certificate attached</span>
                    <span className="inline-flex items-center gap-1 text-(--accent-warm)">Open document <ExternalLink className="h-3.5 w-3.5" /></span>
                </div>
                ) : (
                <Image
                    src={certificateUrl}
                    alt={`${item.title || item.name} certificate`}
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(event) => {
                        event.currentTarget.style.display = 'none';
                        event.currentTarget.nextElementSibling.classList.remove('hidden');
                    }}
                />
                )}
                {!isPdf && (
                <div className="hidden absolute inset-0 flex-col items-center justify-center gap-2 text-xs font-medium text-(--text-secondary)">
                    <FileText className="h-8 w-8 text-(--accent-warm)" />
                    <span>Certificate file attached</span>
                </div>
                )}
            </a>
            )}
        </div>

        {/* Verification Link Button */}
        {certificateUrl && (
            <div className="pt-3 border-t border-(--border-subtle)">
            <a
                href={certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-(--accent-warm) hover:underline"
            >
                <span>View Certificate</span>
                <ExternalLink className="w-3.5 h-3.5" />
            </a>
            </div>
        )}
        </div>
        );
    })}
    </div>
);
}
