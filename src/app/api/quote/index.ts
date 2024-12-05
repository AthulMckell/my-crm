// pages/api/quotes/index.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const quotes = await prisma.quote.findMany({
      include: {
        customer: {
          select: { name: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(quotes)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      customerId,
      contactPerson,
      salesCredit,
      billingAddress,
      shippingAddress,
      items,
      terms,
      notes,
      bankDetails,
      amount,
      validUntil,
      isProforma
    } = body

    // Generate quote number (you might want to implement a more sophisticated numbering system)
    const quoteNumber = `QUOTE-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`

    const quote = await prisma.quote.create({
      data: {
        quoteNumber,
        customerId,
        contactPerson,
        salesCredit,
        billingAddress,
        shippingAddress,
        notes,
        bankDetails,
        amount,
        status: 'DRAFT',
        validUntil: new Date(validUntil),
        isProforma: isProforma || false,
        items: {
          create: items?.map((item: any) => ({
            item: item.item,
            description: item.description,
            hsnCode: item.hsnCode,
            quantity: item.quantity,
            unit: item.unit,
            rate: item.rate,
            discount: item.discount,
            taxableAmount: item.taxableAmount,
            cgst: item.cgst,
            sgst: item.sgst,
            totalAmount: item.totalAmount,
            leadTime: item.leadTime
          }))
        },
        terms: {
          create: terms?.map((term: any) => ({
            description: term.description
          }))
        }
      },
      include: {
        items: true,
        terms: true
      }
    })

    return NextResponse.json(quote, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create quote' }, { status: 500 })
  }
}
