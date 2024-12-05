"use client"

import { FileText, Plus } from 'lucide-react'
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

export default function InvoicesView() {
  const [isInvoiceFormOpen, setIsInvoiceFormOpen] = React.useState(false)

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold">Invoices</h1>
          <Select defaultValue="this-month">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-invoices">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-invoices">All Invoices</SelectItem>
              <SelectItem value="party">Party</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setIsInvoiceFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Party Invoice
          </Button>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Create POS/Retail Invoice
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-4 mt-4">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Training Materials
          </Button>
        </div>
      </div>
      <Dialog open={isInvoiceFormOpen} onOpenChange={setIsInvoiceFormOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create Invoice</DialogTitle>
          </DialogHeader>
          <InvoiceForm onSubmit={() => setIsInvoiceFormOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

function InvoiceForm({ onSubmit }: { onSubmit: () => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Basic Information</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Label className="flex items-center gap-4">
                <input type="radio" name="type" value="party" defaultChecked />
                Party Invoice
              </Label>
              <Label className="flex items-center gap-4">
                <input type="radio" name="type" value="cash" />
                Cash Memo
              </Label>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="customer">Customer</Label>
                <div className="flex gap-2">
                  <Input id="customer" placeholder="Select Customer" />
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
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
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Party Details</h3>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact">Contact Person</Label>
                <Input id="contact" />
              </div>
              <div>
                <Label htmlFor="credit">Sales Credit</Label>
                <Select>
                  <SelectTrigger id="credit">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="billing">Billing Address</Label>
                <Button variant="outline" className="w-full justify-start text-muted-foreground">
                  <Plus className="h-4 w-4 mr-2" />
                  Click here to add an address
                </Button>
              </div>
              <div>
                <Label htmlFor="shipping">Shipping Address</Label>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="same-address" className="form-checkbox" />
                  <label htmlFor="same-address">Same as Billing address</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Item List</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item & Description</TableHead>
                <TableHead>HSN/SAC</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Rate (₹)</TableHead>
                <TableHead>Discount (₹)</TableHead>
                <TableHead>Taxable (₹)</TableHead>
                <TableHead>CGST (₹)</TableHead>
                <TableHead>SGST (₹)</TableHead>
                <TableHead>Amount (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={10}>
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Terms & Conditions</h3>
          <Button variant="outline" className="w-full justify-start">
            <Plus className="h-4 w-4 mr-2" />
            Add Term / Condition
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" />
          </div>
          <div>
            <Label htmlFor="bank">Bank Details</Label>
            <Select>
              <SelectTrigger id="bank">
                <SelectValue placeholder="Select Bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sbi">State Bank of India (31385420787)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <Button type="submit">Save</Button>
        <Button type="button" variant="outline">
          Save & Enter Another
        </Button>
      </div>
    </form>
  )
}