import React from 'react'
import { shallow } from 'enzyme'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import BreakEvenCalculator from '../../../pages/index'
import FixedCosts from './fixedCosts'
import PricePerUnit from '../pricePerUnit/pricePerUnit'
import { fixedCostInitState } from './fixedCostsFieldsData'
import { CALCULATOR_STEPS } from '../../../constants'

describe('FixedCosts', () => {
  
  const goToStepMock = jest.fn()

  const baseProps = {
    visible: true,
    setFixedCost: jest.fn(),
    restart: jest.fn(),
    goToStep: goToStepMock,
  }

  beforeEach(() => {
    goToStepMock.mockReset()
  })

  beforeEach(() => { 
    render(<FixedCosts
      visible={true}
      goToStep={jest.fn()}
      setFixedCost={jest.fn()}
      totalFixedCosts='0'
      key='false' 
    />)
  });

  test('Has a heading caleld "Calculate your total fixed costs"', () => {
    screen.getByRole('heading', { name: /calculate your total fixed costs/i })
  })

  test("Click on 'yes' displays text field and sets knowFixedCost value to yes", () => {
    const knowFixedCost = screen.getByRole('radio', { name: /yes, i know the total of my monthly fixed costs/i })
    userEvent.click(knowFixedCost)
    expect(knowFixedCost.checked).toBe(true)
    expect(knowFixedCost.value).toEqual("yes")
  })
  
  test("Click on 'yes' displays only fixed cost text field" , () => {
    const knowFixedCost = screen.getByRole('radio', { name: /yes, i know the total of my monthly fixed costs/i })
    userEvent.click(knowFixedCost)
    screen.getByRole('spinbutton', { name: /total fixed cost/i })
    expect(screen.queryByRole('spinbutton', { name: /amortization/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /rent/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /insurance/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /salaries/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /utilities/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /deprecation/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /interest expense/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /property taxes/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /other monthly costs/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /other fixed costs/i })).not.toBeInTheDocument()
  })

  test("Click 'no, input values individually', sets not knowFixedCost value to no", () => {
    const notKnowFixedCost = screen.getByRole('radio', { name: /no, input values individually/i })
    userEvent.click(notKnowFixedCost)
    expect(notKnowFixedCost.checked).toBe(true)
    expect(notKnowFixedCost.value).toEqual("no")
  })

  test("Click 'no, input values individually', displays all fields but fixed cost field", () => {
    const notKnowFixedCost = screen.getByRole('radio', { name: /no, input values individually/i })
    userEvent.click(notKnowFixedCost)
    expect(screen.queryByRole('spinbutton', { name: /total fixed cost/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /amortization/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /rent/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /insurance/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /salaries/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /utilities/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /deprecation/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /interest expense/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /property taxes/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /other monthly costs/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /other fixed costs/i })).toBeInTheDocument()
  })

  test('shows the continue button when a selection has been made', () => {
    const knowFixedCost = screen.getByRole('radio', { name: /yes, i know the total of my monthly fixed costs/i })
    const notKnowFixedCost = screen.getByRole('radio', { name: /no, input values individually/i })
    expect(screen.queryByRole('button', { name: /continue/i })).not.toBeInTheDocument()

    userEvent.click(knowFixedCost)
    screen.getByRole('button', { name: /continue/i })
    userEvent.click(notKnowFixedCost)
    screen.getByRole('button', { name: /continue/i })
  })

  test('shows fixed cost suggestion box only on yes selection', () => {
    const knowFixedCost = screen.getByRole('radio', { name: /yes, i know the total of my monthly fixed costs/i })
    const notKnowFixedCost = screen.getByRole('radio', { name: /no, input values individually/i })
    expect(screen.queryByText(/unsure about your total fixed costs?/i)).not.toBeInTheDocument()

    userEvent.click(knowFixedCost)
    expect(screen.queryByText(/unsure about your total fixed costs?/i)).toBeInTheDocument()
    userEvent.click(notKnowFixedCost)
    expect(screen.queryByText(/unsure about your total fixed costs?/i)).not.toBeInTheDocument()
  })

  test('shows NumbersInputForm on suggestion link click', () => {
    const knowFixedCost = screen.getByRole('radio', { name: /yes, i know the total of my monthly fixed costs/i })
    userEvent.click(knowFixedCost)
    userEvent.click(screen.getByRole('button', { name: /add all fixed costs individually/i }))
    expect(screen.queryByRole('spinbutton', { name: /total fixed cost/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /amortization/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /rent/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /insurance/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /salaries/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /utilities/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /deprecation/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /interest expense/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /property taxes/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /other monthly costs/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /other fixed costs/i })).toBeInTheDocument()
  })

  test('calls setFixedCost and does not go to the next step when fixedcost field is empty', () => {
    const knowFixedCost = screen.getByRole('radio', { name: /yes, i know the total of my monthly fixed costs/i })
    userEvent.click(knowFixedCost)
    screen.getByRole('spinbutton', { name: /total fixed cost/i })
    userEvent.click(screen.getByRole('button', { name: /continue/i }))
    screen.getByText(/enter a valid fixed cost to continue/i)
  })

  test ('outputs a message if user has not filled at least one field', () => {
    const notKnowFixedCost = screen.getByRole('radio', { name: /no, input values individually/i })
    userEvent.click(notKnowFixedCost)
    userEvent.click(screen.getByRole('button', { name: /continue/i }))
    screen.getByText(/enter a valid fixed cost to continue/i)
  })

  test('resets fields on radio button switch', () => {
    const wrapper = shallow(<FixedCosts {...baseProps} />);
    wrapper.setState({knowFixedCosts: 'no'})
    wrapper.setState({fields: {Rent: '100'}})
    wrapper.find('[label="Yes"]').simulate('change', null, {value: 'yes'})
    expect(wrapper.state().fields).toEqual(fixedCostInitState);
  })

  test('correctly resets the total cost value on radio button change', () => {
    const knowFixedCost = screen.getByRole('radio', { name: /yes, i know the total of my monthly fixed costs/i })
    const notKnowFixedCost = screen.getByRole('radio', { name: /no, input values individually/i })
    userEvent.click(knowFixedCost)
    expect(userEvent.type(screen.getByRole('spinbutton', { name: /total fixed cost/i }), '1000'))
    expect(screen.getByRole('spinbutton', {  name: /total fixed cost/i})).toHaveValue(1000)
    userEvent.click(notKnowFixedCost)
    userEvent.click(knowFixedCost)

    expect(screen.getByRole('spinbutton', { name: /total fixed cost/i }).value).toEqual('')
  })
})

describe('FixedCosts', () => {
  beforeEach(() => { 
    render(<BreakEvenCalculator/>)
  });

  test('correctly calculates total cost when a field value is erased', () => {
    const notKnowFixedCost = screen.getByRole('radio', { name: /no, input values individually/i })
    userEvent.click(notKnowFixedCost)
    userEvent.type(screen.getByRole('spinbutton', { name: /rent/i }), '100')
    userEvent.type(screen.getByRole('spinbutton', { name: /salaries/i }), '3000')
    userEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(screen.getByText(/\$3,100/i)).toBeInTheDocument
    userEvent.click(screen.getByRole('button', {  name: /back to fixed costs/i}))
    userEvent.click(notKnowFixedCost)

    userEvent.clear(screen.getByRole('spinbutton', { name: /rent/i }))
    userEvent.clear(screen.getByRole('spinbutton', { name: /salaries/i }))
    userEvent.type(screen.getByRole('spinbutton', { name: /salaries/i }), '3000')
    userEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(screen.getByText(/\$3,000/i)).toBeInTheDocument
  })

  test ('does not go to next step if all the fields are empty', () => {
    const notKnowFixedCost = screen.getByRole('radio', { name: /no, input values individually/i })
    userEvent.click(notKnowFixedCost)
    userEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(screen.getByRole('heading', {  name: /calculate your total fixed costs/i})).toBeInTheDocument()
  })
  
  test ('goes to next step if at least one of the form fields is filled', () => {
    const notKnowFixedCost = screen.getByRole('radio', { name: /no, input values individually/i })
    userEvent.click(notKnowFixedCost)
    userEvent.type(screen.getByRole('spinbutton', { name: /rent/i }), '1000')
    expect(screen.getByRole('spinbutton', { name: /rent/i })).toHaveValue(1000)
    userEvent.click(screen.getByRole('button', { name: /continue/i }))
    screen.getByRole('heading', {  name: /estimate your selling price per unit/i})
  })
})