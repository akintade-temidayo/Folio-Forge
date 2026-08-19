import Link from 'next/link';
import { Briefcase, ArrowRight } from 'lucide-react';

export default function EditorialServices({ user, services = [] }) {
if (!services.length) return null;

const servicesHref = user?.handle ? `/${user.handle}/services` : '/services';

return (
<section className="space-y-8">
    <div className="flex items-center justify-between border-b border-(--border-subtle) pb-4">
    <div className="flex items-center gap-2">
        <Briefcase className="w-4 h-4 text-(--accent-warm)" />
        <h2 className="text-xs font-bold uppercase tracking-widest text-(--text-secondary)">
        Services
        </h2>
    </div>
    <Link 
        href={servicesHref}
        className="text-xs font-semibold hover:text-(--accent-warm) transition-colors flex items-center gap-1 text-(--text-secondary)"
    >
        <span>Explore All</span>
        <ArrowRight className="w-3.5 h-3.5" />
    </Link>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {services.slice(0, 3).map((service, index) => (
        <div
        key={service._id || index}
        className="rounded-3xl p-6 sm:p-8 border space-y-4 flex flex-col justify-between"
        style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
        }}
        >
        <div className="space-y-3">
            <div className="text-xs font-bold text-(--accent-warm) tracking-widest uppercase">
            0{index + 1}
            </div>
            <h3 className="text-lg font-serif font-bold text-(--text-primary)">
            {service.title}
            </h3>
            {service.description && (
            <p className="text-xs text-(--text-secondary) leading-relaxed">
                {service.description}
            </p>
            )}
        </div>

        {service.price && (
            <div className="pt-4 border-t border-(--border-subtle) text-xs font-semibold text-(--text-primary)">
            Starting at {service.price}
            </div>
        )}
        </div>
    ))}
    </div>
</section>
);
}