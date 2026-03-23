import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PropertyRow } from './PropertyRow'

describe('PropertyRow', () => {
  const mockProperty = {
    title: 'The Nordic Villa',
    location: '12 Willow Creek Ln',
    price: 1250000,
    status: 'Active' as const,
  }

  it('renders property row details correctly', () => {
    render(<PropertyRow property={mockProperty} />)
    
    expect(screen.getByText('The Nordic Villa')).toBeInTheDocument()
    expect(screen.getByText('12 Willow Creek Ln')).toBeInTheDocument()
    expect(screen.getByText(/\$1.25M/i)).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
  })
})
