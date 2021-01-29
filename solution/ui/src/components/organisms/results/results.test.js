import React from 'react'
import { render, screen } from '@testing-library/react';
import { Results } from '../../organisms'

describe('Results', () => {
  beforeEach(() => {
    render(<Results 
      variableCostPerUnit='12'
      numUnits='200'
      pricePerUnit='25'
      totalFixedCost='1000'
      updateFixedCost={jest.fn()}
      updateNumUnits={jest.fn()}
      updatePricePerUnit={jest.fn()}
      updateVariableCost={jest.fn()} 
    />)
  });

  test('renders break even result card', () => {
    expect(screen.getByRole('heading', {
      name: /your break\-even point results/i
    })).toBeInTheDocument()
  })

  test('renders break even profile card', () => {
    expect(screen.getByRole('heading', {
      name: /break\-even profile/i
    })).toBeInTheDocument()
  })

  test('renders the graph', () => {
    expect(screen.getByRole('heading', {
      name: /break\-even point graph/i
    })).toBeInTheDocument()
  })

  test('renders BreakEvenDataTable', () => {
    expect(screen.getByRole('heading', {
      name: /break\-even point unit sales/i
    })).toBeInTheDocument()
  })

  test('renders print CTA', () => {
    expect(screen.getByRole('button', {
      name: /print results/i
    })).toBeInTheDocument()
  })
})

describe ('ResultsWithHighVC', () => { 
  test('doesn\'t render the graph when variable cost is equal or higher than price per unit', () => {
    render(<Results 
      variableCostPerUnit='1200'
      numUnits='200'
      pricePerUnit='25'
      totalFixedCost='1000'
      updateFixedCost={jest.fn()}
      updateNumUnits={jest.fn()}
      updatePricePerUnit={jest.fn()}
      updateVariableCost={jest.fn()} 
    />)

    expect(screen.queryByRole('heading', {
      name: /break\-even point graph/i
    })).not.toBeInTheDocument()
  })
})
