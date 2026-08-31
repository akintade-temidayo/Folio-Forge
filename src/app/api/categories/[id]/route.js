import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Category from '@/models/Category';
import Project from '@/models/Project';
import Service from '@/models/Service';
import { getSession } from '@/lib/session';

async function getAuthorizedCategory(id) {
const session = await getSession();
if (!session?.userId) return { error: 'Unauthorized', status: 401 };

await connectDB();
const category = await Category.findOne({ _id: id, userId: session.userId });

if (!category) return { error: 'Category not found', status: 404 };

return { category, session };
}

export async function PUT(request, { params }) {
try {
    const { id } = await params;
    const result = await getAuthorizedCategory(id);

    if (result.error) {
    return NextResponse.json({ error: result.error }, { status: result.status });
    }

    const { name } = await request.json();
    if (!name || typeof name !== 'string' || !name.trim()) {
    return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    result.category.name = name.trim();
    await result.category.save();

    return NextResponse.json(result.category);
} catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to update category' }, { status: 400 });
}
}

export async function DELETE(_request, { params }) {
try {
    const { id } = await params;
    const result = await getAuthorizedCategory(id);

    if (result.error) {
    return NextResponse.json({ error: result.error }, { status: result.status });
    }

    const [projectCount, serviceCount] = await Promise.all([
    Project.countDocuments({ userId: result.session.userId, category: id }),
    Service.countDocuments({ userId: result.session.userId, category: id }),
    ]);

    if (projectCount || serviceCount) {
    return NextResponse.json(
        {
        error: 'This category is still in use.',
        message: `Move or delete its ${projectCount + serviceCount} linked item(s) before deleting the category.`,
        },
        { status: 409 }
    );
    }

    await result.category.deleteOne();
    return NextResponse.json({ message: 'Category deleted successfully' });
} catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to delete category' }, { status: 400 });
}
}
