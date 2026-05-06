import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Partner from '@/models/Partner';

export async function GET() {
  try {
    await connectMongo();
    const partners = await Partner.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(partners);
  } catch (error) {
    console.error('Failed to fetch partners:', error);
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectMongo();
    const body = await req.json();
    const partner = await Partner.create(body);
    
    return NextResponse.json(partner, { status: 201 });
  } catch (error) {
    console.error('Failed to create partner:', error);
    return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
  }
}
