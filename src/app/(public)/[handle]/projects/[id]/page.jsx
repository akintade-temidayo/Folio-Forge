// src/app/(public)/[handle]/project/[id]/page.jsx
import React from 'react';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
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
project = await Project.findById(id).populate('category').lean();

if (project) {
    allProjects = await Project.find({ userId: project.userId })
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
