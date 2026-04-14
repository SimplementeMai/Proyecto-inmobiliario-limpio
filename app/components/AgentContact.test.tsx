import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AgentContact } from './AgentContact'

describe('AgentContact', () => {
  const mockAgent = {
    name: 'Sarah Jenkins',
    role: 'Top Rated Agent',
    imageUrl: '/agent-profile.jpg',
  }

  it('renders agent details and contact buttons', () => {
    render(<AgentContact agent={mockAgent} />)
    
    expect(screen.getByText('Sarah Jenkins')).toBeInTheDocument()
    expect(screen.getByText('Top Rated Agent')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /agendar visita/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /contactar agente/i })).toBeInTheDocument()
  })
})
