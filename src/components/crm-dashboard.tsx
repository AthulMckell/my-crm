"use client"

import { BarChart3, Building2, Calendar, ChevronRight, ClipboardList, FileText, HandCoins, Home, Inbox, LayoutDashboard, LifeBuoy, Menu, Package, PieChart, Plus, Search, Settings, Users } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Component() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-sky-500",
    },
    {
      label: "Leads",
      icon: Users,
      href: "/leads",
      color: "text-violet-500",
    },
    {
      label: "Prospects",
      icon: Building2,
      href: "/prospects",
      color: "text-pink-500",
    },
    {
      label: "Quotes",
      icon: FileText,
      href: "/quotes",
      color: "text-orange-500",
    },
    {
      label: "Orders",
      icon: Package,
      href: "/orders",
      color: "text-green-500",
    },
    {
      label: "Invoices",
      icon: ClipboardList,
      href: "/invoices",
      color: "text-red-500",
    },
    {
      label: "Recovery",
      icon: HandCoins,
      href: "/recovery",
      color: "text-yellow-500",
    },
    {
      label: "Contracts",
      icon: FileText,
      href: "/contracts",
      color: "text-blue-500",
    },
    {
      label: "Support",
      icon: LifeBuoy,
      href: "/support",
      color: "text-purple-500",
    },
  ]

  return (
    <div className="flex min-h-screen w-full bg-muted/10">
      <div className="hidden w-64 flex-col border-r bg-background md:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <Package className="h-6 w-6" />
            <span>Business CRM</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  pathname === route.href
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <route.icon className={`h-4 w-4 ${route.color}`} />
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px]">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>
              <nav className="grid gap-2 py-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                      pathname === route.href
                        ? "bg-muted text-primary"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <route.icon className={`h-4 w-4 ${route.color}`} />
                    {route.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full bg-background pl-8 md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          {pathname === "/dashboard" && <DashboardContent />}
        </main>
      </div>
    </div>
  )
}

function DashboardContent() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">324</div>
              <p className="text-xs text-muted-foreground">+4.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">+10.2% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">573</div>
              <p className="text-xs text-muted-foreground">+7.4% from last month</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Command>
                <CommandInput placeholder="Search activities..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Recent Activities">
                    <CommandItem>
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>New appointment scheduled with Client A</span>
                    </CommandItem>
                    <CommandItem>
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Quote #1234 created for Project X</span>
                    </CommandItem>
                    <CommandItem>
                      <Package className="mr-2 h-4 w-4" />
                      <span>Order #5678 fulfilled</span>
                    </CommandItem>
                    <CommandItem>
                      <Inbox className="mr-2 h-4 w-4" />
                      <span>New support ticket from Client B</span>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and operations</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                New Lead
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Create Quote
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                New Contract
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Analytics Overview</CardTitle>
            <CardDescription>Your business performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Command>
              <CommandInput placeholder="Search analytics..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Available Reports">
                  <CommandItem>
                    <PieChart className="mr-2 h-4 w-4" />
                    <span>Lead Conversion Rates</span>
                  </CommandItem>
                  <CommandItem>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    <span>Revenue Analysis</span>
                  </CommandItem>
                  <CommandItem>
                    <Users className="mr-2 h-4 w-4" />
                    <span>Customer Demographics</span>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

function Input({ className, type, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}