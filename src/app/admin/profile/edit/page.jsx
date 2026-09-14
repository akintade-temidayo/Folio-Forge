'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import AvatarUpload from '@/components/ui/AvatarUpload';
import MultiSelect from '@/components/ui/MultiSelect';
import { EXPERTISE_OPTIONS, getSkillsForExpertise } from '@/lib/expertiseOptions';
import { User, Mail, Phone, Save, ArrowLeft,  Globe } from 'lucide-react';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { toast } from 'sonner';

export default function EditProfilePage() {
const router = useRouter();

const [profile, setProfile] = useState({
name: '',
email: '',
phoneNumber: '',
bio: '',
avatarUrl: '',
socialLinks: { linkedin: '', instagram: '', twitter: '', github: '', website: '' },
expertise: [],
skills: [],
});

const [avatarFile, setAvatarFile] = useState(null);
const [isLoading, setIsLoading] = useState(true);
const [isSaving, setIsSaving] = useState(false);
const [errorMsg, setErrorMsg] = useState('');

useEffect(() => {
async function fetchProfile() {
    try {
    setIsLoading(true);
    const res = await fetch('/api/admin/profile');
    if (!res.ok) throw new Error('Failed to fetch profile data');

    const data = await res.json();
    if (data.user) {
        setProfile({
        name: data.user.name || '',
        email: data.user.email || '',
        phoneNumber: data.user.phoneNumber || '',
        bio: data.user.bio || '',
        avatarUrl: data.user.avatarUrl || '',
        socialLinks: {
            linkedin: data.user.socialLinks?.linkedin || '',
            instagram: data.user.socialLinks?.instagram || '',
            twitter: data.user.socialLinks?.twitter || '',
            github: data.user.socialLinks?.github || '',
            website: data.user.socialLinks?.website || '',
        },
        expertise: data.user.expertise || [],
        skills: data.user.skills || [],
        });
    }
    } catch (err) {
    console.error('Profile fetch error:', err);
    setErrorMsg('Failed to load profile details.');
    } finally {
    setIsLoading(false);
    }
}

fetchProfile();
}, []);

const skillSuggestions = useMemo(() => getSkillsForExpertise(profile.expertise), [profile.expertise]);

const handleSave = async (e) => {
e.preventDefault();
setIsSaving(true);
setErrorMsg('');

try {
    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('email', profile.email);
    formData.append('phoneNumber', profile.phoneNumber);
    formData.append('bio', profile.bio);
    formData.append('socialLinks', JSON.stringify(profile.socialLinks));
    formData.append('expertise', JSON.stringify(profile.expertise));
    formData.append('skills', JSON.stringify(profile.skills));

    if (avatarFile) {
    formData.append('avatar', avatarFile);
    }

    const res = await fetch('/api/admin/profile', {
    method: 'PUT',
    body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update profile');

    toast.warning('Profile updated successfully.');
    router.push('/admin/profile');
} catch (err) {
    console.error('Update error:', err);
    setErrorMsg(err.message || 'Error saving changes');
} finally {
    setIsSaving(false);
}
};

if (isLoading) {
return (
    <div className="py-20 text-center animate-pulse" style={{ color: 'var(--text-secondary)' }}>
    Loading profile...
    </div>
);
}

return (
<div className="space-y-6 pb-12">
    <button
    onClick={() => router.push('/admin/profile')}
    className="inline-flex items-center gap-1.5 text-xs font-medium hover:underline"
    style={{ color: 'var(--text-secondary)' }}
    >
    <ArrowLeft className="w-3.5 h-3.5" /> Back to Profile
    </button>

    <h1 className="text-2xl font-serif font-medium" style={{ color: 'var(--text-primary)' }}>
    Edit Profile
    </h1>

    <form
    onSubmit={handleSave}
    className="p-6 md:p-8 rounded-2xl border space-y-6"
    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
    >
    <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-6" style={{ borderColor: 'var(--border-subtle)' }}>
        <AvatarUpload value={profile.avatarUrl} onChange={(file) => setAvatarFile(file)} disabled={isSaving} fill />
        <div className="text-center md:text-left">
        <h3 className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>Profile Picture</h3>
        <p className="text-xs mt-1 max-w-sm" style={{ color: 'var(--text-secondary)' }}>
            Upload a clear photo or logo.
        </p>
        </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
        <label className="text-xs font-medium mb-2 flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
            <User className="w-3.5 h-3.5" /> Name
        </label>
        <Input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} disabled={isSaving} required />
        </div>

        <div>
        <label className="text-xs font-medium mb-2 flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
            <Mail className="w-3.5 h-3.5" /> Email Address
        </label>
        <Input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} disabled={isSaving} required />
        </div>

        <div className="md:col-span-2">
        <label className="text-xs font-medium mb-2 flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
            <Phone className="w-3.5 h-3.5" /> Phone Number (11 digits)
        </label>
        <Input
            type="tel"
            value={profile.phoneNumber}
            onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value.replace(/\D/g, '') })}
            maxLength={11}
            disabled={isSaving}
        />
        </div>

        <div className="md:col-span-2">
        <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            Public Bio / About Me
        </label>
        <textarea
            rows={5}
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            disabled={isSaving}
            className="w-full px-4 py-3 rounded-xl text-sm resize-none focus:outline-none transition-colors"
            style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)', borderWidth: '1px' }}
        />
        </div>
    </div>

    <div className="border-t pt-6 space-y-5" style={{ borderColor: 'var(--border-subtle)' }}>
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
            <label className="text-xs font-medium mb-2 flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
            <FaLinkedin className="w-3.5 h-3.5" /> LinkedIn
            </label>
            <Input
            type="url"
            placeholder="https://linkedin.com/in/..."
            value={profile.socialLinks.linkedin}
            onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, linkedin: e.target.value } })}
            disabled={isSaving}
            />
        </div>
        <div>
            <label className="text-xs font-medium mb-2 flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
            <FaInstagram className="w-3.5 h-3.5" /> Instagram
            </label>
            <Input
            type="url"
            placeholder="https://instagram.com/..."
            value={profile.socialLinks.instagram}
            onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, instagram: e.target.value } })}
            disabled={isSaving}
            />
        </div>
        <div>
            <label className="text-xs font-medium mb-2 flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
            <FaTwitter className="w-3.5 h-3.5" /> Twitter / X
            </label>
            <Input
            type="url"
            placeholder="https://x.com/..."
            value={profile.socialLinks.twitter}
            onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, twitter: e.target.value } })}
            disabled={isSaving}
            />
        </div>
        <div>
            <label className="text-xs font-medium mb-2 flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
            <FaGithub className="w-3.5 h-3.5" /> GitHub
            </label>
            <Input
            type="url"
            placeholder="https://github.com/..."
            value={profile.socialLinks.github}
            onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, github: e.target.value } })}
            disabled={isSaving}
            />
        </div>
        </div>
    </div>

    <div className="border-t pt-6 space-y-5" style={{ borderColor: 'var(--border-subtle)' }}>
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Expertise & Skills</h3>

        <MultiSelect
        label="Areas of Expertise"
        options={EXPERTISE_OPTIONS}
        value={profile.expertise}
        onChange={(newExpertise) => {
            // Drop skills that no longer belong to any selected expertise area
            const validSkills = getSkillsForExpertise(newExpertise);
            setProfile({
            ...profile,
            expertise: newExpertise,
            skills: profile.skills.filter((s) => validSkills.includes(s) || !skillSuggestions.includes(s)),
            });
        }}
        placeholder="Select your areas of expertise"
        />

        <MultiSelect
        label="Skills"
        options={skillSuggestions}
        value={profile.skills}
        onChange={(newSkills) => setProfile({ ...profile, skills: newSkills })}
        placeholder={profile.expertise.length === 0 ? 'Pick an expertise area first' : 'Select or add skills'}
        allowCustom
        />
    </div>

    {errorMsg && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
        {errorMsg}
        </div>
    )}

    <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={() => router.push('/admin/profile')} disabled={isSaving}>
        Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isSaving} className="px-6 py-2.5 gap-2">
        <Save className="w-4 h-4" />
        <span>Save Changes</span>
        </Button>
    </div>
    </form>
</div>
);
}