'use client';

import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

export default function CountdownTimer({ 
initialSeconds = 120, 
onExpire, 
className = '' 
}) {
const [timeLeft, setTimeLeft] = useState(initialSeconds);

useEffect(() => {
if (timeLeft <= 0) {
    if (onExpire) onExpire();
    return;
}

const timerId = setInterval(() => {
    setTimeLeft((prev) => prev - 1);
}, 1000);

return () => clearInterval(timerId);
}, [timeLeft, onExpire]);

// Format seconds into MM:SS
const formatTime = (seconds) => {
const mins = Math.floor(seconds / 60);
const secs = seconds % 60;
return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const isExpired = timeLeft <= 0;

return (
<div
    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium transition-colors ${
    isExpired
        ? 'bg-red-500/10 border border-red-500/20 text-red-400'
        : timeLeft <= 30
        ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400 animate-pulse'
        : 'bg-white/5 border border-white/10 text-amber-400'
    } ${className}`}
>
    <Timer className="w-3.5 h-3.5" />
    <span>{isExpired ? 'Code Expired' : formatTime(timeLeft)}</span>
</div>
);
}