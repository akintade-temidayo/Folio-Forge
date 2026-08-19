'use client';

import React from 'react';
import Image from 'next/image';
// import { Sparkles } from 'lucide-react';

export default function ModernHero({ user }) {
const userName = user?.name || '';
const userAvatar = user?.avatarUrl || '';
const userBio = user?.bio || '';
const primaryRole = user?.expertise?.[0] || '';

return (
<section id="about" className="text-center max-w-3xl mx-auto space-y-5 py-12">
    {/* Availability Badge */}
    {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-(--bg-surface) border border-(--border-subtle) text-xs font-medium text-(--accent-warm)">
    <Sparkles className="w-3.5 h-3.5" />
    <span>Available for new opportunities</span>
    </div> */}

    {/* Profile Image / Avatar */}
    <div className="relative w-24 h-24 mx-auto rounded-full bg-(--accent-warm) overflow-hidden flex items-center justify-center font-bold text-[#1c1917] text-3xl shrink-0 border-2 border-(--border-subtle) shadow-md">
    {userAvatar ? (
        <Image 
        src={userAvatar} 
        alt={userName} 
        fill 
        sizes="96px" 
        className="object-cover" 
        priority
        />
    ) : (
        userName.charAt(0).toUpperCase()
    )}
    </div>

    {/* Name & Primary Role */}
    <div className="space-y-1">
    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-(--text-primary)">
        {userName}
    </h1>
    {primaryRole && (
        <p className="text-sm md:text-base font-semibold text-(--accent-warm)">
        {primaryRole}
        </p>
    )}
    </div>

    {/* Dynamic Bio */}
    {userBio ? (
    <p className="text-base md:text-lg text-(--text-secondary) leading-relaxed max-w-2xl mx-auto">
        {userBio}
    </p>
    ) : (
    <p className="text-sm text-(--text-secondary) italic">
        No bio provided yet.
    </p>
    )}

    {/* Modern Inline Skills (HTML | CSS | REACT) */}
    {user?.skills && user.skills.length > 0 && (
    <p className="text-xs font-bold uppercase tracking-widest text-(--text-secondary) pt-2">
        {user.skills.map((skill, index) => (
        <React.Fragment key={index}>
            <span className="hover:text-(--accent-warm) transition-colors">{skill}</span>
            {index < user.skills.length - 1 && (
            <span className="mx-2 text-(--border-subtle) font-normal">|</span>
            )}
        </React.Fragment>
        ))}
    </p>
    )}
</section>
);
}