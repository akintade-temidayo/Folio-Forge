'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function BentoServices({ services = [], userHandle = '' }) {
if (!services || services.length === 0) return null;

// Clean handle for dynamic routing
let handle = userHandle;
if (!handle && typeof window !== 'undefined') {
handle = window.location.pathname.split('/')[1] || '';
}

const servicesHref = handle ? `/${handle}/services` : '/services';

// Limit strictly to 4 services
const displayedServices = services.slice(0, 4);

return (
<section id="services" className="space-y-4">
    {/* Section Header */}
    <div className="flex items-center justify-between pb-1">
    <h2 
        className="text-xs font-bold uppercase tracking-widest flex items-center gap-2"
        style={{ color: 'var(--text-secondary)' }}
    >
        <Layers className="w-4 h-4" style={{ color: 'var(--accent-warm)' }} />
        <span>Services</span>
    </h2>
    </div>

    {/* Services Grid (Up to 4 Items) */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {displayedServices.map((service, idx) => {
        const title = service.title || service.name || 'Service';
        const description = service.description || service.summary || '';
        const features = service.features || service.offerings || service.deliverables || [];
        const price = service.price || service.startingPrice || '';

        return (
        <div
            key={service._id || service.id || idx}
            className="group rounded-2xl p-5 border flex flex-col justify-between space-y-4 transition-all duration-300 hover:border-(--accent-warm)/50"
            style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
            }}
        >
            {/* Top Header & Price */}
            <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
                <h3
                className="text-base font-bold transition-colors group-hover:text-(--accent-warm)"
                style={{ color: 'var(--text-primary)' }}
                >
                {title}
                </h3>

                {price && (
                <span
                    className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full border shrink-0"
                    style={{
                    backgroundColor: 'var(--bg-main)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--accent-warm)',
                    }}
                >
                    {price}
                </span>
                )}
            </div>

            {/* Description */}
            {description && (
                <p
                className="text-xs line-clamp-3 leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
                >
                {description}
                </p>
            )}
            </div>

            {/* Deliverables / Features list */}
            {features && features.length > 0 && (
            <ul className="space-y-1.5 pt-1 border-t border-(--border-subtle)/50">
                {features.slice(0, 3).map((feature, i) => (
                <li
                    key={i}
                    className="text-xs flex items-center gap-2"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    <CheckCircle2
                    className="w-3.5 h-3.5 shrink-0"
                    style={{ color: 'var(--accent-warm)' }}
                    />
                    <span className="line-clamp-1">{feature}</span>
                </li>
                ))}
            </ul>
            )}
        </div>
        );
    })}
    </div>

    {/* Footer Link: View All Services */}
    <div className="pt-2 flex justify-end">
    <Link
        href={servicesHref}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all hover:underline"
        style={{ color: 'var(--accent-warm)' }}
    >
        <span>View All Services ({services.length})</span>
        <ArrowRight className="w-3.5 h-3.5" />
    </Link>
    </div>
</section>
);
}