"use client"

import { FileText, Plus, Trash2, Edit } from 'lucide-react'
import * as React from "react"
import { useState, useEffect } from 'react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"

interface Quote {
  id: string;
  quoteNumber: string;
  customer: {
    id: number;
    name: string;
  };
  amount: number;
  validUntil: string;
  createdAt: string;
  status: string;
  isProforma: boolean;
}

interface Customer {
  id: number;
  name: string;
}

interface QuoteItem {
  id?: number;
  item: string;
  description?: string;
  hsnCode?: string;
  quantity: number;
  unit?: string;
  rate: number;
  discount: number;
  taxableAmount: number;
  cgst: number;
  sgst: number;
  totalAmount: number;
  leadTime?: string;
}

export default function QuotesView() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [activeTab, setActiveTab] = useState('all')
  const [statusFilter, setStatusFilter] = useState('not-expired')

  useEffect(() => {
    fetchQuotes()
  }, [])

  const fetchQuotes = async () => {
    try {
      const response = await fetch('/api/quotes')
      const data = await response.json()
      setQuotes(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch quotes",
        variant: "destructive"
      })
    }
  }

  const handleDeleteQuote = async (quoteId: string) => {
    try {
      await fetch(`/api/quotes/${quoteId}`, { method: 'DELETE' })
      fetchQuotes()
      toast({
        title: "Success",
        description: "Quote deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete quote",
        variant: "destructive"
      })
    }
  }

  const filteredQuotes = quotes.filter(quote => {
    const isNotExpired = new Date(quote.validUntil) > new Date()
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'quotations' && !quote.isProforma) || 
      (activeTab === 'proforma' && quote.isProforma)
    
    return (statusFilter === 'not-expired' ? isNotExpired : true) && matchesTab
  })

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold">Quotations</h1>
          <Tabs 
            defaultValue="all" 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-[400px]"
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="quotations">Quotations</TabsTrigger>
              <TabsTrigger value="proforma">Proforma Invoices</TabsTrigger>
            </TabsList>
          </Tabs>
          <Select 
            value={statusFilter} 
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="not-expired">Not Expired</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setIsQuoteFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Quotation
        </Button>
      </div>
      <div className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quote No.</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount (₹)</TableHead>
              <TableHead>Valid Date</TableHead>
              <TableHead>Issued on</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuotes.map((quote: Quote) => (
              <TableRow key={quote.id}>
                <TableCell>{quote.quoteNumber}</TableCell>
                <TableCell>{quote.customer.name}</TableCell>
                <TableCell>{quote.amount.toLocaleString()}</TableCell>
                <TableCell>{new Date(quote.validUntil).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(quote.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{quote.status}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      title="Edit"
                      onClick={() => {/* TODO: Implement edit functionality */}}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      title="Delete"
                      onClick={() => handleDeleteQuote(quote.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center space-x-4 mt-4">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Training Materials
          </Button>
        </div>
      </div>

      <QuoteFormDialog 
        isOpen={isQuoteFormOpen} 
        onClose={() => setIsQuoteFormOpen(false)}
        onSubmitSuccess={fetchQuotes}
      />
    </div>
  )
}

function QuoteFormDialog({ 
  isOpen, 
  onClose,
  onSubmitSuccess
}: { 
  isOpen: boolean, 
  onClose: () => void,
  onSubmitSuccess: () => void
}) {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [items, setItems] = useState<QuoteItem[]>([])
  const [formData, setFormData] = useState({
    customerId: '',
    contactPerson: '',
    salesCredit: '',
    billingAddress: '',
    shippingAddress: '',
    notes: '',
    bankDetails: '',
    amount: 0,
    validUntil: '',
    isProforma: false
  })

  useEffect(() => {
    // Fetch customers for dropdown
    async function fetchCustomers() {
      try {
        const response = await fetch('/api/customers')
        const data = await response.json()
        setCustomers(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch customers",
          variant: "destructive"
        })
      }
    }

    if (isOpen) {
      fetchCustomers()
    }
  }, [isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCustomerChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      customerId: value
    }))
  }

  const addQuoteItem = () => {
    const newItem: QuoteItem = {
      item: '',
      quantity: 1,
      rate: 0,
      discount: 0,
      taxableAmount: 0,
      cgst: 0,
      sgst: 0,
      totalAmount: 0
    }
    setItems([...items, newItem])
  }

  const updateQuoteItem = (index: number, updates: Partial<QuoteItem>) => {
    const updatedItems = [...items]
    updatedItems[index] = { ...updatedItems[index], ...updates }
    
    // Recalculate totals
    const item = updatedItems[index]
    const taxableAmount = item.quantity * item.rate - item.discount
    const cgst = taxableAmount * 0.09 // 9% CGST
    const sgst = taxableAmount * 0.09 // 9% SGST
    const totalAmount = taxableAmount + cgst + sgst

    updatedItems[index] = {
      ...item,
      taxableAmount,
      cgst,
      sgst,
      totalAmount
    }

    setItems(updatedItems)

    // Update total quote amount
    const totalQuoteAmount = updatedItems.reduce((sum, item) => sum + item.totalAmount, 0)
    setFormData(prev => ({ ...prev, amount: totalQuoteAmount }))
  }

  const removeQuoteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index)
    setItems(updatedItems)

    // Recalculate total quote amount
    const totalQuoteAmount = updatedItems.reduce((sum, item) => sum + item.totalAmount, 0)
    setFormData(prev => ({ ...prev, amount: totalQuoteAmount }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          customerId: parseInt(formData.customerId),
          items: items,
          terms: [], // TODO: Implement terms
          validUntil: new Date(formData.validUntil).toISOString()
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create quote')
      }

      toast({
        title: "Success",
        description: "Quote created successfully",
      })

      // Reset form and close dialog
      setFormData({
        customerId: '',
        contactPerson: '',
        salesCredit: '',
        billingAddress: '',
        shippingAddress: '',
        notes: '',
        bankDetails: '',
        amount: 0,
        validUntil: '',
        isProforma: false
      })
      setItems([])
      onSubmitSuccess()
      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create quote",
        variant: "destructive"
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Quotation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Basic Information Section */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Basic Information</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="customer">Customer</Label>
                    <Select 
                      value={formData.customerId} 
                      onValueChange={handleCustomerChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map(customer => (
                          <SelectItem 
                            key={customer.id} 
                            value={customer.id.toString()}
                          >
                            {customer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-[200px]">
                    <Label>Copy from</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input 
                      id="contactPerson"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="validUntil">Valid Until</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.validUntil && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.validUntil ? (
                            format(new Date(formData.validUntil), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.validUntil ? new Date(formData.validUntil) : undefined}
                          onSelect={(date) => setFormData(prev => ({
                            ...prev, 
                            validUntil: date ? date.toISOString() : ''
                          }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )};