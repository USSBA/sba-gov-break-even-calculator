import React from 'react'
import { render, screen } from '@testing-library/react'
import BreakEvenCalculator from '../../../pages/index'

describe('Hero', () => {
  beforeEach(() => {
    render(<BreakEvenCalculator />)
  })

  it('contains calculator icon', () => {
    screen.getByRole('img', { name: /calculator icon/i })
  })

  it('displays the correct heading', () => {
    screen.getByRole('heading', { name: /calculate your break-even point/i })
  })

  it('displays the formula', () => {
    screen.getByText(/fixed costs ÷ \(price - variable costs\) = break-even point in units/i)
  })
})