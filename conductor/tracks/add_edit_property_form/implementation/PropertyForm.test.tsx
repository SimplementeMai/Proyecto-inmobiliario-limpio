import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PropertyForm } from './PropertyForm'

describe('PropertyForm', () => {
  it('renders essential form fields', () => {
    render(<PropertyForm />)
    
    expect(screen.getByPlaceholderText(/título de la propiedad/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/precio/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /crear propiedad/i })).toBeInTheDocument()
  })
})
