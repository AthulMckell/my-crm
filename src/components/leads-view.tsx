"use client"

import { Calendar, Download, FileText, Import, Plus, Search } from 'lucide-react'
import Link from "next/link"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Lead {
  id: string
  company: string
  contact: string
  designation: string
  mobile: string
  city: string
  state: string
  source: string
  since: string
  poc: string
  product: string
  lastTalk?: string
  next?: string
  transferredOn?: string
}

export default function LeadsView() {
  const [isLeadFormOpen, setIsLeadFormOpen] = React.useState(false)
  const [leads, setLeads] = React.useState([])
  const [status, setStatus] = React.useState('active')
  const [period, setPeriod] = React.useState('this-month')

  React.useEffect(() => {
    fetchLeads()
  }, [status, period])

  const fetchLeads = async () => {
    const response = await fetch(`/api/leads?status=${status}&period=${period}`)
    const data = await response.json()
    setLeads(data)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold">Raw Leads</h1>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setIsLeadFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
          <Button variant="outline">
            <Import className="h-4 w-4 mr-2" />
            Import
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search leads..." className="max-w-sm" />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>City</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Since</TableHead>
                <TableHead>POC</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Last Talk</TableHead>
                <TableHead>Next</TableHead>
                <TableHead>Transferred on</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead: Lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell>{lead.contact}</TableCell>
                  <TableCell>{lead.designation}</TableCell>
                  <TableCell>{lead.mobile}</TableCell>
                  <TableCell>{lead.city}</TableCell>
                  <TableCell>{lead.state}</TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>{new Date(lead.since).toLocaleDateString()}</TableCell>
                  <TableCell>{lead.poc}</TableCell>
                  <TableCell>{lead.product}</TableCell>
                  <TableCell>{lead.lastTalk ? new Date(lead.lastTalk).toLocaleDateString() : '-'}</TableCell>
                  <TableCell>{lead.next ? new Date(lead.next).toLocaleDateString() : '-'}</TableCell>
                  <TableCell>{lead.transferredOn ? new Date(lead.transferredOn).toLocaleDateString() : '-'}</TableCell>
                </TableRow>
              ))}
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
      <Dialog open={isLeadFormOpen} onOpenChange={setIsLeadFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Enter Lead</DialogTitle>
            <DialogDescription>
              Enter details of a received lead/inquiry so you can track interactions and appointments.
            </DialogDescription>
          </DialogHeader>
          <LeadForm onSubmit={async (data) => {
            await fetch('/api/leads', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            })
            setIsLeadFormOpen(false)
            fetchLeads()
          }} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

function LeadForm({ onSubmit }: { onSubmit: (data: any) => Promise<void> }) {
  const [formData, setFormData] = React.useState({
    company: '',
    title: 'mr',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    country: 'India',
    state: '',
    city: '',
    executive: '',
    source: '',
    designation: '',
    product: '',
    requirements: '',
    notes: '',
    poc: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const leadData = {
      ...formData,
      contact: `${formData.title} ${formData.firstName} ${formData.lastName}`,
      since: new Date(),
      status: 'active',
    }
    onSubmit(leadData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Basic Information</h3>
            <div className="grid gap-4">
              <div>
                <Input name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Select name="title" value={formData.title} onValueChange={(value) => setFormData({ ...formData, title: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Title" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mr">Mr.</SelectItem>
                    <SelectItem value="mrs">Mrs.</SelectItem>
                    <SelectItem value="ms">Ms.</SelectItem>
                  </SelectContent>
                </Select>
                <Input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                <Input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Contact Details</h3>
            <div className="grid gap-4">
              <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              <div className="grid grid-cols-4 gap-4">
                <Input defaultValue="+91" className="col-span-1" readOnly />
                <Input name="mobile" placeholder="Mobile Number" className="col-span-3" value={formData.mobile} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Select name="country" value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">India</SelectItem>
                  </SelectContent>
                </Select>
                <Select name="state" value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gujarat">Kerala</SelectItem>
                    {/* <SelectItem value="Maharashtra">Maharashtra</SelectItem> */}
                  </SelectContent>
                </Select>
                <Input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Business Details</h3>
            <div className="grid gap-4">
              <Select name="executive" value={formData.executive} onValueChange={(value) => setFormData({ ...formData, executive: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Executive" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exec1">Executive 1</SelectItem>
                  <SelectItem value="exec2">Executive 2</SelectItem>
                </SelectContent>
              </Select>
              <Input name="source" placeholder="Source" value={formData.source} onChange={handleChange} />
              <Input name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} />
              <Input name="product" placeholder="Product" value={formData.product} onChange={handleChange} />
              <Input name="requirements" placeholder="Requirements" value={formData.requirements} onChange={handleChange} />
              <Input name="poc" placeholder="Point of Contact" value={formData.poc} onChange={handleChange} />
              <textarea
                name="notes"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-start space-x-4">
        <Button type="submit">Save</Button>
        <Button type="button" variant="outline" onClick={() => {
          handleSubmit(new Event('submit') as unknown as React.FormEvent<HTMLFormElement>)
          setFormData({
            company: '',
            title: 'mr',
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            country: 'India',
            state: '',
            city: '',
            executive: '',
            source: '',
            designation: '',
            product: '',
            requirements: '',
            notes: '',
            poc: '',
          })
        }}>
          Save & Add Another
        </Button>
      </div>
    </form>
  )
}

