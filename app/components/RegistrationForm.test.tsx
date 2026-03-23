import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { RegistrationForm } from './RegistrationForm'

describe('RegistrationForm', () => {
  it('renders registration fields', () => {
    render(<RegistrationForm />)
    
    expect(screen.getByPlaceholderText(/full name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument()
  })
})
