'use client';

import React from 'react';
import BentoHero from '@/components/templates/bento/BentoHero';
import BentoProjects from '@/components/templates/bento/BentoProjects';
import BentoExperience from '@/components/templates/bento/BentoExperience';
import BentoEducation from '@/components/templates/bento/BentoEducation';
import BentoCertifications from '@/components/templates/bento/BentoCertifications';
import BentoServices from '@/components/templates/bento/BentoServices';
import BentoTestimonials from '@/components/templates/bento/BentoTestimonials';

export default function BentoTemplate({ 
user, 
projects = [], 
services = [], 
testimonials = [], 
experiences = [],
education = [],
certifications = []
}) {
const userHandle = user?.handle || user?.username || '';

return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
    {/* 1. Bento Top Hero Row */}
    <BentoHero user={user} />

    {/* 2. Bento Projects Section */}
    <BentoProjects projects={projects} userHandle={userHandle} />
    
    {/* 3. Bento Experience */}
    <BentoExperience experiences={experiences} userHandle={userHandle} />

    {/* 4. Bento Education */}
    <BentoEducation education={education} userHandle={userHandle} />

    {/* 5. Bento Certifications */}
    <BentoCertifications certifications={certifications} userHandle={userHandle} />

    {/* 6. Bento Services */}
    <BentoServices services={services} userHandle={userHandle} />

    {/* 7. Bento Testimonials */}
    <BentoTestimonials testimonials={testimonials} userHandle={userHandle} />
    </div>
);
}