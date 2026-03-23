import * as React from "react"
import { Search } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"

export function HeroSearch() {
  return (
    <section className="relative h-[500px] flex items-center justify-center overflow-hidden rounded-3xl bg-muted/20 my-8">
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20" />
      <div className="relative z-10 w-full max-w-2xl px-6 space-y-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Find your dream home
        </h1>
        <div className="bg-background p-2 rounded-2xl shadow-xl flex items-center gap-2">
          <Input 
            className="h-14 border-none shadow-none text-lg px-4" 
            placeholder="Search for your dream home" 
          />
          <Button className="h-14 px-8 rounded-xl font-bold">
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </section>
  )
}
