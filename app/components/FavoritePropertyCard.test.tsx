import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FavoritePropertyCard } from './FavoritePropertyCard'

describe('FavoritePropertyCard', () => {
  const mockProperty = {
    title: 'Luxury Apartment',
    price: 850000,
    imageUrl: '/prop1.jpg',
  }

  it('renders property title and price', () => {
    render(<FavoritePropertyCard property={mockProperty} />)
    
    expect(screen.getByText('Luxury Apartment')).toBeInTheDocument()
    expect(screen.getByText(/\$0.8M/i)).toBeInTheDocument()
  })
})
