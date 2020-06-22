import React from 'react'
import { shallow } from 'enzyme'
import BreakEvenCalculator from './index.js'

describe('BreakEvenCalculator', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<BreakEvenCalculator />)
    expect(wrapper).toHaveLength(1);
  })
})
