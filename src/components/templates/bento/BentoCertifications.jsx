'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, ExternalLink, ArrowRight, FileText } from 'lucide-react';

const isPdfUrl = (url) => {
if (!url) return false;
return url.split('?')[0].toLowerCase().endsWith('.pdf');
};

export default function BentoCertifications({ certifications = [], userHandle = '' }) {
if (!certifications || certifications.length === 0) return null;

let handle = userHandle;
if (!handle && typeof window !== 'undefined') {
    handle = window.location.pathname.split('/')[1] || '';
}

const certificationsHref = handle ? `/${handle}/certifications` : '/certifications';
const displayedCertifications = certifications.slice(0, 4);

return (
    <section id="certifications" className="space-y-4">
    {/* Section Header */}
    <div className="flex items-center justify-between pb-1">
        <h2
        className="text-xs font-bold uppercase tracking-widest flex items-center gap-2"
        style={{ color: 'var(--text-secondary)' }}
        >
        <ShieldCheck className="w-4 h-4" style={{ color: 'var(--accent-warm)' }} />
        <span>Certifications</span>
        </h2>
    </div>

    {/* Bento Grid (Up to 4 Items) */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedCertifications.map((item, idx) => {
        const certificateUrl = item.fileUrl || item.credentialUrl || item.link;
        const isPdf = isPdfUrl(certificateUrl);
        const issueDate = item.issueDate || item.date || '';

        return (
            <div
            key={item._id || item.id || idx}
            className="group rounded-2xl p-5 border flex flex-col justify-between space-y-4 transition-all duration-300 hover:border-(--accent-warm)/50"
            style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
            }}
            >
            <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                <span
                    className="text-[11px] font-bold uppercase tracking-wider"
                    style={{ color: 'var(--accent-warm)' }}
                >
                    {item.issuingOrganization || item.issuer || 'Credential'}
                </span>

                {issueDate && (
                    <span
                    className="text-[10px] font-mono"
                    style={{ color: 'var(--text-secondary)' }}
                    >
                    {issueDate}
                    </span>
                )}
                </div>

                <h3
                className="text-sm font-bold transition-colors group-hover:text-(--accent-warm)"
                style={{ color: 'var(--text-primary)' }}
                >
                {item.title || item.name}
                </h3>

                {certificateUrl && (
                <a
                    href={certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block h-32 overflow-hidden rounded-xl border border-(--border-subtle) bg-(--bg-main)"
                >
                    {isPdf ? (
                    <div className="flex h-full flex-col items-center justify-center gap-1.5 text-xs font-medium text-(--text-secondary)">
                        <FileText className="h-6 w-6 text-(--accent-warm)" />
                        <span>PDF Document</span>
                    </div>
                    ) : (
                    <Image
                        src={certificateUrl}
                        alt={`${item.title || item.name} preview`}
                        fill
                        sizes="(max-width: 767px) 100vw, 50vw"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                    />
                    )}
                    {!isPdf && (
                    <div className="hidden absolute inset-0 flex-col items-center justify-center gap-1.5 text-xs font-medium text-(--text-secondary)">
                        <FileText className="h-6 w-6 text-(--accent-warm)" />
                        <span>View Preview</span>
                    </div>
                    )}
                </a>
                )}
            </div>

            {certificateUrl && (
                <div className="pt-2 border-t border-(--border-subtle)">
                <a
                    href={certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--accent-warm) hover:underline"
                >
                    <span>View Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                </a>
                </div>
            )}
            </div>
        );
        })}
    </div>

    {/* Footer Link: View All Certifications */}
    <div className="pt-2 flex justify-end">
        <Link
        href={certificationsHref}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all hover:underline"
        style={{ color: 'var(--accent-warm)' }}
        >
        <span>View All Certifications ({certifications.length})</span>
        <ArrowRight className="w-3.5 h-3.5" />
        </Link>
    </div>
    </section>
);
}