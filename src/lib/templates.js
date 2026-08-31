import React from 'react';
import ModernMockup from '@/components/templates/TemplateMockups/ModernMockup';
import MinimalMockup from '@/components/templates/TemplateMockups/MinimalMockup';
import BentoMockup from '@/components/templates/TemplateMockups/BentoMockup';
import EditorialMockup from '@/components/templates/TemplateMockups/EditorialMockup';

export const TEMPLATES = [
{
id: 'modern',
name: 'Modern Design',
tag: 'Default',
description:
    'A sleek, content-focused layout with balanced sections for hero, skills, projects, experience, education, certifications, services, and client testimonials.',
bestFor:
    'Creators who want a balanced, high-impact hero, project showcase, services grid, and client reviews.',
highlights: [
    'Centered intro with large headline & bio',
    'Clean 2-column project cards layout',
    'Dedicated Education & Certifications 2-column grid',
    'Dedicated Services Offered section (2 Columns)',
    'Integrated Client Reviews & Testimonials showcase (2 Columns)',
],
mockup: <ModernMockup />,
},
{
id: 'minimal',
name: 'Minimalist Layout',
tag: 'Sleek & Text-focused',
description:
    'Distraction-free layout emphasizing strong typography, inline skill tags, clean horizontal dividers, and subtle row interactions.',
bestFor:
    'Writers, software developers, and creators who prefer simple, elegant text-first presentation.',
highlights: [
    'Left-aligned minimal hero with inline skill tags & contact CTA',
    'Full-width project row list with direct detail routing',
    'Clean experience timeline, education background, & credential list',
    'Services list with minimal rate badges',
    'Editorial client reviews with detailed pop-out modal view',
],
mockup: <MinimalMockup />,
},
{
id: 'bento',
name: 'Bento Showcase',
tag: 'Modern Grid',
description:
    'A popular, block-based modular layout organizing your bio, skills, experience, education, certificates, and projects into sleek Bento boxes.',
bestFor:
    'UI/UX designers, digital creators, and tech-focused builders who love structured, modern aesthetics.',
highlights: [
    'Modular 3-column Bento box layout structure',
    'Hero bio block integrated with skill tags & quick action CTA',
    'Featured tall showcase block beside compact project cards',
    'Structured 3-column grid for Experience, Education, & Certifications',
],
mockup: <BentoMockup />,
},
{
id: 'editorial',
name: 'Editorial Grid',
tag: 'Magazine Style',
description:
    'Magazine-style side-by-side header with skills breakdown, numbered credentials, and an asymmetric featured work grid.',
bestFor:
    'Directors and visual artists looking for an asymmetrical, premium agency feel.',
highlights: [
    'Asymmetrical side-by-side split header',
    'Numbered magazine-style project cards (e.g., 01, 02)',
    'Editorial Education background & Certification cards with document preview',
    'Prominent client endorsements & services layout',
],
mockup: <EditorialMockup />,
},
];