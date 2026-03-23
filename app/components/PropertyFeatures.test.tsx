import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PropertyFeatures } from './PropertyFeatures'

describe('PropertyFeatures', () => {
  const features = [
    { label: 'Bedrooms', value: '3' },
    { label: 'Bathrooms', value: '2' },
    { label: 'Sqft', value: '1,500' },
  ]

  it('renders features list correctly', () => {
    render(<PropertyFeatures features={features} />)
    
    features.forEach(f => {
      expect(screen.getByText(f.label)).toBeInTheDocument()
      expect(screen.getByText(f.value)).toBeInTheDocument()
    })
  })
})
