// src/app/(public)/[handle]/project/[id]/page.jsx
import React from 'react';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Project from '@/models/Project';
import '@/models/Category';
import { notFound } from 'next/navigation';

import ProjectHeader from '@/components/portfolio/project/ProjectHeader';
import ProjectMedia from '@/components/portfolio/project/ProjectMedia';
import ProjectContent from '@/components/portfolio/project/ProjectContent';
import ProjectLiveLink from '@/components/portfolio/project/ProjectLiveLink';
import RelatedProjects from '@/components/portfolio/project/RelatedProjects';

export default async function ProjectDetailPage({ params }) {
const { handle, id } = await params;

await dbConnect();

let project = null;
let allProjects = [];

try {
const cleanHandle = String(handle || '').trim().toLowerCase();
const portfolioOwner = await User.findOne({ handle: cleanHandle }).select('_id').lean();

if (!portfolioOwner) {
    notFound();
}

project = await Project.findOne({
    _id: id,
    userId: portfolioOwner._id,
}).populate('category').lean();

if (project) {
    allProjects = await Project.find({ userId: portfolioOwner._id })
    .select('title projectType images videoUrl previewClip category')
    .populate('category')
    .lean();
}
} catch (e) {
notFound();
}

if (!project) {
notFound();
}

// Plain-JSON both before handing off to client components (strips ObjectId/Date wrappers)
const serializedProject = JSON.parse(JSON.stringify(project));
const serializedAllProjects = JSON.parse(JSON.stringify(allProjects));

return (
<main className="min-h-screen bg-(--bg-main) text-(--text-primary) px-4 py-8 md:px-12 md:py-12">
    <div className="max-w-4xl mx-auto space-y-8">
    <ProjectHeader project={serializedProject} handle={handle} />
    <ProjectMedia project={serializedProject} />
    <ProjectLiveLink externalLink={serializedProject.externalLink} />
    <ProjectContent description={serializedProject.description} />
    <RelatedProjects
        projects={serializedAllProjects}
        currentProjectId={serializedProject._id}
        handle={handle}
    />
    </div>
</main>
);
}
