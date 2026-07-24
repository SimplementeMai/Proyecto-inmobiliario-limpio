import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { DashboardHeader } from './DashboardHeader'

describe('DashboardHeader', () => {
  it('renders the header title and button', () => {
    render(<DashboardHeader title="My Properties" />)
    
    expect(screen.getByText('My Properties')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /agregar propiedad/i })).toBeInTheDocument()
  })
})
