import Link from 'next/link';
import Image from 'next/image';
import { FolderGit2, ArrowRight, ArrowUpRight } from 'lucide-react';

export default function EditorialProjects({ user, projects = [] }) {
const projectsHref = user?.handle ? `/${user.handle}/projects` : '/projects';

return (
<section className="space-y-8">
    <div className="flex items-center justify-between border-b border-(--border-subtle) pb-4">
    <div className="flex items-center gap-2">
        <FolderGit2 className="w-4 h-4 text-(--accent-warm)" />
        <h2 className="text-xs font-bold uppercase tracking-widest text-(--text-secondary)">
        Projects 
        </h2>
    </div>
    {projects.length > 0 && (
        <Link 
        href={projectsHref}
        className="text-xs font-semibold hover:text-(--accent-warm) transition-colors flex items-center gap-1 text-(--text-secondary)"
        >
        <span>View All</span>
        <ArrowRight className="w-3.5 h-3.5" />
        </Link>
    )}
    </div>

    {projects.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.slice(0, 4).map((project, index) => {
        const projectNumber = String(index + 1).padStart(2, '0');
        const projectDetailHref = user?.handle 
            ? `/${user.handle}/projects/${project._id || project.slug}` 
            : `/projects/${project._id || project.slug}`;

        return (
            <article 
            key={project._id || index}
            className="group relative rounded-3xl border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-(--accent-warm)/50"
            style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
            }}
            >
            <div className="p-6 sm:p-8 space-y-4">
                {/* Number Badge */}
                <div className="flex items-center justify-between">
                <span className="text-3xl font-serif font-black text-(--accent-warm) opacity-80">
                    {projectNumber}
                </span>
                {project.link && (
                    <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full border border-(--border-subtle) hover:border-(--accent-warm) transition-colors text-(--text-secondary)"
                    >
                    <ArrowUpRight className="w-4 h-4" />
                    </a>
                )}
                </div>

                {/* Image Preview */}
                {project.coverImage && (
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-(--border-subtle)">
                    <Image
                    src={project.coverImage}
                    alt={project.title || 'Project Preview'}
                    fill
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                )}

                {/* Meta & Title */}
                <div className="space-y-2 pt-2">
                <h3 
                    className="text-xl font-serif font-bold group-hover:text-(--accent-warm) transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                >
                    <Link href={projectDetailHref}>
                    {project.title}
                    </Link>
                </h3>

                {project.description && (
                    <p className="text-xs sm:text-sm text-(--text-secondary) line-clamp-2 leading-relaxed">
                    {project.description}
                    </p>
                )}
                </div>
            </div>

            {/* Dynamic Tags Footer */}
            {Array.isArray(project.tags) && project.tags.length > 0 && (
                <div className="px-6 pb-6 sm:px-8 sm:pb-8 flex flex-wrap gap-1.5">
                {project.tags.map((tag, idx) => (
                    <span 
                    key={idx}
                    className="px-2.5 py-1 rounded-md text-[10px] font-medium border border-(--border-subtle) text-(--text-secondary) bg-(--bg-main)"
                    >
                    {tag}
                    </span>
                ))}
                </div>
            )}
            </article>
        );
        })}
    </div>
    ) : (
    <div className="text-center py-12 rounded-3xl border border-dashed border-(--border-subtle) text-(--text-secondary) text-xs">
        No published projects available yet.
    </div>
    )}
</section>
);
}
