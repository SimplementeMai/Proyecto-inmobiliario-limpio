import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CalendarPicker } from './CalendarPicker'

describe('CalendarPicker', () => {
  it('renders a calendar picker', () => {
    const { container } = render(<CalendarPicker onChange={() => {}} />)
    expect(container.querySelector('input[type="date"]')).toBeInTheDocument()
  })
})
