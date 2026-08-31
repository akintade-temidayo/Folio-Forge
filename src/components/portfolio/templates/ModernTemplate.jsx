import ModernHero from '@/components/templates/modern/ModernHero';
import ModernProjects from '@/components/templates/modern/ModernProjects';
import ModernExperience from '@/components/templates/modern/ModernExperience';
import ModernEducation from '@/components/templates/modern/ModernEducation';
import ModernCertifications from '@/components/templates/modern/ModernCertifications';
import ModernServices from '@/components/templates/modern/ModernServices';
import ModernTestimonials from '@/components/templates/modern/ModernReviews';
import ScrollToHashOnLoad from '@/components/portfolio/ScrollToHashOnLoad';

export default function ModernTemplate({
user,
projects = [],
experiences = [],
education = [],
certifications = [],
services = [],
testimonials = [],
}) {
const handle = user?.handle || user?.username || '';

return (
    <div className="w-full space-y-12">
    <ScrollToHashOnLoad />

    <ModernHero user={user} />
    <ModernProjects projects={projects} handle={handle} />
    <ModernExperience experiences={experiences} handle={handle} />
    <ModernEducation education={education} handle={handle} />
    <ModernCertifications certifications={certifications} handle={handle} />
    <ModernServices services={services} handle={handle} />
    <ModernTestimonials testimonials={testimonials} handle={handle} />
    </div>
);
}