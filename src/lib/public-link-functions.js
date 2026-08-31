import { THEMES } from '@/lib/themes';
import { TEMPLATES } from '@/lib/templates';

export function pickRandomTemplates(currentTemplateId) {
const shuffled = [...TEMPLATES].sort(() => 0.5 - Math.random());
const selectedObj = TEMPLATES.find((t) => t.id === currentTemplateId);
const picked = shuffled.slice(0, 3);

if (selectedObj && !picked.some((t) => t.id === currentTemplateId)) {
    picked[0] = selectedObj;
}
return picked;
}

export function pickInitialTemplates(currentTemplateId) {
const picked = TEMPLATES.slice(0, 3);
const selectedObj = TEMPLATES.find((t) => t.id === currentTemplateId);

if (selectedObj && !picked.some((t) => t.id === currentTemplateId)) {
    picked[0] = selectedObj;
}
return picked;
}

export async function copyToClipboard(text) {
try {
    await navigator.clipboard.writeText(text);
    return true;
} catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
}
}

export async function updatePortfolioTheme(themeId) {
const res = await fetch('/api/admin/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ portfolioTheme: themeId }),
});
const data = await res.json();
if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to update theme');
}
return data;
}

export async function updatePortfolioTemplate(templateId) {
const res = await fetch('/api/admin/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ portfolioTemplate: templateId }),
});
const data = await res.json();
if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to update template');
}
return data;
}