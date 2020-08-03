import React from 'react'
import { shallow } from 'enzyme'

import FixedCosts from './fixedCosts'
import { fixedCostInitState } from './fixedCostsFieldsData'
import { CALCULATOR_STEPS } from '../../../constants/constants.js'

describe('FixedCosts', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<FixedCosts />);
    expect(wrapper).toHaveLength(1);
  })

  it('has correct initial state', () => {
    const wrapper = shallow(<FixedCosts />);
    expect(wrapper.state().knowFixedCosts).toBe(null)
    expect(wrapper.state().totalFixedCosts).toEqual(0)
    expect(wrapper.state().fields).toEqual(fixedCostInitState);
  })

  it('changes knowFixedCosts state on radio button selection', () => {
    const wrapper = shallow(<FixedCosts />);
    const yesButton = wrapper.find('[label="Yes"]')
    const noButton = wrapper.find('[label="No"]')
    yesButton.simulate('change', null, {value: 'yes'})
    expect(wrapper.state().knowFixedCosts).toEqual('yes')
    noButton.simulate('change', null, {value: 'no'})
    expect(wrapper.state().knowFixedCosts).toEqual('no')
  })

  it('shows the continue button when a selection has been made', () => {
    const wrapper = shallow(<FixedCosts />);
    expect(wrapper.find('FormButton')).toHaveLength(0)
    wrapper.setState({knowFixedCosts: 'yes'})
    expect(wrapper.find('FormButton')).toHaveLength(1)
  })

  it('shows fixed cost suggestion box on yes selection', () => {
    const wrapper = shallow(<FixedCosts />);
    expect(wrapper.find('.fixedCost-suggestion')).toHaveLength(0)
    wrapper.setState({knowFixedCosts: 'yes'})
    expect(wrapper.find('.fixedCost-suggestion')).toHaveLength(1)
  })

  it('shows NumbersInputForm on suggestion link click', () => {
    const wrapper = shallow(<FixedCosts />);
    wrapper.setState({knowFixedCosts: 'yes'})
    expect(wrapper.find('NumbersInputForm')).toHaveLength(0)
    wrapper.find('.fixedCost-suggestion a').simulate('click')
    expect(wrapper.find('NumbersInputForm')).toHaveLength(1)
  })

  it('shows NumbersInputForm on no selection', () => {
    const wrapper = shallow(<FixedCosts />);
    expect(wrapper.find('NumbersInputForm')).toHaveLength(0)
    wrapper.setState({knowFixedCosts: 'no'})
    expect(wrapper.find('NumbersInputForm')).toHaveLength(1)
  })

  it('has the correct number of fields in the form', () => {
    const wrapper = shallow(<FixedCosts />);
    wrapper.setState({knowFixedCosts: 'no'})
    expect(wrapper.find('NumbersInputForm').dive()).toHaveLength(10)
  })

  it('updates the corresponding field in state', () => {
    const wrapper = shallow(<FixedCosts />);
    wrapper.setState({knowFixedCosts: 'no'})
    wrapper.find('NumbersInputForm').simulate('change', null, {name: 'Rent', value: '100'})
    expect(wrapper.state().fields.Rent).toEqual('100')
  })

  it('calls setFixedCost and goToStep functions on submit', () => {
    const setFixedCostMock = jest.fn()
    const goToStepMock = jest.fn()
    const wrapper = shallow(
      <FixedCosts setFixedCost={setFixedCostMock} goToStep={goToStepMock} />
    );
    wrapper.setState({totalFixedCosts: 10}) 
    wrapper.setState({knowFixedCosts: 'yes'})
    
    wrapper.find('Form').simulate('submit')
    expect(setFixedCostMock).toHaveBeenCalledWith(10)
    expect(goToStepMock).toHaveBeenCalledWith(CALCULATOR_STEPS.FIXED_COSTS + 1)
  })

  it('calls setFixedCost and does not go to the next step when fixedcost field is empty', () => {
    const setFixedCostMock = jest.fn()
    const goToStepMock = jest.fn()
    const wrapper = shallow(
      <FixedCosts setFixedCost={setFixedCostMock} goToStep={goToStepMock} />
    );
    wrapper.setState({totalFixedCosts: ''}) 
    wrapper.setState({knowFixedCosts: 'yes'})
    
    wrapper.find('Form').simulate('submit')
    expect(setFixedCostMock).toHaveBeenCalledTimes(0)
    expect(goToStepMock).toHaveBeenCalledTimes(0)
  })

  it ('goes to next step if at least one of the fixed cost values to be filled.', () => {
    const setFixedCostMock = jest.fn()
    const goToStepMock = jest.fn()
    const wrapper = shallow(
      <FixedCosts setFixedCost={setFixedCostMock} goToStep={goToStepMock} />
    );
    wrapper.setState({knowFixedCosts: 'no'})
    wrapper.find('NumbersInputForm').simulate('change', null, {name: 'Rent', value: '100'})
    wrapper.find('Form').simulate('submit')

    expect(goToStepMock).toHaveBeenCalledWith(CALCULATOR_STEPS.FIXED_COSTS + 1)
    expect(wrapper.state().formError).toEqual(false)

  })

  it ('does not go to next step if all the fields are empty', () => {
    const setFixedCostMock = jest.fn()
    const goToStepMock = jest.fn()
    const wrapper = shallow(
      <FixedCosts setFixedCost={setFixedCostMock} goToStep={goToStepMock} />
    );
    wrapper.setState({knowFixedCosts: 'no'})
    wrapper.find('Form').simulate('submit')

    expect(goToStepMock).toHaveBeenCalledTimes(0)
    expect(wrapper.state().formError).toEqual(true)

  })

  it ('outputs a message if user has not filled at least one field', () => {
    const setFixedCostMock = jest.fn()
    const goToStepMock = jest.fn()
    const wrapper = shallow(
      <FixedCosts setFixedCost={setFixedCostMock} goToStep={goToStepMock} />
    );
    wrapper.setState({knowFixedCosts: 'no'})
    wrapper.find('Form').simulate('submit')
    expect(wrapper.find('.errorMsg').text()).toEqual('Enter a valid fixed cost to continue')
    expect(wrapper.state().formError).toEqual(true)
  })


  it('resets fields on radio button switch', () => {
    const wrapper = shallow(<FixedCosts />);
    wrapper.setState({knowFixedCosts: 'no'})
    wrapper.setState({fields: {Rent: '100'}})
    wrapper.find('[label="Yes"]').simulate('change', null, {value: 'yes'})
    expect(wrapper.state().fields).toEqual(fixedCostInitState);
  })
})