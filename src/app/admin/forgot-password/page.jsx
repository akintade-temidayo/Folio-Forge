'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [devCode, setDevCode] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const cleanEmail = email.trim().toLowerCase();

    try {
      const response = await fetch('/api/auth/request-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to request a reset code.');
      
      setDevCode(data.devCode || '');
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Unable to request a reset code.');
    } finally {
      setLoading(false);
    }
  }

  function handleProceed() {
    const cleanEmail = email.trim().toLowerCase();
    // Safely URL-encode the email parameter
    router.push(`/admin/reset-password?email=${encodeURIComponent(cleanEmail)}`);
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-(--bg-main)">
      <div className="w-full max-w-md p-6 rounded-2xl border border-(--border-subtle) bg-(--bg-surface) space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold font-serif text-(--text-primary)">Reset Password</h2>
          <p className="text-xs text-(--text-secondary)">Request a one-time code to reset your password.</p>
        </div>

        {submitted ? (
          <div className="text-center space-y-4 py-4">
            <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-400" />
            <p className="text-xs text-(--text-secondary)">If an account exists for that email, a reset code has been sent.</p>
            {devCode && <p className="text-xs text-amber-400 font-mono">Development reset code(Please copy the code): {devCode}</p>}
            <Button type="button" variant="primary" onClick={handleProceed} className="w-full py-3 gap-2">
              Continue <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-(--text-secondary) mb-1.5 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> Email Address
              </label>
              <Input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            {error && <p className="text-xs text-red-400 bg-red-400/10 p-2.5 rounded-lg border border-red-400/20">{error}</p>}
            <Button type="submit" variant="primary" isLoading={loading} className="w-full py-3">
              Send Reset Code
            </Button>
            <div className="text-center pt-2 border-t border-(--border-subtle)">
              <Link href="/admin/login" className="text-xs text-(--text-secondary) hover:underline inline-flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}