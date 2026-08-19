import { notFound } from "next/navigation";
import connectDb from "../../../../lib/db";
import Project from "../../../../models/Project";
import ProjectDetailView from "../../../../components/portfolio/ProjectDetailView";
export const dynamic = "force-dynamic";
export default async function ProjectPage({ params }) { const { slug } = await params; let project; try { await connectDb(); project = await Project.findOne({ slug }).populate("category").lean(); } catch { notFound(); } if (!project) notFound(); return <ProjectDetailView project={JSON.parse(JSON.stringify(project))} />; }
