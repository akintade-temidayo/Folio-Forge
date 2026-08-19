import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Category from '@/models/Category';
import { getSession } from '@/lib/session';

// GET ALL CATEGORIES
export async function GET() {
try {
await connectDB();

const session = await getSession();
if (!session?.userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
}

const categories = await Category.find({ userId: session.userId }).sort({ createdAt: -1 });
return NextResponse.json(categories, { status: 200 });
} catch (error) {
console.error('Error fetching categories:', error);
return NextResponse.json(
    { message: 'Failed to fetch categories', error: error.message },
    { status: 500 }
);
}
}

// CREATE A NEW CATEGORY
export async function POST(req) {
try {
await connectDB();

const session = await getSession();
if (!session?.userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
}

const body = await req.json();
const { name, description } = body;

if (!name || typeof name !== 'string' || !name.trim()) {
    return NextResponse.json({ message: 'Category name is required.' }, { status: 400 });
}

const trimmedName = name.trim();

const slug = trimmedName
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

const existingCategory = await Category.findOne({
    userId: session.userId,
    $or: [{ name: new RegExp(`^${trimmedName}$`, 'i') }, { slug }],
});

if (existingCategory) {
    return NextResponse.json(
    { message: `Category "${trimmedName}" already exists!` },
    { status: 400 }
    );
}

const newCategory = await Category.create({
    userId: session.userId,
    name: trimmedName,
    slug,
    description: description || '',
});

return NextResponse.json(newCategory, { status: 201 });
} catch (error) {
console.error('Error creating category:', error);
return NextResponse.json(
    { message: error.message || 'Failed to create category' },
    { status: 500 }
);
}
}
