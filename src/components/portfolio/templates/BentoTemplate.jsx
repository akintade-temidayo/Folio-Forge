'use client';

import React from 'react';
import BentoHero from '@/components/templates/bento/BentoHero';
import BentoProjects from '@/components/templates/bento/BentoProjects';
import BentoExperience from '@/components/templates/bento/BentoExperience';
import BentoServices from '@/components/templates/bento/BentoServices';
import BentoTestimonials from '@/components/templates/bento/BentoTestimonials';

export default function BentoTemplate({ 
user, 
projects = [], 
services = [], 
testimonials = [], 
experiences = [] 
}) {
return (
<div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
    {/* 1. Bento Top Hero Row */}
    <BentoHero user={user} />

    {/* 2. Bento Projects Section */}
    <BentoProjects projects={projects} userHandle={user?.handle} />
    
    {/* 3. Bento Experience */}
    <BentoExperience experiences={experiences} userHandle={user?.handle} />

    {/* 4. Bento Services */}
    <BentoServices services={services} userHandle={user?.handle} />

    {/* 5. Bento Testimonials */}
    <BentoTestimonials testimonials={testimonials} userHandle={user?.handle} />
</div>
);
}
