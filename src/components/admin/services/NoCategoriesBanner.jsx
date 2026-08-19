import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function NoCategoriesBanner() {
return (
<div
    className="p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--accent-warm)' }}
>
    <div className="flex items-center gap-3">
    <div
        className="p-2.5 rounded-xl shrink-0"
        style={{ backgroundColor: 'var(--bg-main)', color: 'var(--accent-warm)' }}
    >
        <AlertTriangle className="w-6 h-6" />
    </div>
    <div>
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
        No Categories Found
        </h3>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
        You must create at least one category before you can define services.
        </p>
    </div>
    </div>
    <Link
    href="/admin/categories"
    className="px-4 py-2 rounded-xl text-xs font-bold transition-colors shrink-0"
    style={{ backgroundColor: 'var(--accent-warm)', color: 'var(--bg-main)' }}
    >
    Go to Categories
    </Link>
</div>
);
}