'use client';

import { useEffect } from 'react';

export default function ScrollToHashOnLoad() {
useEffect(() => {
if (!window.location.hash) return;

const id = window.location.hash.slice(1);
// Give the page a moment to fully render before measuring scroll position
const timer = setTimeout(() => {
    const element = document.getElementById(id);
    if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    }
}, 100);

return () => clearTimeout(timer);
}, []);

return null;
}