'use client';

import React from 'react';
import { Globe, Lock, ExternalLink, Copy, Check } from 'lucide-react';

export default function LiveLinkCard({ isEnabled, handle, portfolioUrl, projectsCount, copied, onCopy }) {
return (
    <div
    className="p-6 md:p-8 rounded-[5px] border space-y-6 transition-colors shadow-xs"
    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
    >
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
        {isEnabled ? (
            <Globe className="w-5 h-5" style={{ color: 'var(--accent-warm)' }} />
        ) : (
            <Lock className="w-5 h-5 text-amber-500" />
        )}
        <div>
            <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
            Your Live Link
            </h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
            Share this link with clients or place it in your social media bio.
            </p>
        </div>
        </div>

        {isEnabled ? (
        <a
            href={handle ? portfolioUrl : '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xs flex items-center gap-1.5 font-semibold px-3 py-1.5 rounded-lg border transition-all ${
            !handle ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'
            }`}
            style={{
            color: 'var(--accent-warm)',
            borderColor: 'var(--border-subtle)',
            backgroundColor: 'var(--bg-main)',
            }}
            onClick={(e) => { if (!handle) e.preventDefault(); }}
        >
            <span>Live Preview</span>
            <ExternalLink className="w-3.5 h-3.5" />
        </a>
        ) : (
        <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
            Locked ({projectsCount}/2 Projects Added)
        </span>
        )}
    </div>

    <div className="flex items-center gap-3">
        <input
        type="text"
        readOnly
        disabled={!isEnabled}
        value={
            isEnabled
            ? portfolioUrl || 'Loading portfolio link...'
            : 'Add at least 2 projects to unlock your public link'
        }
        className={`w-full px-4 py-3 rounded-xl text-xs font-mono focus:outline-none transition-opacity ${
            !isEnabled ? 'opacity-50 select-none' : 'select-all'
        }`}
        style={{
            backgroundColor: 'var(--bg-main)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-primary)',
            borderWidth: '1px',
        }}
        />

        <button
        type="button"
        onClick={onCopy}
        disabled={!isEnabled}
        className={`px-5 py-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 shrink-0 ${
            !isEnabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-90'
        }`}
        style={{
            backgroundColor: !isEnabled
            ? 'var(--bg-main)'
            : copied
            ? 'rgba(16, 185, 129, 0.15)'
            : 'var(--accent-warm)',
            color: !isEnabled ? 'var(--text-secondary)' : copied ? '#34d399' : '#ffffff',
            border: copied ? '1px solid rgba(16, 185, 129, 0.3)' : 'none',
        }}
        >
        {copied ? (
            <>
            <Check className="w-4 h-4" />
            <span>Copied!</span>
            </>
        ) : (
            <>
            <Copy className="w-4 h-4" />
            <span>Copy Link</span>
            </>
        )}
        </button>
    </div>

    {!isEnabled && (
        <p className="text-xs text-amber-400/90 bg-amber-500/5 border border-amber-500/10 p-3 rounded-xl">
        💡 Tip: Upload at least 2 projects in the <strong>Projects</strong> tab to activate your shareable link.
        </p>
    )}
    </div>
);
}