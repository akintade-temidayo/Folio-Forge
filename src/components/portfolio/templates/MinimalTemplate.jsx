'use client';

import React from 'react';
import MinimalHero from '@/components/templates/minimal/MinimalHero';
import MinimalProjects from '@/components/templates/minimal/MinimalProjects';
import MinimalExperience from '@/components/templates/minimal/MinimalExperience';
import MinimalEducation from '@/components/templates/minimal/MinimalEducation';
import MinimalCertifications from '@/components/templates/minimal/MinimalCertifications';
import MinimalServices from '@/components/templates/minimal/MinimalServices';
import MinimalTestimonials from '@/components/templates/minimal/MinimalTestimonials';

export default function MinimalTemplate({ 
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
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
    <MinimalHero user={user} />
    <MinimalProjects projects={projects} userHandle={userHandle} />
    <MinimalExperience experiences={experiences} userHandle={userHandle} />
    <MinimalEducation education={education} userHandle={userHandle} />
    <MinimalCertifications certifications={certifications} userHandle={userHandle} />
    <MinimalServices services={services} userHandle={userHandle} />
    <MinimalTestimonials testimonials={testimonials} userHandle={userHandle} />
    </div>
);
}