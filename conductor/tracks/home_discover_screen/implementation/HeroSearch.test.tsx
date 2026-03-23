import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { HeroSearch } from './HeroSearch'

describe('HeroSearch', () => {
  it('renders the search input and hero content', () => {
    render(<HeroSearch />)
    
    expect(screen.getByPlaceholderText(/search for your dream home/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  })
})
