import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: { customer: true, order: true },
    });
    return NextResponse.json(invoices);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching invoices' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const invoice = await prisma.invoice.create({
      data: body,
      include: { customer: true, order: true },
    });
    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating invoice' }, { status: 500 });
  }
}