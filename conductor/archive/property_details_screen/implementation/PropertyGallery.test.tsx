import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PropertyGallery } from './PropertyGallery'

describe('PropertyGallery', () => {
  const images = [
    '/image1.jpg',
    '/image2.jpg',
    '/image3.jpg',
  ]

  it('renders the gallery images correctly', () => {
    render(<PropertyGallery images={images} />)
    const imgs = screen.getAllByRole('img')
    expect(imgs).toHaveLength(images.length)
  })
})
