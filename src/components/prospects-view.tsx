"use client"

import { Calendar, ChevronRight, Download, Import, Plus } from 'lucide-react'
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const stages = [
  { id: "INITIAL_CONTACT", name: "Initial Contact", color: "bg-orange-500" },
  { id: "NEEDS_ANALYSIS", name: "Needs Analysis", color: "bg-yellow-500" },
  { id: "PROPOSAL_SENT", name: "Proposal Sent", color: "bg-amber-500" },
  { id: "NEGOTIATION", name: "Negotiation", color: "bg-emerald-500" },
  { id: "CLOSED_WON", name: "Closed Won", color: "bg-green-500" },
  { id: "CLOSED_LOST", name: "Closed Lost", color: "bg-red-500" },
]

interface Prospect {
  id: string;
  stage: string;
  businessProspect: number;
  createdAt: string;
  customer: {
    name: string;
    city: string;
    state: string;
  };
}

export default function ProspectsView() {
  const [isProspectFormOpen, setIsProspectFormOpen] = React.useState(false)
  const [prospects, setProspects] = React.useState<Prospect[]>([])
  const [status, setStatus] = React.useState('active')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const { toast } = useToast()

  const fetchProspects = React.useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/prospects?status=${status}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (data.success) {
        setProspects(data.data)
      } else {
        throw new Error(data.error || 'Failed to fetch prospects')
      }
    } catch (error) {
      console.error('Error fetching prospects:', error)
      setError('Failed to fetch prospects. Please try again.')
      toast({
        title: "Error",
        description: "Failed to fetch prospects. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [status, toast])

  React.useEffect(() => {
    fetchProspects()
  }, [fetchProspects])

  const handleProspectCreated = React.useCallback((newProspect: Prospect) => {
    // Determine if the new prospect should be shown based on current status
    const isActiveProspect = 
      (status === 'active' && !['CLOSED_WON', 'CLOSED_LOST'].includes(newProspect.stage)) ||
      (status === 'inactive' && ['CLOSED_WON', 'CLOSED_LOST'].includes(newProspect.stage))

    if (isActiveProspect) {
      setProspects(prevProspects => [newProspect, ...prevProspects])
    }
    
    setIsProspectFormOpen(false)
  }, [status])

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold">Sales Prospects</h1>
          <Button variant="outline" size="sm">
            Travel History
          </Button>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setIsProspectFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Enter Prospect
          </Button>
          <Button variant="outline">
            <Import className="h-4 w-4 mr-2" />
            Import Prospects
          </Button>
        </div>
      </div>
      <div className="p-6">
        {isLoading ? (
          <div className="text-center">Loading prospects...</div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-6 gap-4">
            {stages.map((stage) => (
              <div key={stage.id} className="space-y-4">
                <div className={`p-2 rounded-lg text-white ${stage.color}`}>
                  <div className="flex justify-between items-center">
                    <span>
                      {stage.name} ({prospects.filter((p) => p.stage === stage.id).length})
                    </span>
                    <span>
                      ₹
                      {prospects
                        .filter((p) => p.stage === stage.id)
                        .reduce((acc, curr) => acc + curr.businessProspect, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                </div>
                {prospects
                  .filter((prospect) => prospect.stage === stage.id)
                  .map((prospect) => (
                    <Card key={prospect.id}>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm font-medium flex justify-between">
                          {prospect.customer.name}
                          <ChevronRight className="h-4 w-4" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                        <p>{prospect.customer.city}, {prospect.customer.state}</p>
                        <p>₹ {prospect.businessProspect.toLocaleString()}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 text-sm">
                        <span>{new Date(prospect.createdAt).toLocaleDateString()}</span>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center space-x-4 mt-8">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Training Materials
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Training Console
          </Button>
        </div>
      </div>
      <Dialog open={isProspectFormOpen} onOpenChange={setIsProspectFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Enter Prospect</DialogTitle>
          </DialogHeader>
          <ProspectForm 
            onSubmit={(newProspect) => {
              handleProspectCreated(newProspect)
            }} 
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ProspectForm({ onSubmit }: { onSubmit: (prospect: Prospect) => void }) {
  const { toast } = useToast()
  const [formData, setFormData] = React.useState({
    company: '',
    title: 'mr',
    firstName: '',
    lastName: '',
    email: '',
    website: '',
    mobile: '',
    industry: '',
    country: 'India',
    state: '',
    city: '',
    product: '',
    executive: '',
    businessProspect: '',
    probability: '',
    stage: 'INITIAL_CONTACT',
    notes: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target instanceof HTMLInputElement && e.target.type === 'checkbox' 
      ? e.target.checked 
      : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/prospects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to create prospect')
      }
      
      const data = await response.json()
      
      if (data.success) {
        toast({
          title: "Success",
          description: "Prospect created successfully.",
        })
        onSubmit(data.data)
      } else {
        throw new Error(data.error || 'Failed to create prospect')
      }
    } catch (error) {
      console.error('Error creating prospect:', error)
      toast({
        title: "Error",
        description: "Failed to create prospect. Please try again.",
        variant: "destructive",
      })
    }
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Input name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} required />
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
          <Input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
          <Input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <Input name="website" placeholder="Website" value={formData.website} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Input defaultValue="+91" className="col-span-1" readOnly />
          <Input name="mobile" placeholder="Mobile Number" className="col-span-3" value={formData.mobile} onChange={handleChange} required />
        </div>
        <Input name="industry" placeholder="Industry & Segment" value={formData.industry} onChange={handleChange} />
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
              <SelectItem value="Gujarat">Gujarat</SelectItem>
              <SelectItem value="Maharashtra">Maharashtra</SelectItem>
            </SelectContent>
          </Select>
          <Input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
        </div>
        <Input name="product" placeholder="Product" value={formData.product} onChange={handleChange} />
        <Select name="executive" value={formData.executive} onValueChange={(value) => setFormData({ ...formData, executive: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Executive" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="exec1">NYSHANA C K</SelectItem>
          </SelectContent>
        </Select>
        <div className="grid grid-cols-3 gap-4">
          <Input name="businessProspect" placeholder="Business Prospect (₹)" type="number" value={formData.businessProspect} onChange={handleChange} />
          <Input name="probability" placeholder="Probability (%)" type="number" min="0" max="100" value={formData.probability} onChange={handleChange} />
          <Select name="stage" value={formData.stage} onValueChange={(value) => setFormData({ ...formData, stage: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Prospect Stage" />
            </SelectTrigger>
            <SelectContent>
              {stages.map((stage) => (
                <SelectItem key={stage.id} value={stage.id}>
                  {stage.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <textarea
          name="notes"
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
        />
      </div>
      <Button type="submit">Save</Button>
    </form>
  )
}