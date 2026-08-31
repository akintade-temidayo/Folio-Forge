'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';

export default function MinimalCertifications({ certifications = [], userHandle = '' }) {
if (!certifications || certifications.length === 0) return null;

const displayedCertifications = certifications.slice(0, 3);
const certificationsHref = userHandle ? `/${userHandle}/certifications` : '/certifications';

return (
    <section id="certifications" className="space-y-6 scroll-mt-24">
    {/* Section Header */}
    <div className="pb-3 border-b border-(--border-subtle)">
        <h2 className="text-xs uppercase tracking-widest font-semibold text-(--text-secondary)">
        Certifications & Licenses
        </h2>
    </div>

    {/* Stacked Certification Rows */}
    <div className="space-y-6 pt-2">
        {displayedCertifications.map((item) => {
        const certUrl = item.fileUrl || item.credentialUrl || item.link;
        const issueDate = item.issueDate || item.date || '';

        return (
            <div
            key={item._id || item.id}
            className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-5 border-b border-(--border-subtle) last:border-none last:pb-0"
            >
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                <h3 className="font-serif font-semibold text-base sm:text-lg text-(--text-primary)">
                    {item.title || item.name}
                </h3>
                {certUrl && (
                    <a
                    href={certUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--text-secondary) hover:text-(--text-primary) transition-colors"
                    title="View Certificate"
                    >
                    <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                )}
                </div>
                {(item.issuingOrganization || item.issuer) && (
                <p className="text-xs sm:text-sm text-(--text-secondary)">
                    Issued by {item.issuingOrganization || item.issuer}
                </p>
                )}
            </div>

            {/* Monospace Issue Date */}
            {issueDate && (
                <span className="text-xs font-mono shrink-0 text-(--text-secondary)">
                {issueDate}
                </span>
            )}
            </div>
        );
        })}
    </div>

    {/* See All Certifications Link */}
    <div className="pt-2 flex justify-end">
        <Link
        href={certificationsHref}
        className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-(--text-primary) transition-colors group cursor-pointer hover:opacity-80"
        >
        <span>See All Certifications ({certifications.length})</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
    </div>
    </section>
);
}