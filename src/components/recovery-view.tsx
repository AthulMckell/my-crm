"use client"

import { FileText, Plus } from 'lucide-react'
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import { Textarea } from "@/components/ui/textarea"

export default function RecoveryView() {
  const [isCustomerFormOpen, setIsCustomerFormOpen] = React.useState(false)

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold">Recovery</h1>
        </div>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span>Show only non-zero</span>
          </label>
        </div>
      </div>
      <div className="p-6">
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="text-sm font-medium">Total Receivables</div>
            <div className="text-2xl font-bold">₹ 0.00</div>
          </CardContent>
        </Card>
        <Button
          variant="outline"
          onClick={() => setIsCustomerFormOpen(true)}
          className="mb-4"
        >
          <Plus className="mr-2 h-4 w-4" />
          Click here to enter a customer
        </Button>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Training Materials
          </Button>
        </div>
      </div>

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
        <div className="grid grid-cols-4 gap-4">
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
          <Input placeholder="First Name" />
          <Input placeholder="Last Name" />
          <div className="flex gap-2">
            <Input defaultValue="+91" className="w-16" />
            <Input placeholder="Mobile Number" />
          </div>
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
            <input type="checkbox" className="form-checkbox" defaultChecked />
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="receivables">Receivables</Label>
            <div className="flex gap-2 items-center">
              <span>₹</span>
              <Input id="receivables" type="number" defaultValue="0" />
            </div>
          </div>
          <div>
            <Label htmlFor="receivable-notes">Receivable Notes</Label>
            <Textarea id="receivable-notes" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="business-prospect">Business Prospect (Annual)</Label>
            <div className="flex gap-2 items-center">
              <span>₹</span>
              <Input id="business-prospect" type="number" defaultValue="0" />
            </div>
          </div>
          <div>
            <Label htmlFor="order-target">Order Target</Label>
            <Input id="order-target" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="msme">MSME No.</Label>
            <Input id="msme" />
          </div>
          <div>
            <Label htmlFor="pan">PAN No.</Label>
            <Input id="pan" />
          </div>
        </div>
      </div>
      <Button type="submit">Save</Button>
    </form>
  )
}