'use client';

import { useState } from 'react';

export function useFileUpload() {
const [isUploading, setIsUploading] = useState(false);
const [error, setError] = useState('');

const upload = async (file) => {
if (!file) return null;
setIsUploading(true);
setError('');

try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Upload failed');

    return data.url;
} catch (err) {
    setError(err.message);
    return null;
} finally {
    setIsUploading(false);
}
};

return { upload, isUploading, error };
}