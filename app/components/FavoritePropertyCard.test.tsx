import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FavoritePropertyCard } from './FavoritePropertyCard'
import { FavoriteProvider } from './FavoriteContext'

describe('FavoritePropertyCard', () => {
  const mockProperty = {
    title: 'Luxury Apartment',
    price: 850000,
    imageUrl: '/prop1.jpg',
  }

  it('renders property title and price', () => {
    render(
      <FavoriteProvider>
        <FavoritePropertyCard property={mockProperty} />
      </FavoriteProvider>
    )
    
    expect(screen.getByText('Luxury Apartment')).toBeInTheDocument()
    expect(screen.getByText(/\$0.8M/i)).toBeInTheDocument()
  })
})
