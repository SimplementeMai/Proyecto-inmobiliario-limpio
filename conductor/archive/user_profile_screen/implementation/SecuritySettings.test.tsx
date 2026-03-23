import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SecuritySettings } from './SecuritySettings'

describe('SecuritySettings', () => {
  it('renders password change fields', () => {
    render(<SecuritySettings />)
    
    expect(screen.getByPlaceholderText('New Password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Confirm New Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /update password/i })).toBeInTheDocument()
  })
})
