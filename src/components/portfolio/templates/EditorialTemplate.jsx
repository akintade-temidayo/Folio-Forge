import EditorialHero from '@/components/templates/editorial/EditorialHero';
import EditorialProjects from '@/components/templates/editorial/EditorialProjects'
import EditorialExperience from '@/components/templates/editorial/EditorialExperience'
import EditorialServices from '@/components/templates/editorial/EditorialServices'
import EditorialTestimonials from '@/components/templates/editorial/EditorialTestimonials'

export default function EditorialTemplate({ 
    user, 
    projects = [], 
    services = [], 
    testimonials = [], 
    experiences = [] 
}) {
return (
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-20">
        <EditorialHero user={user} />
        <EditorialProjects projects={projects} userHandle={user?.handle} />
        <EditorialExperience experiences={experiences} userHandle={user?.handle} />
        <EditorialServices services={services} userHandle={user?.handle} />
        <EditorialTestimonials testimonials={testimonials} userHandle={user?.handle} />
    </div>
);
}