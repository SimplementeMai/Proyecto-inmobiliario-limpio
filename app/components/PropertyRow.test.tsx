import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PropertyRow } from './PropertyRow'

describe('PropertyRow', () => {
  const mockProperty = {
    id: 'test-id-1',
    slug: 'test-property',
    title: 'The Nordic Villa',
    address: '12 Willow Creek Ln',
    price: 1250000,
    id_estado: 1,
    estado_descripcion: 'Activo',
    user_id: null,
  }

  it('renders property row details correctly', () => {
    render(<PropertyRow property={mockProperty} />)
    
    expect(screen.getByText('The Nordic Villa')).toBeInTheDocument()
    expect(screen.getByText('12 Willow Creek Ln')).toBeInTheDocument()
    expect(screen.getByText(/\$1.25M/i)).toBeInTheDocument()
    expect(screen.getByText('Activo')).toBeInTheDocument()
  })
})
