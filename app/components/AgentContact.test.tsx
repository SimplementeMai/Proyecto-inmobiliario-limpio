import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AgentContact } from './AgentContact'

describe('AgentContact', () => {
  const mockAgent = {
    nombre: 'Sarah Jenkins',
    telefono: '+1 555 123 4567',
  }

  it('renders agent details and contact buttons', () => {
    render(<AgentContact agent={mockAgent} propertySlug="test-property" />)
    
    expect(screen.getByText('Sarah Jenkins')).toBeInTheDocument()
    expect(screen.getByText('+1 555 123 4567')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /agendar visita/i })).toBeInTheDocument()
  })

  it('renders fallback when agent is null', () => {
    render(<AgentContact agent={null} propertySlug="test-property" />)
    
    expect(screen.getByText(/información del agente no disponible/i)).toBeInTheDocument()
  })
})
