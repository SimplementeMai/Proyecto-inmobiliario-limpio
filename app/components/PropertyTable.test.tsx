import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PropertyTable } from './PropertyTable'

describe('PropertyTable', () => {
  const mockProperties = [
    { title: 'The Nordic Villa', location: '12 Willow Creek Ln', price: 1250000, status: 'Active' as const },
    { title: 'Sunset Apartments', location: '88 Ocean Blvd', price: 850000, status: 'Pending' as const },
  ]

  it('renders a list of properties', () => {
    render(<PropertyTable properties={mockProperties} />)
    
    expect(screen.getByText('The Nordic Villa')).toBeInTheDocument()
    expect(screen.getByText('Sunset Apartments')).toBeInTheDocument()
  })
})
