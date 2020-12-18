import React from 'react'
import { shallow } from 'enzyme'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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


describe('Confirmation modal functionality', () => {
  test('it shows confirmation modal on value change', () => {
    render(<BreakEvenProfileCard {...sampleProps}/>)
    userEvent.click(screen.queryAllByRole('button')[0])
    userEvent.click(screen.getByLabelText('apply'))
    expect(screen.queryByRole('alert')).toBeInTheDocument()
  })

  test('it closes confirmation modal on x click', () => {
    render(<BreakEvenProfileCard {...sampleProps}/>)
    userEvent.click(screen.queryAllByRole('button')[0])
    userEvent.click(screen.getByLabelText('apply'))
    expect(screen.queryByRole('alert')).toBeInTheDocument()
    userEvent.click(screen.getByLabelText('close modal'))
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  test('it closes confirmation modal after a timeout', async() => {
    render(<BreakEvenProfileCard {...sampleProps}/>)
    userEvent.click(screen.queryAllByRole('button')[0])
    userEvent.click(screen.getByLabelText('apply'))
    expect(screen.queryByRole('alert')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    }, {timeout: 4000})
  })
})

describe('BreakEvenProfileCard', () => {
  it('renders running totals', () => {
    const wrapper = shallow(<BreakEvenProfileCard {...sampleProps}/>)
    expect(wrapper.find('EditableTotal')).toHaveLength(4)
  })

  it('renders a modal', () => {
    const wrapper = shallow(<BreakEvenProfileCard {...sampleProps}/>)
    expect(wrapper.find('Modal')).toHaveLength(1)
  })
})