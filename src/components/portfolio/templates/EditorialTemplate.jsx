'use client';

import React from 'react';
import EditorialHero from '@/components/templates/editorial/EditorialHero';
import EditorialProjects from '@/components/templates/editorial/EditorialProjects';
import EditorialExperience from '@/components/templates/editorial/EditorialExperience';
import EditorialEducation from '@/components/templates/editorial/EditorialEducation';
import EditorialCertifications from '@/components/templates/editorial/EditorialCertifications';
import EditorialServices from '@/components/templates/editorial/EditorialServices';
import EditorialTestimonials from '@/components/templates/editorial/EditorialTestimonials';

export default function EditorialTemplate({ 
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
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-20">
    <EditorialHero user={user} />
    <EditorialProjects projects={projects} userHandle={userHandle} />
    <EditorialExperience experiences={experiences} userHandle={userHandle} />
    <EditorialEducation education={education} userHandle={userHandle} />
    <EditorialCertifications certifications={certifications} userHandle={userHandle} />
    <EditorialServices services={services} userHandle={userHandle} />
    <EditorialTestimonials testimonials={testimonials} userHandle={userHandle} />
    </div>
);
}