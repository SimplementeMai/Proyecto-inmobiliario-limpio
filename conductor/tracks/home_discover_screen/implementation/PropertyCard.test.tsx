import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PropertyCard } from './PropertyCard'

describe('PropertyCard', () => {
  const mockProperty = {
    price: 1500000,
    location: 'San Francisco, CA',
    beds: 3,
    baths: 2,
    imageUrl: '/test-property.jpg',
  }

  it('renders property details correctly', () => {
    render(<PropertyCard property={mockProperty} />)
    
    // Check price
    expect(screen.getByText(/\$1.5M/i)).toBeInTheDocument()
    
    // Check location
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument()
    
    // Check specs
    expect(screen.getByText('3 Beds')).toBeInTheDocument()
    expect(screen.getByText('2 Baths')).toBeInTheDocument()
  })
})
