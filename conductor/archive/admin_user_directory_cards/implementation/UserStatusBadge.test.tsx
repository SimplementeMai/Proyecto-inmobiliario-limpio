import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { UserStatusBadge } from './UserStatusBadge'

describe('UserStatusBadge', () => {
  it('renders active status correctly', () => {
    render(<UserStatusBadge status="active" />)
    expect(screen.getByText(/active/i)).toBeInTheDocument()
  })

  it('renders pending status correctly', () => {
    render(<UserStatusBadge status="pending" />)
    expect(screen.getByText(/pending/i)).toBeInTheDocument()
  })
})
