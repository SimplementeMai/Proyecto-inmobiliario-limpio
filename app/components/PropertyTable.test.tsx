import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PropertyTable } from './PropertyTable'

describe('PropertyTable', () => {
  const mockProperties = [
    { id: '1', slug: 'nordic-villa', title: 'The Nordic Villa', address: '12 Willow Creek Ln', price: 1250000, id_estado: 1, estado_descripcion: 'Activo' },
    { id: '2', slug: 'sunset-apt', title: 'Sunset Apartments', address: '88 Ocean Blvd', price: 850000, id_estado: 2, estado_descripcion: 'Pendiente' },
  ]

  it('renders a list of properties', () => {
    render(<PropertyTable properties={mockProperties} />)
    
    expect(screen.getByText('The Nordic Villa')).toBeInTheDocument()
    expect(screen.getByText('Sunset Apartments')).toBeInTheDocument()
  })
})
