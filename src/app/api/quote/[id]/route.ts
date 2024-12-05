import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

type Context = {
  params: { id: string }
}

export async function GET(_: Request, { params }: Context) {
  try {
    const quote = await prisma.quote.findUnique({
      where: { id: Number(params.id) },
      include: {
        customer: true,
        items: true,
        terms: true
      }
    })
    
    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 })
    }

    return NextResponse.json(quote)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch quote' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: Context) {
  // ... PUT logic ...
}

export async function DELETE(_: Request, { params }: Context) {
  // ... DELETE logic ...
} 