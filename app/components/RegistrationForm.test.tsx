import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { RegistrationForm } from './RegistrationForm'

describe('RegistrationForm', () => {
  it('renders registration fields', () => {
    render(<RegistrationForm />)
    
    expect(screen.getByPlaceholderText(/nombre completo/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /registrarse/i })).toBeInTheDocument()
  })
})
