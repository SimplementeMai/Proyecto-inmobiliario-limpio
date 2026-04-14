import * as React from "react"
import { Calendar, Mail } from "lucide-react"
import { Button } from "@/app/components/ui/button"

interface Agent {
  name: string
  role: string
  imageUrl: string
}

export function AgentContact({ agent }: { agent: Agent }) {
  return (
    <div className="bg-card p-6 rounded-xl shadow-sm border border-border/40 sticky top-28">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={agent.imageUrl}
          alt={agent.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-primary/10"
        />
        <div>
          <h3 className="font-semibold">{agent.name}</h3>
          <p className="text-xs text-primary font-medium">{agent.role}</p>
        </div>
      </div>
      <div className="space-y-3">
        <Button className="w-full gap-2" size="lg">
          <Calendar className="h-4 w-4" />
          Agendar Visita
        </Button>
        <Button variant="outline" className="w-full gap-2" size="lg">
          <Mail className="h-4 w-4" />
          Contactar Agente
        </Button>
      </div>
    </div>
  )
}
