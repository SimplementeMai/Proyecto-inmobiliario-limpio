import * as React from "react"
import { Calendar, Phone } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import Link from "next/link"

interface Agent {
  nombre: string
  telefono: string | null
}

export function AgentContact({ agent, propertySlug }: { agent: Agent | null; propertySlug: string }) {
  if (!agent) {
    return (
      <div className="bg-card p-6 rounded-xl shadow-sm border border-border/40 sticky top-28">
        <p className="text-muted-foreground text-sm">Información del agente no disponible.</p>
        <div className="space-y-3 mt-4">
          <Link href={`/property/${propertySlug}/visit`} passHref>
            <Button className="w-full gap-2" size="lg">
              <Calendar className="h-4 w-4" />
              Agendar Visita
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card p-6 rounded-xl shadow-sm border border-border/40 sticky top-28">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg border-2 border-primary/10">
          {agent.nombre.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold">{agent.nombre}</h3>
          {agent.telefono && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {agent.telefono}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-3">
        <Link href={`/property/${propertySlug}/visit`} passHref>
          <Button className="w-full gap-2" size="lg">
            <Calendar className="h-4 w-4" />
            Agendar Visita
          </Button>
        </Link>
      </div>
    </div>
  )
}
