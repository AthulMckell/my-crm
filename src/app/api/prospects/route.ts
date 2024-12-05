import { NextResponse } from 'next/server'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'active'

    const prospects = await prisma.prospect.findMany({
      where: {
        stage: status === 'active'
          ? { not: { in: ['CLOSED_WON', 'CLOSED_LOST'] } }
          : { in: ['CLOSED_WON', 'CLOSED_LOST'] }
      },
      include: {
        customer: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ success: true, data: prospects })
  } catch (error) {
    console.error('Error fetching prospects:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'An unexpected error occurred' 
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Log the raw request body for debugging
    const requestBody = await request.text()
    console.log('Raw request body:', requestBody)

    // Try to parse the body
    let body;
    try {
      body = JSON.parse(requestBody)
    } catch (parseError) {
      console.error('JSON parsing error:', parseError)
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid JSON in request body' 
      }, { status: 400 })
    }

    // Validate request body
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid request body' 
      }, { status: 400 })
    }

    // Validate required fields
    const requiredFields = ['company', 'firstName', 'lastName', 'email', 'mobile', 'stage']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ 
          success: false, 
          error: `Missing required field: ${field}` 
        }, { status: 400 })
      }
    }

    // Create or connect to an existing customer
    const customer = await prisma.customer.upsert({
      where: { email: body.email },
      update: {},
      create: {
        name: `${body.title || ''} ${body.firstName} ${body.lastName}`.trim(),
        email: body.email,
        phone: body.mobile,
        company: body.company,
      },
    })

    const prospect = await prisma.prospect.create({
      data: {
        company: body.company,
        title: body.title || '',
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        mobile: body.mobile,
        website: body.website || null,
        industry: body.industry || null,
        country: body.country || 'India',
        state: body.state || null,
        city: body.city || null,
        product: body.product || null,
        executive: body.executive || null,
        businessProspect: parseFloat(body.businessProspect || '0'),
        stage: body.stage,
        customer: {
          connect: { id: customer.id }
        }
      },
    })

    return NextResponse.json({ success: true, data: prospect })
  } catch (error) {
    console.error('Error creating prospect:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'An unexpected error occurred'  
    }, { status: 500 })
  }
}