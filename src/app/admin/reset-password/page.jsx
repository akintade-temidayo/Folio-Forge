'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Lock, KeyRound, Eye, EyeOff, CheckCircle2, ArrowLeft, Mail } from 'lucide-react';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse and decode query param email cleanly
  const rawEmailParam = searchParams.get('email') || '';
  const decodedEmail = decodeURIComponent(rawEmailParam).trim().toLowerCase();

  const [formData, setFormData] = useState({
    email: decodedEmail,
    code: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleReset(event) {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) return setError('Passwords do not match.');
    if (formData.password.length < 8) return setError('Password must be at least 8 characters.');

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: (formData.email || decodedEmail).trim().toLowerCase(),
          code: formData.code.trim(),
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Password reset failed.');
      
      setSuccess(true);
      setTimeout(() => router.push('/admin/login'), 2000);
    } catch (err) {
      setError(err.message || 'Password reset failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-(--bg-main)">
      <div className="w-full max-w-md p-6 rounded-2xl border border-(--border-subtle) bg-(--bg-surface) space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold font-serif text-(--text-primary)">Set New Password</h2>
          <p className="text-xs text-(--text-secondary)">Enter the email and one-time code you received.</p>
        </div>

        {success ? (
          <div className="text-center space-y-3 py-4">
            <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-400" />
            <p className="text-sm font-semibold text-(--text-primary)">Password reset successful!</p>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <label className="block text-xs font-medium text-(--text-secondary)">
              <span className="mb-1.5 flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Email Address</span>
              <Input
                type="email"
                value={formData.email || decodedEmail}
                onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                required
              />
            </label>

            <label className="block text-xs font-medium text-(--text-secondary)">
              <span className="mb-1.5 flex items-center gap-1"><KeyRound className="w-3.5 h-3.5" /> 6-Digit Code</span>
              <Input
                inputMode="numeric"
                maxLength={6}
                value={formData.code}
                onChange={(event) => setFormData((current) => ({ ...current, code: event.target.value.replace(/\D/g, '') }))}
                required
              />
            </label>

            <label className="block text-xs font-medium text-(--text-secondary)">
              <span className="mb-1.5 flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> New Password</span>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))}
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-secondary)"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </label>

            <label className="block text-xs font-medium text-(--text-secondary)">
              <span className="mb-1.5 flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Confirm Password</span>
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={(event) => setFormData((current) => ({ ...current, confirmPassword: event.target.value }))}
                required
              />
            </label>

            {error && <p className="text-xs text-red-400 bg-red-400/10 p-2.5 rounded-lg border border-red-400/20">{error}</p>}

            <Button type="submit" variant="primary" isLoading={loading} className="w-full py-3">
              Update Password
            </Button>

            <div className="text-center pt-2">
              <Link href="/admin/forgot-password" className="text-xs text-amber-400 hover:underline inline-flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Request a new code
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}