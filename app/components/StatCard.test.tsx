import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { StatCard } from './StatCard'

describe('StatCard', () => {
  it('renders stats correctly', () => {
    render(<StatCard title="Total Listings" value="24" icon="apartment" />)
    
    expect(screen.getByText('Total Listings')).toBeInTheDocument()
    expect(screen.getByText('24')).toBeInTheDocument()
  })
})
