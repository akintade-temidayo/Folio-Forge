'use client';

import React from 'react';
import MinimalHero from '@/components/templates/minimal/MinimalHero';
import MinimalProjects from '@/components/templates/minimal/MinimalProjects'
import MinimalExperience from '@/components/templates/minimal/MinimalExperience';
import MinimalServices from '@/components/templates/minimal/MinimalServices';
import MinimalTestimonials from '@/components/templates/minimal/MinimalTestimonials';

export default function MinimalTemplate({ 
user, 
projects = [], 
services = [], 
testimonials = [], 
experiences = [] 
}) {
return (
<div className="max-w-4xl mx-auto px-6 py-16 space-y-16">

<MinimalHero user={user} />
<MinimalProjects projects={projects} userHandle={user?.handle} />
<MinimalExperience experiences={experiences} userHandle={user?.handle} />
<MinimalServices services={services} userHandle={user?.handle} />
<MinimalTestimonials testimonials={testimonials} userHandle={user?.handle} />

</div>
);
}