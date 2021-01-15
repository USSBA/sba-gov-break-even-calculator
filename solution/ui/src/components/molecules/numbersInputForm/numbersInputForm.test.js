import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {FixedCosts, VariableCosts} from '../../organisms/'

const baseProps = {
  visible: true,
  pricePerUnit: '12',
  setFixedCost: jest.fn(),
  setVariableCost: jest.fn(),
  restart: jest.fn(),
  goToStep: jest.fn(),
}

describe('NumbersInputForm in Fixed Costs', () => {
  beforeEach(() => {
    render(<FixedCosts {...baseProps} />)
    userEvent.click(screen.getByText(/no, input values individually/i))
  })

  test('renders the correct number of fields', () => {
    expect(screen.getAllByRole('spinbutton')).toHaveLength(10)
    expect(screen.getAllByText('$')).toHaveLength(10)
  })
})

describe('NumbersInputForm in Variable Costs', () => {
  beforeEach(() => {
    render(<VariableCosts {...baseProps} />)
    userEvent.click(screen.getByText(/no, input values individually/i))
  })

  test('renders the correct number of fields', () => {
    expect(screen.getAllByRole('spinbutton')).toHaveLength(6)
    expect(screen.getAllByText('$')).toHaveLength(6)
  })
})
