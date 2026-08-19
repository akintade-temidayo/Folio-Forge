'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ProjectLiveLink({ externalLink }) {
if (!externalLink) return null;

return (
<div className="pt-2">
    <a
    href={externalLink}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block"
    >
    <Button variant="primary" size="lg" className="gap-2 shadow-md">
        <span>View Live Project</span>
        <ExternalLink className="w-4 h-4" />
    </Button>
    </a>
</div>
);
}