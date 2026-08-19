'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check, MessageSquare } from 'lucide-react';
import ServiceCard from '@/components/portfolio/ServiceCard';
import Modal from '@/components/ui/Modal';

export default function ModernServices({ services = [], handle = '' }) {
const [selectedService, setSelectedService] = useState(null);

if (!services || services.length === 0) return null;

// Limit featured services on home view to 2
const featuredServices = services.slice(0, 2);

// Clean handle string safely for see-more route
let userHandle = String(handle || '').replace(/^\/+|\/+$/g, '');
if (!userHandle && typeof window !== 'undefined') {
userHandle = window.location.pathname.split('/')[1] || '';
}

const seeAllHref = userHandle ? `/${userHandle}/services` : '/services';
const contactHref = userHandle ? `/${userHandle}/contact` : '#contact';

// Format Price Helper inside Modal
const getModalPrice = (srv) => {
if (!srv) return null;
if (srv.price) return srv.price;
const min = srv.minPrice ? `₦${Number(srv.minPrice).toLocaleString()}` : '';
const max = srv.maxPrice ? `₦${Number(srv.maxPrice).toLocaleString()}` : '';
if (min && max) return `${min} – ${max}`;
if (min) return `From ${min}`;
if (max) return `Up to ${max}`;
return null;
};

return (
<section id="services" className="space-y-4 py-4 max-w-4xl mx-auto">
    {/* Header */}
    <div className="flex items-end justify-between border-b border-(--border-subtle) pb-3">
    <div>
        <h2 className="text-lg font-bold tracking-tight text-(--text-primary)">
        Services Offered
        </h2>
        <p className="text-xs text-(--text-secondary) mt-0.5">
        Packages and custom solutions
        </p>
    </div>

    {services.length > 0 && (
        <Link
        href={seeAllHref}
        className="inline-flex items-center gap-1 text-xs font-bold text-(--accent-warm) hover:underline transition-all"
        >
        <span>See all ({services.length})</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
    )}
    </div>

    {/* 2-Column Services Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {featuredServices.map((service) => (
        <ServiceCard
        key={service._id || service.id}
        service={service}
        onClick={() => setSelectedService(service)}
        />
    ))}
    </div>

    {/* Pop-out Service Details Modal */}
    <Modal
    isOpen={!!selectedService}
    onClose={() => setSelectedService(null)}
    title={selectedService?.title || 'Service Details'}
    >
    {selectedService && (
        <div className="space-y-6 text-(--text-primary)">
        {/* Category & Price Badge */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-(--border-subtle)">
            {selectedService.category?.name ? (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-(--accent-warm)/10 text-(--accent-warm) border border-(--accent-warm)/20">
                {selectedService.category.name}
            </span>
            ) : <div />}

            {getModalPrice(selectedService) && (
            <div className="text-right">
                <span className="text-xs text-(--text-secondary) block">Pricing Tier</span>
                <span className="text-base font-extrabold text-(--text-primary)">
                {getModalPrice(selectedService)}
                </span>
            </div>
            )}
        </div>

        {/* Service Description */}
        <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-(--text-secondary)">
            Overview
            </h4>
            <p className="text-sm leading-relaxed text-(--text-secondary) whitespace-pre-line">
            {selectedService.description}
            </p>
        </div>

        {/* Deliverables/Features list (if populated) */}
        {selectedService.deliverables && selectedService.deliverables.length > 0 && (
            <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-(--text-secondary)">
                What&apos;s Included
            </h4>
            <ul className="space-y-2">
                {selectedService.deliverables.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-xs text-(--text-secondary)">
                    <Check className="w-4 h-4 text-(--accent-warm) shrink-0 mt-0.5" />
                    <span>{item}</span>
                </li>
                ))}
            </ul>
            </div>
        )}

        {/* Action Buttons */}
        <div className="pt-4 border-t border-(--border-subtle) flex items-center justify-end gap-3">
            <button
            onClick={() => setSelectedService(null)}
            className="px-4 py-2 text-xs font-medium rounded-lg text-(--text-secondary) hover:bg-(--border-subtle)/20 transition-colors"
            >
            Close
            </button>

            <Link
            href={contactHref}
            onClick={() => setSelectedService(null)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-(--accent-warm) text-white hover:opacity-90 transition-opacity"
            >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Inquire About This Service</span>
            </Link>
        </div>
        </div>
    )}
    </Modal>
</section>
);
}