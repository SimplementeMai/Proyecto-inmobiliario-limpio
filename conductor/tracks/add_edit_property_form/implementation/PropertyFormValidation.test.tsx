import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PropertyForm } from './PropertyForm'

describe('PropertyForm Validation', () => {
  it('shows error when title is empty', async () => {
    render(<PropertyForm />)
    
    const submitBtn = screen.getByRole('button', { name: /crear propiedad/i })
    fireEvent.click(submitBtn)
    
    await waitFor(() => {
      expect(screen.getByText(/el título es obligatorio/i)).toBeInTheDocument()
    })
  })
})
