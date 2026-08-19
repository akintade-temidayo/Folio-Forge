'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Flame, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
const router = useRouter();
const [formData, setFormData] = useState({ identifier: '', password: '' });
const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

const handleLogin = async (e) => {
e.preventDefault();
setLoading(true);
setError('');

try {
    const payload = {
    name: formData.identifier.trim(),
    email: formData.identifier.trim(),
    password: formData.password,
    };

    const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    });

    const contentType = res.headers.get('content-type');
    let data = {};
    if (contentType && contentType.includes('application/json')) {
    data = await res.json();
    } else {
    throw new Error(`Server returned ${res.status}: API route error.`);
    }

    if (!res.ok) throw new Error(data.message || 'Invalid email/name or password');

    // Refresh cookie context and redirect cleanly
    router.refresh();
    router.push('/admin/overview');
} catch (err) {
    setError(err.message);
} finally {
    setLoading(false);
}
};

return (
<div className="min-h-screen flex flex-col justify-center items-center px-4 bg-(--bg-main)">
    <div className="w-full max-w-md p-6 rounded-2xl border border-(--border-subtle) bg-(--bg-surface) space-y-6">
    <div className="text-center space-y-1">
        <h2 className="text-xl font-bold font-serif text-(--text-primary)">Welcome Back</h2>
        <p className="text-xs text-(--text-secondary)">Sign in to manage your portfolio</p>
    </div>

    <form onSubmit={handleLogin} className="space-y-4">
        <div>
        <label className="text-xs font-medium text-(--text-secondary) mb-1.5 flex items-center gap-1">
            <User className="w-3.5 h-3.5" /> Email or Name
        </label>
        <Input
            type="text"
            placeholder="Enter your email or name"
            value={formData.identifier}
            onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
            required
        />
        </div>

        <div>
        <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-medium text-(--text-secondary) flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" /> Password
            </label>
            <Link href="/admin/forgot-password" className="text-[11px] text-amber-400 hover:underline">
            Forgot password?
            </Link>
        </div>
        <div className="relative">
            <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="pr-10"
            required
            />
            <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-secondary) hover:text-(--text-primary) transition-colors"
            tabIndex={-1}
            >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
        </div>
        </div>

        {error && <p className="text-xs text-red-400 bg-red-400/10 p-2.5 rounded-lg border border-red-400/20">{error}</p>}

        <Button type="submit" variant="primary" isLoading={loading} className="w-full py-3">
        Fire On <Flame className="w-4 h-4 ml-1 text-amber-400" />
        </Button>
    </form>

    <div className="text-center pt-2 border-t border-(--border-subtle)">
        <Link href="/" className="text-xs text-(--text-secondary) hover:underline">
        ← Need an account? Register here
        </Link>
        </div>
      </div>
    </div>
  );
}