import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProfileAvatar } from './ProfileAvatar'

describe('ProfileAvatar', () => {
  it('renders avatar with fallback if image fails', () => {
    render(<ProfileAvatar src="invalid-src" alt="Profile" />)
    expect(screen.getByText('P')).toBeInTheDocument()
  })
})
