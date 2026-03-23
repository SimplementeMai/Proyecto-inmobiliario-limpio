import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { UserCard } from './UserCard'

describe('UserCard', () => {
  const mockUser = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    status: 'active' as const,
  }

  it('renders user details correctly', () => {
    render(<UserCard user={mockUser} />)
    
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
    expect(screen.getByText(/active/i)).toBeInTheDocument()
  })
})
