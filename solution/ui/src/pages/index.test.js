import React from 'react'
import { shallow } from 'enzyme'
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import BreakEvenCalculator from './index.js'

test('renders an accordion', () => {
  render(<BreakEvenCalculator />)
  expect(screen.getAllByTestId('accordion')).toHaveLength(1)
})

test('Editable Total updates value when apply is clicked', () => {
  render(<BreakEvenCalculator />)
  // setup to get to page two where editable total appears
  const totalFixedCostYesRadioText = 'yes, I know the total of my monthly fixed costs'
  userEvent.click(screen.getByLabelText(totalFixedCostYesRadioText))
  userEvent.type(screen.getByLabelText('total fixed cost'), '1000')
  fireEvent.submit(screen.getByTestId('fixedCosts-form'))
  // test eaditable total onEdit implementation
  userEvent.click(screen.getByLabelText(`edit Total fixed cost`))
  userEvent.type(screen.getByRole('input'), '0')
  expect(screen.getByRole('input')).toHaveValue(10000)
  userEvent.click(screen.getByLabelText('apply'))
  expect(screen.getByTestId('value')).toHaveTextContent('10,000')
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
