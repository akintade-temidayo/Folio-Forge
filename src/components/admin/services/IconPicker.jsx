'use client';

import React from 'react';
import { 
// Video & Motion
Video, Film, Clapperboard, Scissors, Sparkles, Tv,
// Design & Arts
Palette, Layout, Brush, PenTool, Image as ImageIcon, Layers,
// Code & Tech
Code, Code2, Globe, Cpu, Smartphone, Database,
// Audio & Music
Mic, Music, Headphones, Volume2,
// Writing & Content
FileText, Feather, BookOpen, MessageSquare,
// Business, Strategy & Marketing
Briefcase, TrendingUp, Megaphone, Target, Lightbulb, Compass
} from 'lucide-react';

// Map icon names to Lucide Icon components
export const AVAILABLE_ICONS = [
// Video & Motion
{ name: 'Video', icon: Video, label: 'Video' },
{ name: 'Film', icon: Film, label: 'Film' },
{ name: 'Clapperboard', icon: Clapperboard, label: 'Production' },
{ name: 'Scissors', icon: Scissors, label: 'Editing' },
{ name: 'Sparkles', icon: Sparkles, label: 'VFX / Magic' },

// Design & UI/UX
{ name: 'Palette', icon: Palette, label: 'Design' },
{ name: 'Layout', icon: Layout, label: 'UI/UX' },
{ name: 'PenTool', icon: PenTool, label: 'Illustration' },
{ name: 'ImageIcon', icon: ImageIcon, label: 'Photography' },

// Development & Web
{ name: 'Code', icon: Code, label: 'Coding' },
{ name: 'Globe', icon: Globe, label: 'Web Dev' },
{ name: 'Smartphone', icon: Smartphone, label: 'Mobile Apps' },

// Audio & Music
{ name: 'Mic', icon: Mic, label: 'Audio / Podcast' },
{ name: 'Music', icon: Music, label: 'Music Production' },

// Content & Writing
{ name: 'Feather', icon: Feather, label: 'Copywriting' },
{ name: 'BookOpen', icon: BookOpen, label: 'Editorial' },

// Marketing & Strategy
{ name: 'Megaphone', icon: Megaphone, label: 'Marketing' },
{ name: 'TrendingUp', icon: TrendingUp, label: 'Growth' },
{ name: 'Lightbulb', icon: Lightbulb, label: 'Strategy' },
];

export default function IconPicker({ selectedIcon, onSelect }) {
return (
<div className="grid grid-cols-6 sm:grid-cols-7 gap-2 p-2 rounded-xl border max-h-40 overflow-y-auto no-scrollbar" style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-subtle)' }}>
    {AVAILABLE_ICONS.map(({ name, icon: IconComponent, label }) => {
    const isSelected = selectedIcon === name;
    return (
        <button
        key={name}
        type="button"
        title={label}
        onClick={() => onSelect(name)}
        className={`p-2.5 rounded-lg border flex items-center justify-center transition-all ${
            isSelected 
            ? 'ring-2 ring-amber-400 border-amber-400 bg-amber-400/10 text-amber-400' 
            : 'hover:bg-white/5 border-transparent text-(--text-secondary) hover:text-(--text-primary)'
        }`}
        >
        <IconComponent className="w-4 h-4" />
        </button>
    );
    })}
</div>
);
}