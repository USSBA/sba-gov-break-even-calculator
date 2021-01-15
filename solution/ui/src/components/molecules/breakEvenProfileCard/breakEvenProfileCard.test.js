import React from 'react'
import { render, screen } from '@testing-library/react'

import BreakEvenProfileCard from './breakEvenProfileCard'

const sampleProps = {
  variableCostPerUnit: '10',
  numUnits: '90',
  pricePerUnit: '110',
  totalFixedCost: '1000',
  updateNumUnits: jest.fn(),
  updatePricePerUnit: jest.fn(),
  updateFixedCost: jest.fn(),
  updateVariableCost: jest.fn()
}

describe('BreakEvenProfileCard', () => {
  test('renders running totals', () => {
    render(<BreakEvenProfileCard {...sampleProps}/>)
    expect(screen.getAllByTestId('title')).toHaveLength(4)
  })

  test('renders passed numbers for running totals', () => {
    render(<BreakEvenProfileCard {...sampleProps}/>)
    expect(screen.getByText(/\$1,000/i))
    expect(screen.getByText(/90/i))
    expect(screen.getByText(/\$110/i))
    expect(screen.getByText(/\$10/i))
  })
})