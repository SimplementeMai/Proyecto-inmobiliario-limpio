import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PropertyCard } from './PropertyCard'
import { FavoriteProvider } from './FavoriteContext'

describe('PropertyCard', () => {
  const mockProperty = {
    id: 'test-id-1',
    slug: 'test-property',
    price: 1500000,
    location: 'San Francisco, CA',
    beds: 3,
    baths: 2,
    imageUrl: '/test-property.jpg',
  }

  it('renders property details correctly', () => {
    render(
      <FavoriteProvider>
        <PropertyCard property={mockProperty} />
      </FavoriteProvider>
    )

    expect(screen.getByText(/\$1.5M/i)).toBeInTheDocument()
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument()
    expect(screen.getByText(/3 Hab./i)).toBeInTheDocument()
    expect(screen.getByText(/2 Baños/i)).toBeInTheDocument()

    const imgElement = screen.getByRole('img', { name: /San Francisco, CA/i })
    expect(imgElement).toBeInTheDocument()
    expect(imgElement).toHaveAttribute('src', '/test-property.jpg')
  })
})
