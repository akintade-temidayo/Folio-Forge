import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { getSession } from '@/lib/session';
import User from '@/models/User';
import Category from '@/models/Category';
import Project from '@/models/Project';
import Experience from '@/models/Experience';
import Education from '@/models/Education';
import Certification from '@/models/Certification';
import Service from '@/models/Service';
import Testimonial from '@/models/Testimonial';

const formatActivity = (item, type, title) => ({
  id: `${type}-${item._id}`,
  type,
  title,
  createdAt: item.updatedAt || item.createdAt,
});

export async function GET() {
  try {
    const session = await getSession();
    const userId = session?.userId;

    if (!userId) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const userFilter = { userId };
    const certificationFilter = { user: userId };
    const [
      user,
      categoryCount,
      projectCount,
      experienceCount,
      educationCount,
      certificationCount,
      serviceCount,
      testimonialCount,
      invalidServiceCount,
      recentProjects,
      recentExperiences,
      recentEducation,
      recentCertifications,
      recentServices,
      recentTestimonials,
    ] = await Promise.all([
      User.findById(userId).select('name bio handle').lean(),
      Category.countDocuments(userFilter),
      Project.countDocuments(userFilter),
      Experience.countDocuments(userFilter),
      Education.countDocuments(certificationFilter),
      Certification.countDocuments(certificationFilter),
      Service.countDocuments(userFilter),
      Testimonial.countDocuments(userFilter),
      Service.countDocuments({ ...userFilter, minPrice: { $lte: 0 } }),
      Project.find(userFilter).select('title createdAt updatedAt').sort({ updatedAt: -1 }).limit(5).lean(),
      Experience.find(userFilter).select('role company createdAt updatedAt').sort({ updatedAt: -1 }).limit(5).lean(),
      Education.find(certificationFilter).select('degree institution createdAt updatedAt').sort({ updatedAt: -1 }).limit(5).lean(),
      Certification.find(certificationFilter).select('title createdAt updatedAt').sort({ updatedAt: -1 }).limit(5).lean(),
      Service.find(userFilter).select('title createdAt updatedAt').sort({ updatedAt: -1 }).limit(5).lean(),
      Testimonial.find(userFilter).select('clientName createdAt updatedAt').sort({ updatedAt: -1 }).limit(5).lean(),
    ]);

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const rules = [
      {
        id: 'profile',
        label: 'Profile identity',
        description: 'Add a display name and bio before publishing your Public Link.',
        complete: Boolean(user.name?.trim() && user.bio?.trim()),
        weight: 20,
        href: '/admin/profile',
      },
      {
        id: 'categories',
        label: 'Categories first',
        description: 'Create at least one Category before adding a Project or Service.',
        complete: categoryCount > 0,
        weight: 20,
        href: '/admin/categories',
      },
      {
        id: 'projects',
        label: 'Minimum projects',
        description: `Add ${Math.max(2 - projectCount, 0)} more project${projectCount === 1 ? '' : 's'} to activate your Public Link.`,
        complete: projectCount >= 2,
        weight: 30,
        href: '/admin/projects',
      },
      {
        id: 'timeline',
        label: 'Career timeline',
        description: 'Add an Experience or Education entry to strengthen your portfolio.',
        complete: experienceCount > 0 || educationCount > 0,
        weight: 15,
        href: experienceCount > 0 ? '/admin/education' : '/admin/experience',
      },
      {
        id: 'pricing',
        label: 'Service pricing',
        description: 'Every service needs a valid starting price before it can appear on your live page.',
        complete: serviceCount === 0 || invalidServiceCount === 0,
        weight: 15,
        href: '/admin/services',
      },
    ];

    const completion = rules.reduce((total, rule) => total + (rule.complete ? rule.weight : 0), 0);
    const nextRule = rules.find((rule) => !rule.complete) || null;
    const recentActivity = [
      ...recentProjects.map((item) => formatActivity(item, 'Project', item.title)),
      ...recentExperiences.map((item) => formatActivity(item, 'Experience', `${item.role} at ${item.company}`)),
      ...recentEducation.map((item) => formatActivity(item, 'Education', `${item.degree} at ${item.institution}`)),
      ...recentCertifications.map((item) => formatActivity(item, 'Certification', item.title)),
      ...recentServices.map((item) => formatActivity(item, 'Service', item.title)),
      ...recentTestimonials.map((item) => formatActivity(item, 'Testimonial', `Feedback from ${item.clientName}`)),
    ]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    return NextResponse.json({
      success: true,
      user: { name: user.name, handle: user.handle },
      completion,
      nextRule,
      rules,
      counts: {
        categories: categoryCount,
        projects: projectCount,
        experiences: experienceCount,
        education: educationCount,
        certifications: certificationCount,
        services: serviceCount,
        testimonials: testimonialCount,
      },
      publicLinkReady: rules.slice(0, 3).every((rule) => rule.complete),
      recentActivity,
    });
  } catch (error) {
    console.error('GET /api/admin/overview error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to load overview' },
      { status: 500 }
    );
  }
}
