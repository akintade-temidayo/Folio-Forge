import ModernHero from '@/components/templates/modern/ModernHero';
import ModernProjects from '@/components/templates/modern/ModernProjects';
import ModernServices from '@/components/templates/modern/ModernServices';
import ModernTestimonials from '@/components/templates/modern/ModernReviews';
import ModernExperience from '@/components/templates/modern/ModernExperience';
import ScrollToHashOnLoad from '@/components/portfolio/ScrollToHashOnLoad';

export default function ModernTemplate({
user,
projects = [],
experiences = [],
services = [],
testimonials = [],
}) {
const handle = user?.handle || user?.username || '';

return (
<div className="w-full space-y-8">
    <ScrollToHashOnLoad />

    <ModernHero user={user} />
    <ModernProjects projects={projects} handle={handle} />
    <ModernExperience experiences={experiences} handle={handle} />
    <ModernServices services={services} handle={handle} />
    <ModernTestimonials testimonials={testimonials} handle={handle} />
</div>
);
}