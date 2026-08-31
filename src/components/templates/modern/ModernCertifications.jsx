'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ExternalLink, FileText, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const isPdfUrl = (url) => {
if (!url) return false;
return url.split('?')[0].toLowerCase().endsWith('.pdf');
};

export default function ModernCertifications({ certifications = [], handle = '' }) {
if (!certifications || certifications.length === 0) return null;

const viewAllHref = handle ? `/${handle}/certifications` : '/certifications';

return (
<section id="certifications" className="w-full space-y-6">
    {/* Header Section */}
    <div className="flex items-end justify-between border-b border-(--border-subtle) pb-4">
    <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) tracking-tight">
        Certifications
        </h2>
        <p className="text-xs sm:text-sm text-(--text-secondary) mt-1">
        Verified credentials, licenses, and professional achievements.
        </p>
    </div>
    <Link
        href={viewAllHref}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--accent-warm) hover:underline shrink-0"
    >
        <span>See All ({certifications.length})</span>
        <ArrowRight className="w-3.5 h-3.5" />
    </Link>
    </div>

    {/* Grid Container */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {certifications.map((item) => {
        const certificateUrl = item.fileUrl || item.credentialUrl || item.link;
        const isPdf = isPdfUrl(certificateUrl);

        return (
        <div
            key={item._id}
            className="rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-6 shadow-sm hover:border-(--accent-warm)/40 transition-all flex flex-col justify-between space-y-4 group"
        >
            <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-(--accent-warm) uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                {item.issuingOrganization || item.issuer}
                </span>
                {(item.issueDate || item.date) && (
                <span className="text-xs text-(--text-secondary)">
                    {item.issueDate || item.date}
                </span>
                )}
            </div>

            <h3 className="text-base font-bold text-(--text-primary) group-hover:text-(--accent-warm) transition-colors">
                {item.title || item.name}
            </h3>

            {certificateUrl && (
                <a
                href={certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block h-36 overflow-hidden rounded-xl border border-(--border-subtle) bg-(--bg-main)"
                >
                {isPdf ? (
                    <div className="flex h-full flex-col items-center justify-center gap-1.5 text-xs font-medium text-(--text-secondary)">
                    <FileText className="h-8 w-8 text-(--accent-warm)" />
                    <span>PDF document attached</span>
                    </div>
                ) : (
                    <Image
                    src={certificateUrl}
                    alt={`${item.title || item.name} preview`}
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                    />
                )}
                {!isPdf && (
                    <div className="hidden absolute inset-0 flex-col items-center justify-center gap-1.5 text-xs font-medium text-(--text-secondary)">
                    <FileText className="h-8 w-8 text-(--accent-warm)" />
                    <span>File preview attached</span>
                    </div>
                )}
                </a>
            )}
            </div>

            {certificateUrl && (
            <div className="pt-3 border-t border-(--border-subtle)">
                <a
                href={certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--accent-warm) hover:underline"
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
</section>
);
}