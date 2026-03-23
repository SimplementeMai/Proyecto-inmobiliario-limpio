import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Header } from './Header'

describe('Header', () => {
  it('renders the LuxeEstate logo', () => {
    render(<Header />)
    expect(screen.getByText('LuxeEstate')).toBeInTheDocument()
  })

  it('renders all main navigation links', () => {
    render(<Header />)
    expect(screen.getByText('Buy')).toBeInTheDocument()
    expect(screen.getByText('Rent')).toBeInTheDocument()
    expect(screen.getByText('Sell')).toBeInTheDocument()
    expect(screen.getByText('Saved Homes')).toBeInTheDocument()
  })

  it('renders the Search and Notification buttons', () => {
    render(<Header />)
    expect(screen.getByLabelText('Search')).toBeInTheDocument()
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument()
  })

  it('renders the User Avatar', () => {
    render(<Header />)
    // El avatar usa AvatarImage con alt="User", pero a veces falla en test.
    // Buscamos por texto de fallback si la imagen falla o por elemento.
    expect(screen.getByText('JD')).toBeInTheDocument()
  })
})
