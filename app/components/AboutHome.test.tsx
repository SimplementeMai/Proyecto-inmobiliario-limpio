import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AboutHome } from './AboutHome'

describe('AboutHome', () => {
  const mockDescription = 'Experience modern luxury in this architecturally stunning home.'
  const mockAmenities = ['Smart Home System', 'Swimming Pool']

  it('renders the description and amenities correctly', () => {
    render(<AboutHome description={mockDescription} amenities={mockAmenities} />)
    
    expect(screen.getByText(mockDescription)).toBeInTheDocument()
    mockAmenities.forEach(amenity => {
      expect(screen.getByText(amenity)).toBeInTheDocument()
    })
  })
})
