'use client';

import React from 'react';
import { ArrowRight, CheckCircle2, Clock, Tag } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ServiceCard({ service, userEmail, handle }) {
const categoryName =
typeof service.category === 'object'
    ? service.category?.name
    : service.category;

// Pre-filled mailto parameters
const emailRecipient = userEmail || '';
const emailSubject = encodeURIComponent(
`Inquiry: ${service.title} (${handle})`
);
const emailBody = encodeURIComponent(
`Hi ${handle},\n\nI am interested in your service: "${service.title}".\n\n[Please describe your project or requirements here]\n\nLooking forward to hearing from you!`
);

const mailtoUrl = `mailto:${emailRecipient}?subject=${emailSubject}&body=${emailBody}`;

return (
<div className="rounded-2xl bg-(--bg-surface) border border-(--border-subtle) p-6 sm:p-8 flex flex-col justify-between hover:border-(--accent-warm)/40 transition-all shadow-xs group">
    <div className="space-y-4">
    {/* Category Badge & Price */}
    <div className="flex items-center justify-between gap-2">
        {categoryName ? (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-(--accent-warm) bg-(--accent-warm)/10 px-2.5 py-1 rounded-full">
            <Tag className="w-3 h-3" />
            {categoryName}
        </span>
        ) : (
        <div />
        )}

        {service.price && (
        <span className="text-sm font-bold text-(--text-primary)">
            {service.price}
        </span>
        )}
    </div>

    {/* Title & Description */}
    <div className="space-y-2">
        <h3 className="text-xl font-bold text-(--text-primary) group-hover:text-(--accent-warm) transition-colors">
        {service.title}
        </h3>
        {service.description && (
        <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
            {service.description}
        </p>
        )}
    </div>

    {/* Delivery Time */}
    {service.deliveryTime && (
        <div className="flex items-center gap-1.5 text-xs text-(--text-secondary) font-medium pt-1">
        <Clock className="w-3.5 h-3.5 text-(--accent-warm)" />
        <span>Turnaround: {service.deliveryTime}</span>
        </div>
    )}

    {/* Included Deliverables / Features */}
    {Array.isArray(service.features) && service.features.length > 0 && (
        <div className="space-y-2 pt-3 border-t border-(--border-subtle)/60">
        <h4 className="text-[11px] font-semibold text-(--text-primary) uppercase tracking-wider">
            What&apos;s Included:
        </h4>
        <ul className="space-y-2">
            {service.features.map((feature, idx) => (
            <li
                key={idx}
                className="flex items-start gap-2 text-xs text-(--text-secondary)"
            >
                <CheckCircle2 className="w-4 h-4 text-(--accent-warm) shrink-0 mt-0.5" />
                <span>{feature}</span>
            </li>
            ))}
        </ul>
        </div>
    )}
    </div>

    {/* Direct Mailto Action Button */}
    <div className="pt-6 mt-6 border-t border-(--border-subtle)/40">
    <a href={mailtoUrl}>
        <Button
        variant="secondary"
        size="md"
        className="w-full gap-2 justify-center"
        >
        <span>Inquire About This Service</span>
        <ArrowRight className="w-4 h-4" />
        </Button>
    </a>
    </div>
</div>
);
}