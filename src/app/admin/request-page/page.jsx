'use client';

import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

export default function RequestPage() {
const [requestType, setRequestType] = useState('Theme Request');
const [description, setDescription] = useState('');
const [user, setUser] = useState(null);


const [state, handleSubmit] = useForm('xppakpdq');

useEffect(() => {
async function loadUser() {
    try {
    const res = await fetch('/api/admin/profile');
    const data = await res.json();
    if (data.success) setUser(data.user);
    } catch (err) {
    console.error('Failed to load user info for request page', err);
    }
}
loadUser();
}, []);

return (
<div className="space-y-8 max-w-3xl mx-auto py-4">
    {/* Page Header */}
    <div className="space-y-2">
    <h1 className="text-2xl sm:text-3xl font-serif font-bold text-(--text-primary)">
        Request for New Features or Themes
    </h1>
    <p className="text-xs sm:text-sm text-(--text-secondary)">
        &ldquo;Ask and you shall receive&rdquo; that is what Jesus said. <br />
        Need a specific color scheme, page layout, or something else? Drop your request below and we will build it!
    </p>
    </div>

    {/* Main Card Form */}
    <div className="p-6 sm:p-8 rounded-2xl border border-(--border-subtle) bg-(--bg-surface) shadow-sm">
    {state.succeeded ? (
        <div className="py-12 text-center space-y-4">
        <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
        <h3 className="text-xl font-serif font-bold text-(--text-primary)">
            Request Sent Successfully!
        </h3>
        <p className="text-xs sm:text-sm text-(--text-secondary) max-w-md mx-auto">
            Thanks for submitting your ideas! Your message was delivered straight to our mailbox.
        </p>
        <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2.5 rounded-xl bg-(--accent-warm) text-white font-semibold text-xs hover:opacity-90 transition-all cursor-pointer"
        >
            Send Another Request
        </button>
        </div>
    ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hidden Fields for User Metadata to send to Formspree */}
        <input
            type="hidden"
            name="senderName"
            value={user?.name || 'FolioForge User'}
        />
        <input
            type="hidden"
            name="senderEmail"
            value={user?.email || 'No email provided'}
        />
        <input
            type="hidden"
            name="userHandle"
            value={user?.handle || 'N/A'}
        />
        <input
            type="hidden"
            name="requestType"
            value={requestType}
        />

        {/* User Info Header */}
        {user && (
            <div className="p-4 rounded-xl border border-(--border-subtle) bg-(--bg-main) flex items-center justify-between text-xs">
            <div>
                <span className="text-(--text-secondary) block">Sending as:</span>
                <span className="font-semibold text-(--text-primary)">
                {user.name} ({user.email})
                </span>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-(--accent-warm)/10 text-(--accent-warm) font-mono text-[10px]">
                @{user.handle}
            </span>
            </div>
        )}

        {/* Request Type Selection */}
        <div className="space-y-2">
            <label className="text-xs font-semibold text-(--text-primary)">
            What type of request is this?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
                { id: 'Theme Request', label: 'New Theme Color' },
                { id: 'Layout Request', label: 'New Template / Layout' },
                { id: 'Others Request', label: 'Others' },
            ].map((type) => (
                <button
                key={type.id}
                type="button"
                onClick={() => setRequestType(type.id)}
                className={`py-3 px-4 text-xs font-medium rounded-xl border transition-all cursor-pointer text-left ${
                    requestType === type.id
                    ? 'border-(--accent-warm) bg-(--accent-warm)/10 text-(--accent-warm) font-semibold'
                    : 'border-(--border-subtle) bg-(--bg-main) text-(--text-secondary) hover:border-(--accent-warm)'
                }`}
                >
                {type.label}
                </button>
            ))}
            </div>
        </div>

        {/* Request Details Field */}
        <div className="space-y-2">
            <label htmlFor="message" className="text-xs font-semibold text-(--text-primary)">
            Request Details
            </label>
            <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={
                requestType === 'Theme Request'
                ? 'Describe your ideal color palette (e.g. Neon Purple background with Gold accents called Cyberpunk)...'
                : requestType === 'Layout Request'
                ? 'Describe your ideal design layout (e.g. Minimalist terminal style for software developers)...'
                : 'Describe what you want...'
            }
            className="w-full text-xs p-4 rounded-xl border border-(--border-subtle) bg-(--bg-main) text-(--text-primary) focus:outline-none focus:border-(--accent-warm) transition-colors resize-none placeholder:text-(--text-secondary)"
            />
            <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
            className="text-xs text-red-400 mt-1"
            />
        </div>

        {/* Submit Button */}
        <button
            type="submit"
            disabled={state.submitting || !description.trim()}
            className="w-full py-3.5 rounded-xl bg-(--accent-warm) text-white font-semibold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
            {state.submitting ? (
            <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending to Admin...</span>
            </>
            ) : (
            <>
                <Send className="w-4 h-4" />
                <span>Submit Request</span>
            </>
            )}
        </button>
        </form>
    )}
    </div>
</div>
);
}