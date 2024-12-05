"use client"

import { Calendar, Download, FileText, Plus, Search } from 'lucide-react'
import * as React from "react"

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
import { Textarea } from "@/components/ui/textarea"

export default function SupportView() {
  const [isTicketFormOpen, setIsTicketFormOpen] = React.useState(false)
  const [isCustomerFormOpen, setIsCustomerFormOpen] = React.useState(false)

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold">Support Ticketing</h1>
          <Select defaultValue="pending">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-lg font-semibold">Enter a Support Ticket</h3>
                <p className="text-sm text-muted-foreground">
                  Log a new support ticket to track and resolve customer issues efficiently.
                </p>
              </div>
              <div className="p-6 pt-0">
                <Button onClick={() => setIsTicketFormOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Enter Ticket
                </Button>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-lg font-semibold">Enter a Customer</h3>
                <p className="text-sm text-muted-foreground">
                  Add customer details to keep a record of your clients and maintain their tickets.
                </p>
              </div>
              <div className="p-6 pt-0">
                <Button onClick={() => setIsCustomerFormOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Enter Customer
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-4">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Training Materials
          </Button>
        </div>
      </div>

      <Dialog open={isTicketFormOpen} onOpenChange={setIsTicketFormOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create Ticket</DialogTitle>
          </DialogHeader>
          <TicketForm onSubmit={() => setIsTicketFormOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={isCustomerFormOpen} onOpenChange={setIsCustomerFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Enter Customer</DialogTitle>
          </DialogHeader>
          <CustomerForm onSubmit={() => setIsCustomerFormOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

function TicketForm({ onSubmit }: { onSubmit: () => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div className="grid gap-4">
          <div>
            <Label htmlFor="customer">Customer</Label>
            <div className="flex gap-2">
              <Input id="customer" placeholder="Enter" />
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ticket-date">Ticket Date</Label>
              <Input id="ticket-date" type="date" />
            </div>
            <div>
              <Label htmlFor="ticket-no">Ticket No.</Label>
              <Input id="ticket-no" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="due-date">Due Date</Label>
              <Input id="due-date" type="date" />
            </div>
            <div>
              <Label htmlFor="executive">Executive</Label>
              <Select>
                <SelectTrigger id="executive">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exec1">Executive 1</SelectItem>
                  <SelectItem value="exec2">Executive 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Product Details</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="product">Product / Service</Label>
              <div className="flex gap-2">
                <Input id="product" />
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <input type="checkbox" id="quantity" className="form-checkbox" />
              <Label htmlFor="quantity">Quantity Applicable</Label>
            </div>
            <div className="flex gap-2 items-center">
              <Label htmlFor="rate">Rate</Label>
              <span>₹</span>
              <Input id="rate" type="number" className="w-32" />
              <span>/ no's</span>
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          id="send-acknowledgement"
          className="form-checkbox"
        />
        <Label htmlFor="send-acknowledgement">
          Send Acknowledgement to Customer
        </Label>
      </div>
      <div className="flex justify-end space-x-4">
        <Button type="submit">Save</Button>
        <Button type="button" variant="outline">
          Save & Add Another
        </Button>
      </div>
    </form>
  )
}

function CustomerForm({ onSubmit }: { onSubmit: () => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="company">Company</Label>
          <Input id="company" required />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Select defaultValue="mr">
            <SelectTrigger>
              <SelectValue placeholder="Title" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mr">Mr.</SelectItem>
              <SelectItem value="mrs">Mrs.</SelectItem>
              <SelectItem value="ms">Ms.</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="First Name" className="col-span-2" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" />
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input id="website" />
          </div>
        </div>
        <div>
          <Label htmlFor="industry">Industry & Segment</Label>
          <Input id="industry" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="country">Country</Label>
            <Select defaultValue="india">
              <SelectTrigger id="country">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="india">India</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Select>
              <SelectTrigger id="state">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gujarat">Gujarat</SelectItem>
                <SelectItem value="maharashtra">Maharashtra</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" />
          </div>
        </div>
        <div className="flex gap-4">
          <Label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" />
            Customer
          </Label>
          <Label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" />
            Prospect
          </Label>
          <Label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" />
            Supplier
          </Label>
          <Label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" />
            Neighbour
          </Label>
          <Label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" />
            Friend
          </Label>
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}