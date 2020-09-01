import React from 'react'
import { shallow } from 'enzyme'

import BreakEvenProfileCard from './breakEvenProfileCard'

describe('BreakEvenProfileCard', () => {
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

  it('renders running totals', () => {
    const wrapper = shallow(<BreakEvenProfileCard {...sampleProps}/>)
    expect(wrapper.find('EditableTotal')).toHaveLength(4)
  })

  it('renders a modal', () => {
    const wrapper = shallow(<BreakEvenProfileCard {...sampleProps}/>)
    expect(wrapper.find('Modal')).toHaveLength(1)
  })
})