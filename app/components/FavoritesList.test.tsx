import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FavoritesList } from './FavoritesList'
import { FavoriteProvider } from './FavoriteContext'

describe('FavoritesList', () => {
  const mockProperties = [
    { id: 'test-id-1', slug: 'luxury-apartment', title: 'Luxury Apartment', price: 850000, imageUrl: '/prop1.jpg' },
  ]

  it('renders list of favorites when items exist', () => {
    render(
      <FavoriteProvider>
        <FavoritesList properties={mockProperties} />
      </FavoriteProvider>
    )
    
    expect(screen.getByText('Luxury Apartment')).toBeInTheDocument()
  })

  it('renders empty state when no items', () => {
    render(
      <FavoriteProvider>
        <FavoritesList properties={[]} />
      </FavoriteProvider>
    )
    
    expect(screen.getByText(/no favorites yet/i)).toBeInTheDocument()
  })
})
