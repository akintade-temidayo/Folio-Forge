import { GrServices } from 'react-icons/gr';
import ServiceCard from './ServiceCard';

export default function ServicesGrid({ services, hasNoCategories, onDelete }) {
if (services.length === 0) {
return (
    <div
    className="p-12 text-center rounded-2xl border border-dashed"
    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
    >
    <GrServices className="w-10 h-10 mx-auto mb-3 opacity-40" style={{ color: 'var(--text-secondary)' }} />
    <h3 className="text-base font-medium" style={{ color: 'var(--text-primary)' }}>
        No Services Added Yet
    </h3>
    <p className="text-xs mt-1 max-w-sm mx-auto" style={{ color: 'var(--text-secondary)' }}>
        {hasNoCategories
        ? 'Create categories first, then add your videography services here.'
        : 'Click "Add Service" above to list your rates and project offerings.'}
    </p>
    </div>
);
}

return (
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {services.map((service) => (
    <ServiceCard key={service._id} service={service} onDelete={onDelete} />
    ))}
</div>
);
}