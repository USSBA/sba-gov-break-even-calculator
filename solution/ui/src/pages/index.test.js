import React from 'react'
import { shallow } from 'enzyme'
import { render, screen } from '@testing-library/react';

import BreakEvenCalculator from './index.js'

test('renders an accordion', () => {
  render(<BreakEvenCalculator />)
  expect(screen.getAllByTestId('accordion')).toHaveLength(1)
})

describe('BreakEvenCalculator', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<BreakEvenCalculator />)
    expect(wrapper).toHaveLength(1);
  })

  it('displays correct editable totals based on step number', () => {
    const wrapper = shallow(<BreakEvenCalculator />)
    expect(wrapper.find('EditableTotal')).toHaveLength(0)
    wrapper.setState({stepNum: 1})
    expect(wrapper.find('EditableTotal')).toHaveLength(1)
    wrapper.setState({stepNum: 2})
    expect(wrapper.find('EditableTotal')).toHaveLength(2)
    wrapper.setState({stepNum: 3})
    expect(wrapper.find('EditableTotal')).toHaveLength(3)
  })
})
