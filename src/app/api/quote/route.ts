// pages/api/quotes/index.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
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
      res.status(200).json(quotes)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch quotes' })
    }
  } else if (req.method === 'POST') {
    try {
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
      } = req.body

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

      res.status(201).json(quote)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to create quote' })
    }
  }
}

// pages/api/quotes/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const quote = await prisma.quote.findUnique({
        where: { id: Number(id) },
        include: {
          customer: true,
          items: true,
          terms: true
        }
      })
      
      if (!quote) {
        return res.status(404).json({ error: 'Quote not found' })
      }

      res.status(200).json(quote)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch quote' })
    }
  } else if (req.method === 'PUT') {
    try {
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
        status,
        isProforma
      } = req.body

      const quote = await prisma.quote.update({
        where: { id: Number(id) },
        data: {
          customerId,
          contactPerson,
          salesCredit,
          billingAddress,
          shippingAddress,
          notes,
          bankDetails,
          amount,
          status,
          validUntil: new Date(validUntil),
          isProforma,
          items: {
            deleteMany: {},
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
            deleteMany: {},
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

      res.status(200).json(quote)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to update quote' })
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.quote.delete({
        where: { id: Number(id) }
      })
      res.status(200).json({ message: 'Quote deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete quote' })
    }
  }
}