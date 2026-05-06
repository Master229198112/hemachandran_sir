import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Partner from '@/models/Partner';

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectMongo();
    const { id } = await context.params;
    const body = await req.json();

    const partner = await Partner.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!partner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    return NextResponse.json(partner);
  } catch (error) {
    console.error('Failed to update partner:', error);
    return NextResponse.json({ error: 'Failed to update partner' }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectMongo();
    const { id } = await context.params;

    const partner = await Partner.findByIdAndDelete(id);
    if (!partner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Partner deleted successfully' });
  } catch (error) {
    console.error('Failed to delete partner:', error);
    return NextResponse.json({ error: 'Failed to delete partner' }, { status: 500 });
  }
}
