import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FavoritesList } from './FavoritesList'

describe('FavoritesList', () => {
  const mockProperties = [
    { title: 'Luxury Apartment', price: 850000, imageUrl: '/prop1.jpg' },
  ]

  it('renders list of favorites when items exist', () => {
    render(<FavoritesList properties={mockProperties} />)
    
    expect(screen.getByText('Luxury Apartment')).toBeInTheDocument()
  })

  it('renders empty state when no items', () => {
    render(<FavoritesList properties={[]} />)
    
    expect(screen.getByText(/no favorites yet/i)).toBeInTheDocument()
  })
})
