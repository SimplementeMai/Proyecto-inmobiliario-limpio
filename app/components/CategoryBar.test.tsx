import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { CategoryBar } from './CategoryBar' // Assuming CategoryBar will be in the same directory

describe('CategoryBar', () => {
  const mockCategories = [
    { id: 'houses', label: 'Houses' },
    { id: 'apartments', label: 'Apartments' },
    { id: 'condos', label: 'Condos' },
  ]

  it('renders all categories correctly', () => {
    const onSelect = vi.fn()
    render(<CategoryBar categories={mockCategories} activeId="houses" onSelect={onSelect} />)

    mockCategories.forEach(category => {
      expect(screen.getByText(category.label)).toBeInTheDocument()
    })
  })

  it('highlights the active category', () => {
    const onSelect = vi.fn()
    render(<CategoryBar categories={mockCategories} activeId="apartments" onSelect={onSelect} />)

    const activeCategoryButton = screen.getByRole('button', { name: 'Apartments' })
    // Assuming the active state applies a specific class or style, e.g., 'bg-primary'
    // This test will likely fail initially if the styling logic isn't yet implemented.
    expect(activeCategoryButton).toHaveClass(/bg-primary|active/) // Check for common active classes
  })

  it('calls onSelect when a category is clicked', () => {
    const onSelect = vi.fn()
    render(<CategoryBar categories={mockCategories} activeId="houses" onSelect={onSelect} />)

    const condoButton = screen.getByRole('button', { name: 'Condos' })
    fireEvent.click(condoButton)

    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith('condos')
  })

  // Add more tests for edge cases: empty categories, long category names, etc.
})
