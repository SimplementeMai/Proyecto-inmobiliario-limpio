import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { CategoryBar } from './CategoryBar'

describe('CategoryBar', () => {
  const categories = [
    { id: 'houses', label: 'Houses' },
    { id: 'condos', label: 'Condos' },
    { id: 'apartments', label: 'Apartments' },
  ]

  it('renders all categories correctly', () => {
    const onSelect = vi.fn()
    render(<CategoryBar categories={categories} activeId="houses" onSelect={onSelect} />)
    
    categories.forEach(cat => {
      expect(screen.getByText(cat.label)).toBeInTheDocument()
    })
  })

  it('highlights the active category', () => {
    const onSelect = vi.fn()
    render(<CategoryBar categories={categories} activeId="condos" onSelect={onSelect} />)
    
    const activeBtn = screen.getByRole('button', { name: /condos/i })
    expect(activeBtn).toHaveClass('bg-primary')
  })
})
