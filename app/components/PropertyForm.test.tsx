import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PropertyForm } from './PropertyForm'

describe('PropertyForm', () => {
  it('renders essential form fields', () => {
    render(<PropertyForm />)
    
    expect(screen.getByPlaceholderText(/enter property title/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/enter price/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save property/i })).toBeInTheDocument()
  })
})
