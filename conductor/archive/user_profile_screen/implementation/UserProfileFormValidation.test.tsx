import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { UserProfileForm } from './UserProfileForm'

describe('UserProfileForm Validation', () => {
  it('shows error when required fields are empty', async () => {
    render(<UserProfileForm />)
    
    const submitBtn = screen.getByRole('button', { name: /save changes/i })
    fireEvent.click(submitBtn)
    
    await waitFor(() => {
      expect(screen.getByText(/full name is required/i)).toBeInTheDocument()
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()
    })
  })
})
