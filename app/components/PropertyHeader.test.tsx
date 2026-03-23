import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PropertyHeader } from './PropertyHeader'

describe('PropertyHeader', () => {
  const mockProperty = {
    title: 'Modern Luxury Villa',
    price: 2500000,
    location: 'Beverly Hills, CA',
  }

  it('renders the property info correctly', () => {
    render(<PropertyHeader property={mockProperty} />)
    
    expect(screen.getByText('Modern Luxury Villa')).toBeInTheDocument()
    expect(screen.getByText(/\$2.5M/i)).toBeInTheDocument()
    expect(screen.getByText('Beverly Hills, CA')).toBeInTheDocument()
  })
})
