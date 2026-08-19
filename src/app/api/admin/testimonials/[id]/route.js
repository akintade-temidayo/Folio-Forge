import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Testimonial from '@/models/Testimonial';
import { getSession } from '@/lib/session';

export async function PUT(request, { params }) {
  try {
    await dbConnect();

    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const { isApproved } = await request.json();
    const testimonial = await Testimonial.findOneAndUpdate(
      { _id: id, userId: session.userId },
      { isApproved: Boolean(isApproved) },
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return NextResponse.json(
        { success: false, message: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, testimonial });
  } catch (error) {
    console.error('PUT /api/admin/testimonials/[id] error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update testimonial' },
      { status: 500 }
    );
  }
}

export async function DELETE(_request, { params }) {
  try {
    await dbConnect();

    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const testimonial = await Testimonial.findOneAndDelete({
      _id: id,
      userId: session.userId,
    });

    if (!testimonial) {
      return NextResponse.json(
        { success: false, message: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    console.error('DELETE /api/admin/testimonials/[id] error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to delete testimonial' },
      { status: 500 }
    );
  }
}
