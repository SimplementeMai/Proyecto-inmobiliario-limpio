import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PropertyCard } from './PropertyCard' // Assuming PropertyCard will be in the same directory

describe('PropertyCard', () => {
  const mockProperty = {
    price: 1500000,
    location: 'San Francisco, CA',
    beds: 3,
    baths: 2,
    imageUrl: '/test-property.jpg', // Placeholder image
  }

  it('renders property details correctly', () => {
    render(<PropertyCard property={mockProperty} />)

    // Test for price rendering (e.g., formatted as $1.5M)
    expect(screen.getByText(/\$1.5M/i)).toBeInTheDocument()

    // Test for location rendering
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument()

    // Test for beds and baths rendering
    expect(screen.getByText(/3 Hab./i)).toBeInTheDocument()
    expect(screen.getByText(/2 Baños/i)).toBeInTheDocument()

    // Test for image rendering (checking if an img tag with the src exists)
    const imgElement = screen.getByRole('img', { name: /San Francisco, CA/i })
    expect(imgElement).toBeInTheDocument()
    expect(imgElement).toHaveAttribute('src', '/test-property.jpg')
  })

  // Add more tests here for edge cases, different property data, etc.
  // For example, testing without an image URL or with different specs.
})
