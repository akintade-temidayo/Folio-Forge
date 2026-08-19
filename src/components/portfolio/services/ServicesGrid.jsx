'use client';

import React from 'react';
import ServiceCard from './ServiceCard';

export default function ServicesGrid({ services = [], userEmail, handle }) {
if (!services || services.length === 0) {
return (
    <div className="w-full text-center py-16 border border-dashed border-(--border-subtle) rounded-2xl bg-(--bg-surface)/30">
    <p className="text-sm text-(--text-secondary)">
        No services currently listed.
    </p>
    </div>
);
}

return (
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
    {services.map((service, index) => {
    const id = service._id || service.id || index;
    return (
        <ServiceCard
        key={id}
        service={service}
        userEmail={userEmail}
        handle={handle}
        />
    );
    })}
</div>
);
}