'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
Mail, 
Phone, 
Copy, 
Check, 
ExternalLink,
} from 'lucide-react';
import {
FaYoutube,
FaInstagram,
FaLinkedin,
FaTwitter,
FaGithub,
FaFacebook,
FaTiktok,
FaGlobe,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function PublicContactPage() {
const { handle } = useParams();
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [copiedField, setCopiedField] = useState(null);

useEffect(() => {
async function fetchUserData() {
    try {
    const res = await fetch(`/api/public/${handle}`);
    const data = await res.json();
    if (data.success && data.data?.user) {
        setUser(data.data.user);
    }
    } catch (error) {
    console.error('Failed to fetch user data:', error);
    } finally {
    setLoading(false);
    }
}

if (handle) {
    fetchUserData();
}
}, [handle]);

const handleCopy = (text, type) => {
if (!text) return;
navigator.clipboard.writeText(text);
setCopiedField(type);
setTimeout(() => setCopiedField(null), 2000);
};

// Icon mapping matching your Footer component
const socialIcons = {
youtube: <FaYoutube className="w-5 h-5" />,
instagram: <FaInstagram className="w-5 h-5" />,
linkedin: <FaLinkedin className="w-5 h-5" />,
twitter: <FaTwitter className="w-5 h-5" />,
x: <FaXTwitter className="w-5 h-5" />,
github: <FaGithub className="w-5 h-5" />,
facebook: <FaFacebook className="w-5 h-5" />,
tiktok: <FaTiktok className="w-5 h-5" />,
};

// Format URL cleanly for display
const formatUrlDisplay = (url) => {
if (!url) return '';
return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
};

if (loading) {
return (
    <div className="min-h-[60vh] flex items-center justify-center">
    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Loading contact information...
    </p>
    </div>
);
}

// Filter out empty or missing social links (Object key-value pairs)
const activeSocials = user?.socialLinks
? Object.entries(user.socialLinks).filter(
    ([_, url]) => typeof url === 'string' && url.trim() !== ''
    )
: [];

return (
<div className="max-w-3xl mx-auto py-12 px-4 space-y-10">
    {/* Header */}
    <div className="text-center space-y-3">
    <h1 className="text-3xl md:text-4xl font-serif font-bold" style={{ color: 'var(--text-primary)' }}>
        Let&apos;s Connect
    </h1>
    <p className="text-base max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
        Feel free to reach out directly or connect with me across my social channels.
    </p>
    </div>

    <div className="space-y-6">
    {/* Direct Contact Cards (Phone & Email) */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Phone Number Box */}
        {user?.phoneNumber && (
        <div
            className="p-5 rounded-2xl border flex items-center justify-between transition-all"
            style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
            }}
        >
            <div className="flex items-center gap-3.5">
            <div 
                className="p-3 rounded-xl"
                style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--accent)' }}
            >
                <Phone className="w-5 h-5" />
            </div>
            <div>
                <span className="text-xs font-medium uppercase tracking-wider block" style={{ color: 'var(--text-secondary)' }}>
                Phone
                </span>
                <a
                href={`tel:${user.phoneNumber}`}
                className="font-semibold text-sm hover:underline"
                style={{ color: 'var(--text-primary)' }}
                >
                {user.phoneNumber}
                </a>
            </div>
            </div>

            <button
            onClick={() => handleCopy(user.phoneNumber, 'phone')}
            className="p-2.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)',
            }}
            title="Copy phone number"
            >
            {copiedField === 'phone' ? (
                <Check className="w-4 h-4 text-emerald-500" />
            ) : (
                <Copy className="w-4 h-4" />
            )}
            </button>
        </div>
        )}

        {/* Email Address Box */}
        {user?.email && (
        <div
            className="p-5 rounded-2xl border flex items-center justify-between transition-all"
            style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
            }}
        >
            <div className="flex items-center gap-3.5">
            <div 
                className="p-3 rounded-xl"
                style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--accent)' }}
            >
                <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0">
                <span className="text-xs font-medium uppercase tracking-wider block" style={{ color: 'var(--text-secondary)' }}>
                Email
                </span>
                <a
                href={`mailto:${user.email}`}
                className="font-semibold text-sm hover:underline truncate block"
                style={{ color: 'var(--text-primary)' }}
                >
                {user.email}
                </a>
            </div>
            </div>

            <button
            onClick={() => handleCopy(user.email, 'email')}
            className="p-2.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
            style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)',
            }}
            title="Copy email address"
            >
            {copiedField === 'email' ? (
                <Check className="w-4 h-4 text-emerald-500" />
            ) : (
                <Copy className="w-4 h-4" />
            )}
            </button>
        </div>
        )}
    </div>

    {/* Social Links Grid */}
    {activeSocials.length > 0 && (
        <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider px-1" style={{ color: 'var(--text-secondary)' }}>
            Social Channels
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeSocials.map(([platform, url]) => {
            const key = platform.toLowerCase().trim();
            const icon = socialIcons[key] || <FaGlobe className="w-5 h-5" />;
            const fullUrl = url.startsWith('http') ? url : `https://${url}`;

            return (
                <a
                key={platform}
                href={fullUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border flex items-center justify-between group transition-all duration-200 hover:border-emerald-500/50"
                style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-subtle)',
                }}
                >
                <div className="flex items-center gap-3 min-w-0">
                    <div 
                    className="p-2.5 rounded-lg shrink-0"
                    style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--text-primary)' }}
                    >
                    {icon}
                    </div>
                    <div className="min-w-0">
                    <span className="font-medium text-sm capitalize block" style={{ color: 'var(--text-primary)' }}>
                        {platform}
                    </span>
                    <span className="text-xs truncate block max-w-45" style={{ color: 'var(--text-secondary)' }}>
                        {formatUrlDisplay(url)}
                    </span>
                    </div>
                </div>
                <ExternalLink 
                    className="w-4 h-4 shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" 
                    style={{ color: 'var(--text-primary)' }} 
                />
                </a>
            );
            })}
        </div>
        </div>
    )}
    </div>
</div>
);
}