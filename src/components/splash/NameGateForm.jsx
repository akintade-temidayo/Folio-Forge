'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import AvatarUpload from '@/components/ui/AvatarUpload';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function NameGateForm() {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);
const [phoneNumber, setPhoneNumber] = useState('');
const [avatarFile, setAvatarFile] = useState(null);

const [isLoading, setIsLoading] = useState(false);
const [errors, setErrors] = useState({
name: '',
email: '',
password: '',
phoneNumber: '',
general: '',
});

const router = useRouter();

const validate = () => {
const newErrors = { name: '', email: '', password: '', phoneNumber: '', general: '' };
let isValid = true;

const trimmedName = name.trim();
const cleanPhone = phoneNumber.replace(/\D/g, '');

if (!trimmedName) {
    newErrors.name = 'Please enter your name';
    isValid = false;
} else if (trimmedName.length < 4) {
    newErrors.name = 'Name must be at least 4 letters';
    isValid = false;
} else if (trimmedName.length > 20) {
    newErrors.name = 'Name cannot exceed 20 letters';
    isValid = false;
} else if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
    newErrors.name = 'Name can only contain letters and spaces';
    isValid = false;
}

if (!email.trim()) {
    newErrors.email = 'Please enter your email address';
    isValid = false;
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newErrors.email = 'Please enter a valid email address';
    isValid = false;
}

if (!password) {
    newErrors.password = 'Please enter your password';
    isValid = false;
} else if (password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters';
    isValid = false;
}

if (!cleanPhone) {
    newErrors.phoneNumber = 'Please enter your phone number';
    isValid = false;
} else if (cleanPhone.length !== 11) {
    newErrors.phoneNumber = 'Phone number must be exactly 11 digits';
    isValid = false;
}

setErrors(newErrors);
return isValid;
};

const handleSubmit = async (e) => {
e.preventDefault();

if (!validate()) return;

setIsLoading(true);
setErrors({ name: '', email: '', password: '', phoneNumber: '', general: '' });

const trimmedName = name.trim();
const cleanPhone = phoneNumber.replace(/\D/g, '');

try {
    const formData = new FormData();
    formData.append('name', trimmedName);
    formData.append('email', email.trim());
    formData.append('password', password);
    formData.append('phoneNumber', cleanPhone);
    if (avatarFile) {
    formData.append('avatar', avatarFile);
    }

    const res = await fetch('/api/admin/session', {
    method: 'POST',
    body: formData,
    });

    const data = await res.json();

    if (res.ok && data.success) {
    router.push('/admin/overview');
    return;
    } else {
    setErrors((prev) => ({
        ...prev,
        general: data.message || 'Authentication failed. Check your credentials.',
    }));
    }
} catch (err) {
    console.error('Session setup error:', err);
    setErrors((prev) => ({
    ...prev,
    general: 'Server connection error. Please try again.',
    }));
} finally {
    setIsLoading(false);
}
};

return (
<div className="w-full max-w-md mx-auto p-8 rounded-2xl bg-[#26221f] border border-[#38322c] shadow-2xl backdrop-blur-sm">
    <div className="text-center mb-6">
    <span className="text-xs font-semibold uppercase tracking-widest text-[#c88346]">
        Portfolio Access
    </span>
    <h1 className="text-3xl font-serif font-medium text-[#f5f2eb] mt-2 mb-2">
        Welcome Back
    </h1>
    <p className="text-sm text-[#a89f91] leading-relaxed">
        Sign in or set up your talent portal to manage your portfolio.
    </p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-4">
    {/* Avatar Upload Component */}
    <AvatarUpload
        value={avatarFile}
        onChange={(file) => setAvatarFile(file)}
        disabled={isLoading}
    />

    {/* Name Input */}
    <div>
        <Input
        type="text"
        placeholder="Full Name / Nickname (4-20 letters)"
        value={name}
        onChange={(e) => {
            const val = e.target.value.replace(/[^a-zA-Z\s]/g, '');
            setName(val);
            if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
        }}
        maxLength={20}
        error={errors.name}
        disabled={isLoading}
        />
    </div>

    {/* Email Input */}
    <div>
        <Input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
        }}
        error={errors.email}
        disabled={isLoading}
        />
    </div>

    {/* Password Input with Eye Icon */}
    <div className="relative">
        <Input
        type={showPassword ? 'text' : 'password'}
        placeholder="Password (Min. 6 characters)"
        value={password}
        onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
        }}
        error={errors.password}
        disabled={isLoading}
        className="pr-10"
        />
        <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-3 text-[#a89f91] hover:text-[#f5f2eb] transition-colors z-10"
        tabIndex={-1}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
    </div>

    {/* Phone Input */}
    <div>
        <Input
        type="tel"
        placeholder="Phone Number (11 digits, e.g. 08012345678)"
        value={phoneNumber}
        onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '');
            if (val.length <= 11) {
            setPhoneNumber(val);
            }
            if (errors.phoneNumber) setErrors((prev) => ({ ...prev, phoneNumber: '' }));
        }}
        maxLength={11}
        error={errors.phoneNumber}
        disabled={isLoading}
        />
    </div>

    {errors.general && (
        <p className="text-xs text-red-400 text-center font-medium py-1">
        {errors.general}
        </p>
    )}

    <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        className="w-full justify-center gap-2 py-3 text-base font-medium mt-2"
    >
        <span>Access Dashboard</span>
        <ArrowRight className="w-4 h-4" />
    </Button>
    </form>
</div>
);
}
