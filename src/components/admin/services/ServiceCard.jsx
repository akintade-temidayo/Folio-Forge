import { Trash2 } from 'lucide-react';
import { AVAILABLE_ICONS } from '../services/IconPicker';
import { formatNaira } from '@/lib/formatters';

export default function ServiceCard({ service, onDelete }) {
const hasPrice = Number(service.minPrice) > 0 || Number(service.maxPrice) > 0;

return (
<div
    className="p-5 rounded-2xl border transition-colors flex flex-col justify-between space-y-4"
    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
>
    <div>
    <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
        <div
            className="p-2.5 rounded-xl"
            style={{ backgroundColor: 'var(--bg-main)', color: 'var(--accent-warm)' }}
        >
            {AVAILABLE_ICONS.find((icon) => icon.name === service.icon)?.icon && 
                (() => {
                    const IconComponent = AVAILABLE_ICONS.find((icon) => icon.name === service.icon)?.icon;
                    return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
                })()
            }
        </div>
        <div>
            <h3 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
            {service.title}
            </h3>
            <span
            className="inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full mt-1 border"
            style={{
                backgroundColor: 'var(--bg-main)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--accent-warm)',
            }}
            >
            {service.category?.name || 'Uncategorized'}
            </span>
        </div>
        </div>
        <button
        onClick={() => onDelete(service._id)}
        className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
        title="Delete service"
        >
        <Trash2 className="w-4 h-4" />
        </button>
    </div>

    <p className="text-xs mt-3 line-clamp-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {service.description}
    </p>
    </div>

    {hasPrice && (
    <div className="pt-3 border-t flex items-center justify-between" style={{ borderColor: 'var(--border-subtle)' }}>
    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Price Range:</span>
    <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
        ₦{formatNaira(service.minPrice)} – ₦{formatNaira(service.maxPrice)}
    </span>
    </div>
    )}
</div>
);
}
