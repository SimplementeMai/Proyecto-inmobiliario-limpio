import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { VisitBookingForm } from './VisitBookingForm'

describe('VisitBookingForm', () => {
  it('renders booking form fields', () => {
    render(<VisitBookingForm propertyId="123" />)
    
    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /book visit/i })).toBeInTheDocument()
  })
})
