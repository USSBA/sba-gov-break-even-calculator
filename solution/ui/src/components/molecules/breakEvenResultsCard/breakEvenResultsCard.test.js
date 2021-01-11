import React from 'react'
import { render, screen } from '@testing-library/react'

import BreakEvenResultsCard from './breakEvenResultsCard'

describe('BreakEvenResultsCard', () => {
  const props = {
    expectedUnits: '100',
    breakEvenUnits: '200',
    breakEvenRevenue: '3000',
    pricePerUnit: '15',
    variableCost: '5',
    fixedCost: '2000',
  }
  
  describe('loss', () => {
    beforeEach(() => {
      render(<BreakEvenResultsCard {...props} />)
    })
  
    test('displays correct heading', () => {
      expect(screen.getByRole('heading', { name: /your break-even point results/i }))
    })
  
    test('displays correct subheading', () => {
      expect(screen.getByText(/estimated calculation based on your inputs/i))
    })
  
    test('displays break even units sold', () => {
      expect(screen.getByText(/200/i))
    })
  
    test('displays anticipated units', () => {
      expect(screen.getByText(/100 units/i))
    })
  
    test('displays unit sales', () => {
      expect(screen.getByText(/\$3,000/i))
    })
  
    test('displays contribution margin ratio', () => {
      expect(screen.getByText(/67%/i))
    })
  
    test('displays units to sell to break even', () => {
      expect(screen.getAllByText(/100/i))
      expect(screen.getByText(/more to break even/i))
    })
  
    test('corectly formats loss', () => {
      expect(screen.getByText(/your loss will be/i))
      expect(screen.getByText(/-\$1,000/i))
    })
  })

  describe('profit', () => {
    test('correctly formats profit', () => {
      render(<BreakEvenResultsCard {...props} expectedUnits='500' />)
      expect(screen.getByText(/your profit will be/i))
      expect(screen.getAllByText(/\$3,000/i))
    })
  })
})