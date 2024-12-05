import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { customer: true, quote: true },
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const order = await prisma.order.create({
      data: body,
      include: { customer: true, quote: true },
    });
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}