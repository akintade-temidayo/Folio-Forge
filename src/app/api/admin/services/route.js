import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';
import Category from '@/models/Category';
import { getSession } from '@/lib/session';

export async function GET() {
try {
await dbConnect();
const session = await getSession();
if (!session?.userId) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
const query = { userId: session.userId };

// Fetch both services and available categories
const [services, categories] = await Promise.all([
    Service.find(query).populate('category').sort({ createdAt: -1 }),
    Category.find(query).sort({ name: 1 }),
]);

return NextResponse.json({ success: true, services, categories });
} catch (error) {
console.error('GET /api/admin/services error:', error);
return NextResponse.json(
    { success: false, message: 'Failed to fetch services data' },
    { status: 500 }
);
}
}

export async function POST(req) {
try {
await dbConnect();
const session = await getSession();
const userId = session?.userId;

if (!userId) {
    return NextResponse.json(
    { success: false, message: 'Unauthorized' },
    { status: 401 }
    );
}

const body = await req.json();
const { title, description, categoryId, category, minPrice, maxPrice, icon } = body;

// Support category passed as categoryId OR category
const selectedCategoryId = categoryId || category;

if (!title || !description || !selectedCategoryId) {
    return NextResponse.json(
    { success: false, message: 'Title, category, and description are required' },
    { status: 400 }
    );
}

// Check if category exists (for this user or fallback globally if unassigned)
const categoryObj = await Category.findOne({
    _id: selectedCategoryId,
    $or: [{ userId }, { userId: { $exists: false } }],
});

if (!categoryObj) {
    return NextResponse.json(
    { success: false, message: 'Invalid category selected' },
    { status: 400 }
    );
}

const service = await Service.create({
    userId,
    category: selectedCategoryId,
    title,
    description,
    minPrice: Number(minPrice) || 0,
    maxPrice: Number(maxPrice) || 0,
    icon: icon || 'Video',
});

const populatedService = await Service.findById(service._id).populate('category');

return NextResponse.json({ success: true, service: populatedService }, { status: 201 });
} catch (error) {
console.error('POST /api/admin/services error:', error);
return NextResponse.json(
    { success: false, message: error.message || 'Failed to create service' },
    { status: 500 }
);
}
}
