import { NextResponse } from 'next/server'
import {prisma} from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const period = searchParams.get('period')

  let whereClause = {}
  if (status) {
    whereClause = { ...whereClause, status }
  }

  if (period) {
    const now = new Date()
    let startDate = new Date()
    if (period === 'this-month') {
      startDate.setDate(1)
    } else if (period === 'last-month') {
      startDate.setMonth(startDate.getMonth() - 1)
      startDate.setDate(1)
    }
    whereClause = { ...whereClause, since: { gte: startDate, lte: now } }
  }

  const leads = await prisma.lead.findMany({
    where: whereClause,
    orderBy: { since: 'desc' },
    include: { customer: true },
  })

  return NextResponse.json(leads)
}

export async function POST(request: Request) {
  const body = await request.json()
  
  // First, create or connect the customer
  const customer = await prisma.customer.upsert({
    where: { email: body.email },
    update: {},
    create: {
      name: body.contact,
      email: body.email,
      phone: body.mobile,
      company: body.company,
    },
  })

  const lead = await prisma.lead.create({
    data: {
      company: body.company,
      contact: body.contact,
      designation: body.designation,
      mobile: body.mobile,
      city: body.city,
      state: body.state,
      source: body.source,
      since: body.since,
      poc: body.poc,
      product: body.product,
      status: body.status,
      email: body.email,
      country: body.country,
      requirements: body.requirements,
      notes: body.notes,
      customer: {
        connect: { id: customer.id },
      },
    },
  })
  return NextResponse.json(lead)
}