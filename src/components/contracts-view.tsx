"use client"

import { Calendar, Download, FileText, Plus, Upload } from 'lucide-react'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function ContractsView() {
  const [isContractFormOpen, setIsContractFormOpen] = React.useState(false)

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold">Contracts</h1>
          <Tabs defaultValue="active" className="w-[200px]">
            <TabsList>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
          </Tabs>
          <Select defaultValue="this-month">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="next-month">Next Month</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" onClick={() => setIsContractFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Contract
        </Button>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Renewals This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0 (₹ 0)</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Renewals Next Month</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">1 (₹ 10)</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Renewals 12 Months</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">1 (₹ 10)</p>
            </CardContent>
          </Card>
        </div>
        <div className="flex items-center space-x-4 mt-4">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Training Materials
          </Button>
        </div>
      </div>
      <Dialog open={isContractFormOpen} onOpenChange={setIsContractFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Enter Contract</DialogTitle>
          </DialogHeader>
          <ContractForm onSubmit={() => setIsContractFormOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ContractForm({ onSubmit }: { onSubmit: () => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="space-y-6"
    >
      <div className="space-y-4">
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
            <Label htmlFor="contract-no">Contract No.</Label>
            <Input id="contract-no" placeholder="Prefix: 127" />
          </div>
        </div>
        <div>
          <Label htmlFor="product">Product / Service</Label>
          <div className="flex gap-2">
            <Input id="product" />
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="start-date">Start Date</Label>
            <Input id="start-date" type="date" />
          </div>
          <div>
            <Label htmlFor="expiry-date">Expiry Date</Label>
            <Input id="expiry-date" type="date" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contract-charges">Contract Charges</Label>
            <div className="flex gap-2 items-center">
              <span>₹</span>
              <Input id="contract-charges" type="number" />
            </div>
          </div>
          <div>
            <Label htmlFor="renewal-charges">Renewal Charges</Label>
            <div className="flex gap-2 items-center">
              <span>₹</span>
              <Input id="renewal-charges" type="number" />
            </div>
          </div>
        </div>
        <div>
          <Label htmlFor="contract-type">Contract Type</Label>
          <div className="flex gap-2">
            <Input id="contract-type" />
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" />
        </div>
        <div>
          <Label>Attachment</Label>
          <div className="flex items-center gap-2 mt-2">
            <Button variant="outline" className="w-full justify-start text-muted-foreground">
              <Upload className="h-4 w-4 mr-2" />
              Attach File
            </Button>
            <span className="text-sm text-muted-foreground">(bmp,jpeg,jpg,gif,pdf,doc,xls,ppt,zip)</span>
          </div>
        </div>
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