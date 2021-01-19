import React from 'react'
import { render, screen } from '@testing-library/react'
import Footer from './footer.js'

describe('Footer', () => {
  it('renders SBA logo', () => {
    render(<Footer />)
    screen.getByRole('img', { name: /small business administration/i })
  })
})