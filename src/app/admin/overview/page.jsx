'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Award, Briefcase, CheckCircle2, CircleAlert, ExternalLink, Film, FolderTree, Globe, GraduationCap, Loader2, Lock, Plus, Quote, Sparkles, User } from 'lucide-react';
import Button from '@/components/ui/Button';

const stats = [
  ['projects', 'Projects', '/admin/projects', Film, 2],
  ['services', 'Services', '/admin/services', Briefcase],
  ['experiences', 'Experience', '/admin/experience', User],
  ['education', 'Education', '/admin/education', GraduationCap],
  ['certifications', 'Certifications', '/admin/certifications', Award],
  ['testimonials', 'Testimonials', '/admin/testimonials', Quote],
];

const actions = [
  ['Categories', '/admin/categories', FolderTree, 'Organize your work and services.'],
  ['Projects', '/admin/projects', Film, 'Showcase your best work.', true],
  ['Services', '/admin/services', Briefcase, 'List what clients can hire you for.', true],
  ['Experience', '/admin/experience', User, 'Build your professional timeline.'],
  ['Education', '/admin/education', GraduationCap, 'Add your academic credentials.'],
  ['Certifications', '/admin/certifications', Award, 'Add verified achievements.'],
];

function relativeTime(value) {
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 1000));
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export default function AdminOverviewPage() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    async function loadOverview() {
      try {
        const response = await fetch('/api/admin/overview');
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error(data.message || 'Unable to load your overview.');
        if (active) setDashboard(data);
      } catch (loadError) {
        if (active) setError(loadError.message);
      }
    }
    loadOverview();
    return () => { active = false; };
  }, []);

  if (!dashboard && !error) return <div className="min-h-80 flex flex-col items-center justify-center gap-3 text-(--text-secondary)"><Loader2 className="w-7 h-7 animate-spin text-(--accent-warm)" /><p className="text-sm">Loading your portfolio overview…</p></div>;
  if (error) return <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-500">{error}</div>;

  const { completion, counts, nextRule, recentActivity, rules, user, publicLinkReady } = dashboard;
  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <div className="space-y-8 pb-6">
      <section className="rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-5 md:p-7">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div><p className="text-sm text-(--accent-warm) font-medium">Portfolio workspace</p><h1 className="mt-1 text-2xl md:text-3xl font-serif font-bold text-(--text-primary)">Welcome back, {firstName}</h1><p className="mt-2 text-sm text-(--text-secondary)">Keep building - your next step is always one click away.</p></div>
          <Link href="/admin/public-link"><Button variant="secondary" className="gap-2 text-xs"><Globe className="w-4 h-4" /> Public Link</Button></Link>
        </div>
        <div className="mt-6 rounded-xl bg-(--bg-main) p-4 md:p-5">
          <div className="flex items-center justify-between gap-4"><div><p className="text-sm font-semibold text-(--text-primary)">{completion}% complete</p><p className="mt-1 text-xs text-(--text-secondary)">{nextRule ? nextRule.description : 'Your portfolio is live and ready to share!'}</p></div><Sparkles className="w-5 h-5 shrink-0 text-(--accent-warm)" /></div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-(--border-subtle)"><div className="h-full rounded-full bg-(--accent-warm) transition-all duration-500" style={{ width: `${completion}%` }} /></div>
        </div>
        <div className={`mt-4 flex gap-3 rounded-xl border p-4 ${nextRule ? 'border-amber-500/30 bg-amber-500/10' : 'border-emerald-500/30 bg-emerald-500/10'}`}>
          {nextRule ? <CircleAlert className="mt-0.5 w-5 h-5 shrink-0 text-amber-500" /> : <CheckCircle2 className="mt-0.5 w-5 h-5 shrink-0 text-emerald-500" />}
          <div><p className="text-sm font-semibold text-(--text-primary)">{nextRule ? `Action needed: ${nextRule.label}` : 'Your portfolio is ready to share'}</p><p className="mt-1 text-xs text-(--text-secondary)">{nextRule ? nextRule.description : 'All core publishing requirements have been met.'}</p>{nextRule && <Link href={nextRule.href} className="mt-2 inline-flex text-xs font-semibold text-(--accent-warm) hover:underline">Complete this step</Link>}</div>
        </div>
      </section>

      <section><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-semibold text-(--text-primary)">At a glance</h2><span className="text-xs text-(--text-secondary)">Your live portfolio totals</span></div><div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {stats.map(([key, label, href, Icon, minimum]) => { const count = counts[key] || 0; const belowMinimum = minimum && count < minimum; return <Link key={key} href={href} className="group rounded-xl border border-(--border-subtle) bg-(--bg-surface) p-4 transition-colors hover:border-(--accent-warm)"><Icon className="w-4 h-4 text-(--accent-warm)" /><p className="mt-4 text-2xl font-semibold text-(--text-primary)">{count}</p><p className="mt-1 text-xs font-medium text-(--text-secondary)">{label}</p>{belowMinimum && <p className="mt-2 text-[10px] font-semibold text-amber-500">{count}/2 required</p>}</Link>; })}
      </div></section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-5 md:p-6"><div className="flex items-center justify-between"><div><h2 className="text-lg font-semibold text-(--text-primary)">Action center</h2><p className="mt-1 text-xs text-(--text-secondary)">Manage every part of your portfolio.</p></div><Plus className="w-5 h-5 text-(--accent-warm)" /></div><div className="mt-5 grid gap-3 sm:grid-cols-2">
          {actions.map(([label, href, Icon, description, needsCategory]) => { const locked = needsCategory && counts.categories === 0; const target = locked ? '/admin/categories' : href; return <Link key={label} href={target} className={`flex items-start gap-3 rounded-xl border p-4 transition-colors hover:bg-(--bg-surface-hover) ${locked ? 'border-amber-500/25 bg-amber-500/5' : 'border-(--border-subtle)'}`}><Icon className="w-5 h-5 shrink-0 text-(--accent-warm)" /><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-(--text-primary)">{label}</p><p className="mt-1 text-xs text-(--text-secondary)">{locked ? 'Requires 1 Category' : description}</p></div>{locked ? <Lock className="w-4 h-4 text-amber-500" /> : <Plus className="w-4 h-4 text-(--text-secondary)" />}</Link>; })}
        </div></div>
        <div className="rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-5 md:p-6"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--bg-main) text-(--accent-warm)">{publicLinkReady ? <Globe className="w-5 h-5" /> : <Lock className="w-5 h-5" />}</div><div><h2 className="text-lg font-semibold text-(--text-primary)">Public Link</h2><p className="text-xs text-(--text-secondary)">{publicLinkReady ? 'Ready to publish and share.' : 'Complete requirements to unlock sharing.'}</p></div></div><div className="mt-5 rounded-xl bg-(--bg-main) p-4 text-xs text-(--text-secondary)">{publicLinkReady ? 'Your profile, category, and two-project publishing requirements are complete.' : 'Requires a profile name and bio, 1 category, and 2 projects.'}</div><Link href={publicLinkReady ? '/admin/public-link' : (nextRule?.href || '/admin/profile')} className="mt-4 block"><Button variant={publicLinkReady ? 'primary' : 'secondary'} className="w-full gap-2 text-xs">{publicLinkReady ? <><ExternalLink className="w-4 h-4" /> Manage Public Link</> : <><Lock className="w-4 h-4" /> Complete requirements</>}</Button></Link></div>
      </section>

      <section className="rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-5 md:p-6"><div className="flex items-center justify-between"><div><h2 className="text-lg font-semibold text-(--text-primary)">System guidelines</h2><p className="mt-1 text-xs text-(--text-secondary)">Meet these requirements for a smooth public portfolio.</p></div><span className="text-xs font-semibold text-(--accent-warm)">{rules.filter((rule) => rule.complete).length}/{rules.length} complete</span></div><div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {rules.map((rule) => <Link key={rule.id} href={rule.href} className={`rounded-xl border p-4 transition-colors hover:bg-(--bg-surface-hover) ${rule.complete ? 'border-emerald-500/25' : 'border-amber-500/25'}`}><div className="flex items-start gap-2">{rule.complete ? <CheckCircle2 className="mt-0.5 w-4 h-4 shrink-0 text-emerald-500" /> : <CircleAlert className="mt-0.5 w-4 h-4 shrink-0 text-amber-500" />}<div><p className="text-sm font-semibold text-(--text-primary)">{rule.label}</p><p className="mt-1 text-xs leading-5 text-(--text-secondary)">{rule.complete ? 'Requirement met.' : rule.description}</p></div></div></Link>)}
      </div></section>

      <section className="rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-5 md:p-6"><h2 className="text-lg font-semibold text-(--text-primary)">Recent activity</h2><p className="mt-1 text-xs text-(--text-secondary)">Your latest additions and updates.</p>{recentActivity.length === 0 ? <p className="mt-6 rounded-xl bg-(--bg-main) p-4 text-sm text-(--text-secondary)">Your activity will appear here as you build your portfolio.</p> : <div className="mt-5 divide-y divide-(--border-subtle)">{recentActivity.map((activity) => <div key={activity.id} className="flex items-center gap-3 py-3"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--bg-main)"><CheckCircle2 className="w-4 h-4 text-(--accent-warm)" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-(--text-primary)">{activity.title}</p><p className="text-xs text-(--text-secondary)">{activity.type} updated</p></div><span className="text-xs text-(--text-secondary)">{relativeTime(activity.createdAt)}</span></div>)}</div>}</section>
    </div>
  );
}
