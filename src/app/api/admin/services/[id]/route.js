import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';
import { getSession } from '@/lib/session';

export async function DELETE(_request, { params }) {
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

    const { id } = await params;
    const deletedService = await Service.findOneAndDelete({ _id: id, userId });

    if (!deletedService) {
    return NextResponse.json(
        { success: false, message: 'Service not found' },
        { status: 404 }
    );
    }

    return NextResponse.json({ success: true, message: 'Service deleted successfully' });
} catch (error) {
    console.error('DELETE /api/admin/services/[id] error:', error);
    return NextResponse.json(
    { success: false, message: 'Failed to delete service' },
    { status: 500 }
    );
}
}
