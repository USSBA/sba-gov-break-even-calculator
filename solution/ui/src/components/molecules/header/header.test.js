import React from 'react'
import { render, screen } from '@testing-library/react'

import Header from './header.js'

describe('Header', () => {
  it('renders SBA logo', () => {
    render(<Header />)
    screen.getByRole('img', { name: /small business administration/i })
  })

  it('renders link back to landing page', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /return to break-even page/i })).toHaveAttribute('href', '/breakevenpointcalculator')
  })
})