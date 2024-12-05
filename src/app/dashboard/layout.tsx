"use client"

import { BarChart3, Building2, Calendar, ChevronRight, ClipboardList, FileText, HandCoins, Home, Inbox, LayoutDashboard, LifeBuoy, Menu, Package, PieChart, Plus, Search, Settings, Users } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
      href: "/dashboard/leads",
      color: "text-violet-500",
    },
    {
      label: "Prospects",
      icon: Building2,
      href: "/dashboard/prospects",
      color: "text-pink-500",
    },
    {
      label: "Quotes",
      icon: FileText,
      href: "/dashboard/quotes",
      color: "text-orange-500",
    },
    {
      label: "Orders",
      icon: Package,
      href: "/dashboard/orders",
      color: "text-green-500",
    },
    {
      label: "Invoices",
      icon: ClipboardList,
      href: "/dashboard/invoices",
      color: "text-red-500",
    },
    {
      label: "Recovery",
      icon: HandCoins,
      href: "/dashboard/recovery",
      color: "text-yellow-500",
    },
    {
      label: "Contracts",
      icon: FileText,
      href: "/dashboard/contracts",
      color: "text-blue-500",
    },
    {
      label: "Support",
      icon: LifeBuoy,
      href: "/dashboard/support",
      color: "text-purple-500",
    },
  ]

  return (
    <div className="flex min-h-screen w-full bg-muted/10">
      <div className="hidden w-64 flex-col border-r bg-background md:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Link className="flex items-center gap-2 font-semibold" href="/dashboard">
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
          {children}
        </main>
      </div>
    </div>
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