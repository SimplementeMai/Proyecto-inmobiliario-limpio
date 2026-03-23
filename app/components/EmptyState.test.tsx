import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { EmptyState } from './EmptyState'

describe('EmptyState', () => {
  it('renders empty state message', () => {
    render(<EmptyState message="No favorites yet" />)
    
    expect(screen.getByText('No favorites yet')).toBeInTheDocument()
  })
})
