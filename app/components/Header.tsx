"use client"

import * as React from "react"
import Link from "next/link"
import { Search, Bell, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/app/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Button } from "@/app/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet"

const navLinks = [
  { href: "/buy", label: "Buy" },
  { href: "/rent", label: "Rent" },
  { href: "/sell", label: "Sell" },
  { href: "/saved", label: "Saved Homes" },
]

export function Header() {
  const [activeLink, setActiveLink] = React.useState("Buy")

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              LuxeEstate
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-6">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.label}>
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      onClick={() => setActiveLink(link.label)}
                      className={cn(
                        "group relative px-0 py-2 text-sm font-semibold transition-colors hover:text-primary",
                        activeLink === link.label
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      {link.label}
                      {activeLink === link.label && (
                        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" />
                      )}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon" aria-label="Search" className="h-10 w-10 text-foreground">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notifications" className="h-10 w-10 relative text-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="ml-2 h-10 w-10 p-0 rounded-full">
            <Avatar className="h-9 w-9 border border-primary/20">
              <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhLuM9qNltZNxgIWPtC3dVxQ_JLFKXYB9d_klGFux_2JVOGtRlbV4GvpvdT4wqpsueZnXFQhKJe9MGGvM6rXQX15iv80mbEKxjmy4X14AZRqvp573ZlKYDN9bAb0ka7B-g5mkOCP6nRuKC9QsO02JVq6gqZeAo3-7dUurVhhgPJGeuL0Gk2Cp3Wnu5mVlUtpajB2wtx8uMoytbh78i9RmHYtJg52ZELl9XdIC9f5Kix_lFMFoi6Ru61ARrEGIrvgvz4ViiKhufTns" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Button>
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="flex md:hidden items-center gap-2">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Search className="h-5 w-5" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  LuxeEstate
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setActiveLink(link.label)}
                    className={cn(
                      "text-lg font-semibold transition-colors hover:text-primary",
                      activeLink === link.label
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t flex flex-col gap-4">
                  <Link href="/notifications" className="text-lg font-semibold text-muted-foreground hover:text-primary flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </Link>
                  <Link href="/profile" className="text-lg font-semibold text-muted-foreground hover:text-primary flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhLuM9qNltZNxgIWPtC3dVxQ_JLFKXYB9d_klGFux_2JVOGtRlbV4GvpvdT4wqpsueZnXFQhKJe9MGGvM6rXQX15iv80mbEKxjmy4X14AZRqvp573ZlKYDN9bAb0ka7B-g5mkOCP6nRuKC9QsO02JVq6gqZeAo3-7dUurVhhgPJGeuL0Gk2Cp3Wnu5mVlUtpajB2wtx8uMoytbh78i9RmHYtJg52ZELl9XdIC9f5Kix_lFMFoi6Ru61ARrEGIrvgvz4ViiKhufTns" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    My Profile
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
