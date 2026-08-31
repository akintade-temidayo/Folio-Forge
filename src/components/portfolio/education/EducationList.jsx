'use client';

import React from 'react';
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';

export default function EducationList({ education = [], userName = 'Creator', loading = false }) {
  {/* Skeleton Loading State */}
  if (loading) {
    return (
      <div className="relative border-l-2 border-(--border-subtle) ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-6 space-y-4 animate-pulse"
          >
            <div className="h-5 bg-white/5 rounded w-1/3" />
            <div className="h-4 bg-white/5 rounded w-1/4" />
            <div className="h-12 bg-white/5 rounded w-full" />
          </div>
        ))}
      </div>
    );
  }

  {/* Empty State */}
  if (education.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl border border-dashed border-(--border-subtle) bg-(--bg-surface) text-center space-y-3">
        <GraduationCap className="w-12 h-12 text-(--text-secondary) stroke-[1.5]" />
        <h3 className="text-base font-semibold text-(--text-primary)">
          No Education Records Found
        </h3>
        <p className="text-xs text-(--text-secondary) max-w-sm">
          {userName} hasn&apos;t published any academic qualifications or educational history yet.
        </p>
      </div>
    );
  }

  {/* Education Timeline */}
  return (
    <div className="relative border-l-2 border-(--border-subtle) ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-8">
      {education.map((item) => (
        <div key={item._id} className="relative group">
          {/* Timeline Node Icon */}
          <div className="absolute -left-10 sm:-left-10 top-1 w-8 h-8 rounded-full bg-(--bg-main) border border-(--border-subtle) group-hover:border-(--accent-warm) flex items-center justify-center transition-all">
            <GraduationCap className="w-4 h-4 text-(--accent-warm)" />
          </div>

          {/* Card Container */}
          <div className="rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-6 shadow-sm hover:border-(--accent-warm)/40 transition-all space-y-3">
            {/* Institution & Dates */}
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h2 className="text-lg font-bold text-(--text-primary)">
                {item.institution}
              </h2>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-(--bg-main) border border-(--border-subtle) text-xs text-(--text-secondary)">
                <Calendar className="w-3 h-3 text-(--accent-warm)" />
                <span>
                  {item.startDate} – {item.endDate || 'Present'}
                </span>
              </div>
            </div>

            {/* Degree & Field of Study */}
            <div>
              <span className="text-sm font-semibold text-(--accent-warm)">
                {item.degree}
              </span>
              {item.fieldOfStudy && (
                <span className="text-sm text-(--text-secondary)">
                  {' '}in <span className="text-(--text-primary)">{item.fieldOfStudy}</span>
                </span>
              )}
            </div>

            {/* Grade Badge */}
            {item.grade && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-(--accent-warm)/10 text-(--accent-warm) text-xs font-medium border border-(--accent-warm)/20">
                <Award className="w-3.5 h-3.5" />
                <span>{item.grade}</span>
              </div>
            )}

            {/* Description / Coursework */}
            {item.description && (
              <div className="pt-3 border-t border-(--border-subtle)">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-(--text-secondary) mb-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Highlights & Coursework</span>
                </div>
                <p className="text-xs text-(--text-secondary) leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}