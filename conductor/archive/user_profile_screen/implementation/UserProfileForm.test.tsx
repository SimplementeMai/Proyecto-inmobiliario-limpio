import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { UserProfileForm } from './UserProfileForm'

describe('UserProfileForm', () => {
  it('renders form fields for user profile', () => {
    render(<UserProfileForm />)
    
    expect(screen.getByPlaceholderText(/full name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument()
  })
})
