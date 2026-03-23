import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ImageUploader } from './ImageUploader'

describe('ImageUploader', () => {
  it('renders upload area', () => {
    render(<ImageUploader onUpload={() => {}} />)
    
    expect(screen.getByText(/drag & drop or click to upload/i)).toBeInTheDocument()
  })
})
