import React from 'react'
import { shallow } from 'enzyme'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

import FixedCosts from './fixedCosts'
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

  it('renders without crashing', () => {
    const wrapper = shallow(<FixedCosts {...baseProps} />);
    expect(wrapper).toHaveLength(1);
  })

  it('has correct initial state', () => {
    const wrapper = shallow(<FixedCosts {...baseProps} />);
    expect(wrapper.state().knowFixedCosts).toBe(null)
    expect(wrapper.state().totalFixedCosts).toEqual('')
    expect(wrapper.state().fields).toEqual(fixedCostInitState);
  })

  it('changes knowFixedCosts state on radio button selection', () => {
    const wrapper = shallow(<FixedCosts {...baseProps} />);
    const yesButton = wrapper.find('[label="Yes"]')
    const noButton = wrapper.find('[name="noBox"]')
    yesButton.simulate('change', null, {value: 'yes'})
    expect(wrapper.state().knowFixedCosts).toEqual('yes')
    noButton.simulate('change', null, {value: 'no'})
    expect(wrapper.state().knowFixedCosts).toEqual('no')
  })

  it('shows the continue button when a selection has been made', () => {
    const wrapper = shallow(<FixedCosts {...baseProps} />);
    expect(wrapper.find('FormButton')).toHaveLength(0)
    wrapper.setState({knowFixedCosts: 'yes'})
    expect(wrapper.find('FormButton')).toHaveLength(1)
  })

  it('shows fixed cost suggestion box on yes selection', () => {
    const wrapper = shallow(<FixedCosts {...baseProps} />);
    expect(wrapper.find('.fixedCost-suggestion')).toHaveLength(0)
    wrapper.setState({knowFixedCosts: 'yes'})
    expect(wrapper.find('.fixedCost-suggestion')).toHaveLength(1)
  })

  it('shows NumbersInputForm on suggestion link click', () => {
    render(<FixedCosts
      visible={true}
      goToStep={jest.fn()}
      setFixedCost={jest.fn()}
      totalFixedCosts='0'
      key='false' 
    />)
    const knowFixedCost = screen.getByRole('radio', { name: /yes, i know the total of my monthly fixed costs/i })
    userEvent.click(knowFixedCost)
    expect(screen.queryByRole('spinbutton', { name: /total fixed cost/i })).toBeInTheDocument()

    userEvent.click(screen.getByRole('button', {  name: /add all fixed costs individually/i}))
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

  test('shows NumbersInputForm on suggestion link click', () => {
    render(<FixedCosts
      visible={true}
      goToStep={jest.fn()}
      setFixedCost={jest.fn()}
      totalFixedCosts='0'
      key='false' 
    />)
    const knowFixedCost = screen.getByRole('radio', { name: /yes, i know the total of my monthly fixed costs/i })
    userEvent.click(knowFixedCost)
    userEvent.click(screen.getByRole('button', {  name: /add all fixed costs individually/i}))
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

  it('shows NumbersInputForm on no selection', () => {
    const wrapper = shallow(<FixedCosts {...baseProps} />);
    expect(wrapper.find('NumbersInputForm')).toHaveLength(0)
    wrapper.setState({knowFixedCosts: 'no'})
    expect(wrapper.find('NumbersInputForm')).toHaveLength(1)
  })

  it('has the correct number of fields in the form', () => {
    const wrapper = shallow(<FixedCosts {...baseProps} />);
    wrapper.setState({knowFixedCosts: 'no'})
    expect(wrapper.find('NumbersInputForm').dive()).toHaveLength(10)
  })

  it('updates the corresponding field in state', () => {
    const wrapper = shallow(<FixedCosts {...baseProps} />);
    wrapper.setState({knowFixedCosts: 'no'})
    wrapper.find('NumbersInputForm').simulate('change', null, {name: 'Rent', value: '100'})
    expect(wrapper.state().fields.Rent).toEqual('100')
  })

  it('calls setFixedCost and goToStep functions on submit', () => {
    const setFixedCostMock = jest.fn()
    const wrapper = shallow(
      <FixedCosts {...baseProps} setFixedCost={setFixedCostMock} />
    );
    wrapper.setState({totalFixedCosts: 10}) 
    wrapper.setState({knowFixedCosts: 'yes'})
    
    wrapper.find('Form').simulate('submit')
    expect(setFixedCostMock).toHaveBeenCalledWith(10)
    expect(goToStepMock).toHaveBeenCalledWith(CALCULATOR_STEPS.FIXED_COSTS + 1)
  })

  it('calls setFixedCost and does not go to the next step when fixedcost field is empty', () => {
    const setFixedCostMock = jest.fn()
    const wrapper = shallow(
      <FixedCosts {...baseProps} setFixedCost={setFixedCostMock} />
    );
    wrapper.setState({knowFixedCosts: 'yes'})
    
    wrapper.find('Form').simulate('submit')
    expect(setFixedCostMock).toHaveBeenCalledTimes(0)
    expect(goToStepMock).toHaveBeenCalledTimes(0)
  })

  it ('goes to next step if at least one of the form fields is filled', () => {
    const wrapper = shallow(
      <FixedCosts {...baseProps} />
    );
    wrapper.setState({knowFixedCosts: 'no'})
    wrapper.find('NumbersInputForm').simulate('change', null, {name: 'Rent', value: '100'})
    wrapper.find('Form').simulate('submit')

    expect(goToStepMock).toHaveBeenCalledWith(CALCULATOR_STEPS.FIXED_COSTS + 1)
    expect(wrapper.state().formError).toEqual(false)
  })

  it ('does not go to next step if all the fields are empty', () => {
    const wrapper = shallow(
      <FixedCosts {...baseProps} />
    );
    wrapper.setState({knowFixedCosts: 'no'})
    wrapper.find('Form').simulate('submit')

    expect(goToStepMock).toHaveBeenCalledTimes(0)
    expect(wrapper.state().formError).toEqual(true)
  })

  it ('outputs a message if user has not filled at least one field', () => {
    const wrapper = shallow(
      <FixedCosts {...baseProps}/>
    );
    wrapper.setState({knowFixedCosts: 'no'})
    wrapper.find('Form').simulate('submit')
    expect(wrapper.find('.errorMsg').text()).toEqual('Enter a valid fixed cost to continue')
    expect(wrapper.state().formError).toEqual(true)
  })

  it('resets fields on radio button switch', () => {
    const wrapper = shallow(<FixedCosts {...baseProps} />);
    wrapper.setState({knowFixedCosts: 'no'})
    wrapper.setState({fields: {Rent: '100'}})
    wrapper.find('[label="Yes"]').simulate('change', null, {value: 'yes'})
    expect(wrapper.state().fields).toEqual(fixedCostInitState);
  })

  it('correctly resets the total cost value on radio button change', () => {
    const wrapper = shallow(<FixedCosts {...baseProps}/>);
    const yesButton = wrapper.find('[label="Yes"]')
    const noButton = wrapper.find('[name="noBox"]')
    yesButton.simulate('change', null, {value: 'yes'})
    wrapper.setState({totalFixedCosts: 100}) 
    noButton.simulate('change', null, {value: 'no'})
    expect(wrapper.state('totalFixedCosts')).toEqual('')
  })

  it('correctly calculates total cost when a field value is erased', () => {
    const wrapper = shallow(<FixedCosts {...baseProps}/>);
    wrapper.setState({knowFixedCosts: 'no'})
    wrapper.find('NumbersInputForm').simulate('change', null, {name: 'Rent', value: '100'})
    wrapper.find('NumbersInputForm').simulate('change', null, {name: 'Salaries', value: '3000'})
    expect(wrapper.state('totalFixedCosts')).toEqual(3100)
    wrapper.find('NumbersInputForm').simulate('change', null, {name: 'Rent', value: ''})
    expect(wrapper.state('totalFixedCosts')).toEqual("3000")
  })
})