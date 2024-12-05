"use client"

import { Calendar, Download, FileText, Import, Plus, Search } from 'lucide-react'
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function OrdersView() {
  const [isOrderFormOpen, setIsOrderFormOpen] = React.useState(false)

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold">Orders</h1>
          <Tabs defaultValue="commitment" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="commitment">Commitment View</TabsTrigger>
              <TabsTrigger value="item">Item View</TabsTrigger>
              <TabsTrigger value="summary">Summary View</TabsTrigger>
            </TabsList>
          </Tabs>
          <Select defaultValue="pending">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setIsOrderFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Enter Order
          </Button>
          <Button variant="outline">
            <Import className="h-4 w-4 mr-2" />
            Import Orders
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tomorrow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
            </CardContent>
          </Card>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order No</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">ORD001</TableCell>
                <TableCell>Sample Customer</TableCell>
                <TableCell>2024-01-19</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>₹15,000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center space-x-4 mt-4">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Training Materials
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            View Tutorial
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Training Console
          </Button>
        </div>
      </div>
      <Dialog open={isOrderFormOpen} onOpenChange={setIsOrderFormOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create Sale Order</DialogTitle>
          </DialogHeader>
          <OrderForm onSubmit={() => setIsOrderFormOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

function OrderForm({ onSubmit }: { onSubmit: () => void }) {
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
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Basic Information</h3>
            <div className="grid gap-4">
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