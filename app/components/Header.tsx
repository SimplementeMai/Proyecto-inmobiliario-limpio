"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Bell, Menu, HelpCircle, LogOut, User } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
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
import { supabase } from "@/lib/supabase/client"
import { User as SupabaseUser } from "@supabase/supabase-js"

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/comprar", label: "Comprar" },
  { href: "/rentar", label: "Rentar" },
  { href: "/favorites", label: "Favoritos" },
  { href: "/dashboard", label: "Mi Portafolio" },
]

export function Header() {
  const pathname = usePathname()
  const [user, setUser] = React.useState<SupabaseUser | null>(null)
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      
      if (user) {
        const { data: cliente } = await supabase
          .from('clientes')
          .select('avatar_url')
          .eq('user_id', user.id)
          .maybeSingle()
        
        setAvatarUrl(cliente?.avatar_url || null)
      }
    }
    fetchUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        // Optional: Trigger a refresh of the avatar here if needed
      } else {
        setAvatarUrl(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setAvatarUrl(null)
    window.location.href = "/" // Forzar recarga completa
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="text-2xl font-black tracking-tighter text-foreground">
              Luxe<span className="text-primary">Estate</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <NavigationMenuItem key={link.label}>
                    <NavigationMenuLink
                      href={link.href}
                      className={cn(
                        "group relative px-4 py-2 text-sm font-bold transition-all rounded-lg",
                        isActive
                          ? "text-primary bg-primary/10 shadow-sm shadow-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                      )}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl" onClick={handleSignOut}>
                <LogOut className="h-5 w-5" />
              </Button>
              <div className="w-px h-6 bg-border mx-2" />
              <Link href="/profile">
                <Button variant="ghost" className="rounded-xl px-2 hover:bg-transparent">
                  <Avatar className="h-9 w-9 border-2 border-primary/10">
                    <AvatarImage src={avatarUrl || undefined} />
                    <AvatarFallback>{user.email?.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </Link>
            </>
          ) : (
            <Link href="/auth">
              <Button className="rounded-xl">Iniciar Sesión</Button>
            </Link>
          )}
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="mt-8 flex flex-col gap-4">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={cn(
                        "text-lg font-bold p-2 rounded-lg transition-all",
                        isActive
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                      )}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
