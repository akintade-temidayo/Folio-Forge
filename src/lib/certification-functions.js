// Helper to auto-generate a fallback Credential ID preview on the client side
export function generateClientCredentialId() {
const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
return `CRT-${Date.now().toString(36).toUpperCase()}-${randomStr}`;
}

// GET: Fetch all certifications for the logged-in user
export async function fetchCertifications() {
const res = await fetch('/api/admin/certifications', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
});
const data = await res.json();
if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to fetch certifications');
}
return data.data;
}

// POST: Create a new certification
export async function createCertification(certData) {
const res = await fetch('/api/admin/certifications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(certData),
});
const data = await res.json();
if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to create certification');
}
return data.data;
}

// PUT: Update an existing certification
export async function updateCertification(id, certData) {
const res = await fetch(`/api/admin/certifications/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(certData),
});
const data = await res.json();
if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to update certification');
}
return data.data;
}

// DELETE: Remove a certification
export async function deleteCertification(id) {
const res = await fetch(`/api/admin/certifications/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
});
const data = await res.json();
if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to delete certification');
}
return data;
}