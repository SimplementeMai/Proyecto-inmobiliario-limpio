import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { UserDirectory } from './UserDirectory'

describe('UserDirectory', () => {
  const mockUsers = [
    { name: 'Jane Doe', email: 'jane@example.com', status: 'active' as const },
    { name: 'John Smith', email: 'john@example.com', status: 'pending' as const },
  ]

  it('renders a list of users', () => {
    render(<UserDirectory users={mockUsers} />)
    
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByText('John Smith')).toBeInTheDocument()
  })
})
