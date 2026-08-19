'use client';

import React, { useState, useEffect } from 'react';
import  { Joyride, STATUS } from 'react-joyride';

const STEPS = [
{
target: '[data-tour="tour-info-icon"]',
title: 'Welcome to FolioForge!',
content: 'You can reopen this guide anytime by clicking this icon.',
disableBeacon: true,
placement: 'right',
},
{
target: '[data-tour="tour-overview"]',
title: 'Overview',
content: 'Copy your unique Public Portfolio Link or click Live Preview to see how potential clients view your page , and choose your portfolio color theme and template.',
placement: 'right',
},
{
target: '[data-tour="tour-projects"]',
title: 'Projects',
content: 'Upload and manage your showcase entries - video links, design mockups, photo galleries, or case studies.',
placement: 'right',
},
{
target: '[data-tour="tour-experience"]',
title: 'Work Experience',
content: 'Add your career history, past agencies, client milestones, and job descriptions.',
placement: 'right',
},
{
target: '[data-tour="tour-services"]',
title: 'Services',
content: 'Set up the creative or technical services you offer, along with pricing and turnaround times.',
placement: 'right',
},
{
target: '[data-tour="tour-categories"]',
title: 'Categories',
content: 'Group your work into tags so clients can filter your portfolio easily.',
placement: 'right',
},
{
target: '[data-tour="tour-testimonials"]',
title: 'Testimonials',
content: 'Approve or manage incoming feedback submitted by past clients before it goes live.',
placement: 'right',
},
{
target: '[data-tour="tour-profile-nav"]',
title: 'Profile & Settings',
content: 'Edit your creator identity, avatar photo, bio, and social links.',
placement: 'right',
},
];

export default function OnboardingTour({ run, onEnd }) {
const [isMounted, setIsMounted] = useState(false);

// Prevents SSR hydration mismatch
useEffect(() => {
const timeout = setTimeout(() => {
    setIsMounted(true);
}, 0);

return () => clearTimeout(timeout);
}, []);

const handleCallback = (data) => {
const { status } = data;
if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
    if (onEnd) onEnd();
}
};

if (!isMounted || !run) return null;

return (
<Joyride
    steps={STEPS}
    run={run}
    continuous
    showSkipButton
    showProgress
    scrollToFirstStep
    callback={handleCallback}
    styles={{
    options: {
        backgroundColor: 'var(--bg-surface, #1c1917)',
        textColor: 'var(--text-primary, #f5f5f4)',
        arrowColor: 'var(--bg-surface, #1c1917)',
        primaryColor: 'var(--accent-warm, #d97706)',
        overlayColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 10000,
    },
    tooltip: {
        borderRadius: '16px',
        border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.12))',
        padding: '16px 20px',
    },
    tooltipContainer: {
        textAlign: 'left',
        fontSize: '13px',
        lineHeight: '1.6',
    },
    buttonNext: {
        backgroundColor: 'var(--accent-warm, #d97706)',
        color: '#1c1917',
        borderRadius: '8px',
        fontSize: '12px',
        fontWeight: 'bold',
        padding: '8px 16px',
        outline: 'none',
    },
    buttonBack: {
        color: 'var(--text-secondary, #a8a29e)',
        fontSize: '12px',
        marginRight: '8px',
    },
    buttonSkip: {
        color: 'var(--text-secondary, #a8a29e)',
        fontSize: '12px',
    },
    }}
/>
);
}