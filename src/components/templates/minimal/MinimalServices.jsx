'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function MinimalServices({ services = [], userHandle = '' }) {
if (!services || services.length === 0) return null;

// Limit display to 4 items on main page
const displayedServices = services.slice(0, 4);
const servicesHref = userHandle ? `/${userHandle}/services` : '/services';

return (
<section id="services" className="space-y-6 scroll-mt-24">
    {/* Section Header */}
    <div className="pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
    <h2 
        className="text-xs uppercase tracking-widest font-semibold"
        style={{ color: 'var(--text-secondary)' }}
    >
        Services Offered
    </h2>
    </div>

    {/* Services List */}
    <div 
    className="divide-y border-t border-b"
    style={{ borderColor: 'var(--border-subtle)' }}
    >
    {displayedServices.map((service) => (
        <div 
        key={service._id || service.id}
        className="py-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
        >
        {/* Left: Title & Description */}
        <div className="space-y-1.5 max-w-xl">
            <h3 
            className="font-serif font-semibold text-base sm:text-lg"
            style={{ color: 'var(--text-primary)' }}
            >
            {service.title || service.name}
            </h3>
            {service.description && (
            <p 
                className="text-xs sm:text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
            >
                {service.description}
            </p>
            )}
        </div>

        {/* Right: Price or Starting Rate */}
        {(service.price || service.startingPrice) && (
            <div 
            className="text-xs font-mono font-medium shrink-0 self-start sm:self-auto px-3 py-1 rounded border"
            style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)',
            }}
            >
            {service.price || `From ${service.startingPrice}`}
            </div>
        )}
        </div>
    ))}
    </div>

    {/* See All Services Link */}
    <div className="pt-2 flex justify-end">
    <Link
        href={servicesHref}
        className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider transition-colors group cursor-pointer hover:opacity-80"
        style={{ color: 'var(--text-primary)' }}
    >
        <span>See All Services ({services.length})</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
    </Link>
    </div>
</section>
);
}