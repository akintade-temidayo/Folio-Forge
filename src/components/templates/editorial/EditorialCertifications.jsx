'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Award, ArrowRight, ExternalLink, FileText } from 'lucide-react';

const isPdfUrl = (url) => {
if (!url) return false;
return url.split('?')[0].toLowerCase().endsWith('.pdf');
};

export default function EditorialCertifications({ certifications = [], userHandle = '' }) {
if (!certifications || certifications.length === 0) return null;

const displayedCertifications = certifications.slice(0, 2);
const certificationsHref = userHandle ? `/${userHandle}/certifications` : '/certifications';

return (
    <section className="space-y-8">
    {/* Header */}
    <div className="flex items-center justify-between border-b border-(--border-subtle) pb-4">
        <div className="flex items-center gap-2">
        <Award className="w-4 h-4 text-(--accent-warm)" />
        <h2 className="text-xs font-bold uppercase tracking-widest text-(--text-secondary)">
            Certifications & Credentials
        </h2>
        </div>

        <Link
        href={certificationsHref}
        className="text-xs font-semibold hover:text-(--accent-warm) transition-colors flex items-center gap-1 text-(--text-secondary)"
        >
        <span>See All ({certifications.length})</span>
        <ArrowRight className="w-3.5 h-3.5" />
        </Link>
    </div>

    {/* Editorial Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedCertifications.map((item, index) => {
        const itemNumber = String(index + 1).padStart(2, '0');
        const certUrl = item.fileUrl || item.credentialUrl || item.link;
        const isPdf = isPdfUrl(certUrl);
        const issueDate = item.issueDate || item.date || '';

        return (
            <div
            key={item._id || item.id || index}
            className="rounded-3xl p-6 border flex flex-col justify-between space-y-5 transition-all duration-300 hover:border-(--accent-warm)/50"
            style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
            }}
            >
            <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                <span className="text-xl font-serif font-black text-(--accent-warm) opacity-80">
                    {itemNumber}
                </span>
                {issueDate && (
                    <span className="text-xs font-mono text-(--text-secondary) px-2.5 py-0.5 rounded-full border border-(--border-subtle) bg-(--bg-main)">
                    {issueDate}
                    </span>
                )}
                </div>

                <div>
                <h3
                    className="text-lg font-serif font-bold"
                    style={{ color: 'var(--text-primary)' }}
                >
                    {item.title || item.name}
                </h3>
                {(item.issuingOrganization || item.issuer) && (
                    <p
                    className="text-xs font-semibold mt-1"
                    style={{ color: 'var(--accent-warm)' }}
                    >
                    {item.issuingOrganization || item.issuer}
                    </p>
                )}
                </div>

                {certUrl && (
                <a
                    href={certUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block h-36 overflow-hidden rounded-2xl border border-(--border-subtle) bg-(--bg-main) group"
                >
                    {isPdf ? (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-xs font-medium text-(--text-secondary)">
                        <FileText className="h-7 w-7 text-(--accent-warm)" />
                        <span>PDF Document</span>
                    </div>
                    ) : (
                    <Image
                        src={certUrl}
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
                    <div className="hidden absolute inset-0 flex-col items-center justify-center gap-2 text-xs font-medium text-(--text-secondary)">
                        <FileText className="h-7 w-7 text-(--accent-warm)" />
                        <span>View Document</span>
                    </div>
                    )}
                </a>
                )}
            </div>

            {certUrl && (
                <div className="pt-2 border-t border-(--border-subtle)">
                <a
                    href={certUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-(--accent-warm) hover:underline"
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
    </section>
);
}