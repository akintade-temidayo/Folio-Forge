import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function EditorialHero({ user }) {
const contactHref = user?.handle ? `/${user.handle}/contact` : '/contact';

// Merge and deduplicate skills/expertise
const expertiseList = Array.isArray(user?.expertise) ? user.expertise : [];
const skillsList = Array.isArray(user?.skills) ? user.skills : [];
const tags = Array.from(new Set([...expertiseList, ...skillsList]));

return (
<section className="border-b border-(--border-subtle) pb-12">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
    {/* Big Serif Headline, Bio & Inline Text Skills */}
    <div className="lg:col-span-8 space-y-3">
        {user?.handle && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-(--bg-surface) text-(--accent-warm)">
            <span>@{user.handle}</span>
        </div>
        )}

        <h1
        className="text-4xl sm:text-5xl md:text-6xl font-serif font-extrabold tracking-tight leading-[1.1]"
        style={{ color: 'var(--text-primary)' }}
        >
        {user?.name || 'Creative Portfolio'}
        </h1>

        {user?.bio && (
        <p
            className="text-base sm:text-lg max-w-2xl font-light leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
        >
            {user.bio}
        </p>
        )}

        {/* Inline Pipe Separated Skills */}
        {tags.length > 0 && (
        <p
            className="text-xs font-medium tracking-wide pt-1 flex flex-wrap gap-2 items-center"
            style={{ color: 'var(--text-secondary)' }}
        >
            {tags.map((tag, idx) => (
            <span key={idx} className="flex items-center gap-2">
                <span>{tag}</span>
                {idx < tags.length - 1 && (
                <span className="opacity-40 font-light">|</span>
                )}
            </span>
            ))}
        </p>
        )}
    </div>

    {/* Direct CTA Block */}
    <div className="lg:col-span-4 flex lg:justify-end">
        <Link
        href={contactHref}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:scale-[1.02]"
        style={{
            backgroundColor: 'var(--accent-warm)',
            color: 'var(--bg-main)',
        }}
        >
        <span>Get In Touch</span>
        <ArrowRight className="w-4 h-4" />
        </Link>
    </div>
    </div>
</section>
);
}