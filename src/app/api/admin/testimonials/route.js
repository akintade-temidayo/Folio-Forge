import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Testimonial from '@/models/Testimonial';
import { getSession } from '@/lib/session';

// Lists every review submitted to the signed-in portfolio owner.
export async function GET() {
  try {
    await dbConnect();

    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const testimonials = await Testimonial.find({ userId: session.userId }).sort({
      createdAt: -1,
    });

    return NextResponse.json({ success: true, testimonials });
  } catch (error) {
    console.error('GET /api/admin/testimonials error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}
