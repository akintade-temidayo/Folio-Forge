'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function WelcomeGreeting() {
const [visitorName] = useState(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('visitorName') || '';
});

if (!visitorName) return null;

return (
<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#26221f] border border-[#38322c] text-xs font-medium text-[#f5f2eb]">
    <Sparkles className="w-3.5 h-3.5 text-[#c88346]" />
    <span>Welcome, <strong className="text-[#c88346] font-semibold">{visitorName}</strong></span>
</div>
);
}