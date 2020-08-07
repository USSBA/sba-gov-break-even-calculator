import React from 'react'
import { shallow } from 'enzyme'

import VariableCosts from './variableCosts'
import { variableCostInitState } from './variableCostsFieldsData'
import { CALCULATOR_STEPS } from '../../../constants/constants.js'

describe('VariableCosts', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<VariableCosts />);
    expect(wrapper).toHaveLength(1);
  })

  it('has correct initial state', () => {
    const wrapper = shallow(<VariableCosts />);
    expect(wrapper.state().knowVariableCosts).toBe(null)
    expect(wrapper.state().totalVariableCosts).toEqual('')
    expect(wrapper.state().fields).toEqual(variableCostInitState);
  })

  it('changes knowVariableCosts state on radio button selection', () => {
    const wrapper = shallow(<VariableCosts />);
    const yesButton = wrapper.find('[label="Yes"]')
    const noButton = wrapper.find('[label="No"]')
    yesButton.simulate('change', null, {value: 'yes'})
    expect(wrapper.state().knowVariableCosts).toEqual('yes')
    noButton.simulate('change', null, {value: 'no'})
    expect(wrapper.state().knowVariableCosts).toEqual('no')
  })

  it('shows the continue button when a selection has been made', () => {
    const wrapper = shallow(<VariableCosts />);
    expect(wrapper.find('FormButton')).toHaveLength(0)
    wrapper.setState({knowVariableCosts: 'yes'})
    expect(wrapper.find('FormButton')).toHaveLength(1)
  })

  it('shows variable cost suggestion box on yes selection', () => {
    const wrapper = shallow(<VariableCosts />);
    expect(wrapper.find('.variableCost-suggestion')).toHaveLength(0)
    wrapper.setState({knowVariableCosts: 'yes'})
    expect(wrapper.find('.variableCost-suggestion')).toHaveLength(1)
  })

  it('shows NumbersInputForm on suggestion link click', () => {
    const wrapper = shallow(<VariableCosts />);
    wrapper.setState({knowVariableCosts: 'yes'})
    expect(wrapper.find('NumbersInputForm')).toHaveLength(0)
    wrapper.find('.variableCost-suggestion a').simulate('click')
    expect(wrapper.find('NumbersInputForm')).toHaveLength(1)
  })

  it('shows NumbersInputForm on no selection', () => {
    const wrapper = shallow(<VariableCosts />);
    expect(wrapper.find('NumbersInputForm')).toHaveLength(0)
    wrapper.setState({knowVariableCosts: 'no'})
    expect(wrapper.find('NumbersInputForm')).toHaveLength(1)
  })

  it('has the correct number of fields in the form', () => {
    const wrapper = shallow(<VariableCosts />);
    wrapper.setState({knowVariableCosts: 'no'})
    expect(wrapper.find('NumbersInputForm').dive()).toHaveLength(6)
  })

  it('updates the corresponding field in state', () => {
    const wrapper = shallow(<VariableCosts />);
    wrapper.setState({knowVariableCosts: 'no'})
    wrapper.find('NumbersInputForm').simulate('change', null, {name: 'Rent', value: '100'})
    expect(wrapper.state().fields.Rent).toEqual('100')
  })

  it('calls setVariableCost and goToStep functions on submit', () => {
    const setVariableCostMock = jest.fn()
    const goToStepMock = jest.fn()
    const wrapper = shallow(
      <VariableCosts setVariableCost={setVariableCostMock} goToStep={goToStepMock} />
    );

    wrapper.setState({knowVariableCosts: 'yes'})
    wrapper.setState({totalVariableCosts: 10})
    wrapper.find('Form').simulate('submit')

    expect(setVariableCostMock).toHaveBeenCalledWith(10)
    expect(goToStepMock).toHaveBeenCalledWith(CALCULATOR_STEPS.VARIABLE_COSTS + 1)
  })

  it('calls setVariableCost and does not go to the next step when variable cost field is empty', () => {
    const setVariableCostMock = jest.fn()
    const goToStepMock = jest.fn()
    const wrapper = shallow(
      <VariableCosts setVariableCost={setVariableCostMock} goToStep={goToStepMock} />
    );
    
    wrapper.setState({knowVariableCosts: 'yes'})
    wrapper.find('Form').simulate('submit')
    
    expect(setVariableCostMock).toHaveBeenCalledTimes(0)
    expect(goToStepMock).toHaveBeenCalledTimes(0)
  })

  it('resets fields on radio button switch', () => {
    const wrapper = shallow(<VariableCosts pricePerUnit={10}/>);
    wrapper.setState({knowVariableCosts: 'no'})
    wrapper.setState({fields: {Rent: '100'}})
    wrapper.setState({totalVariableCosts: '20'})
    wrapper.find('[label="Yes"]').simulate('change', null, {value: 'yes'})
    expect(wrapper.state().fields).toEqual(variableCostInitState);
  })

  it ('goes to next step if at least one of the form fields is filled', () => {
    const setVariableCostMock = jest.fn()
    const goToStepMock = jest.fn()
    const wrapper = shallow(
      <VariableCosts setVariableCost={setVariableCostMock} goToStep={goToStepMock} />
    );
    wrapper.setState({knowVariableCosts: 'no'})
    wrapper.find('NumbersInputForm').simulate('change', null, {name: 'Rent', value: '100'})
    wrapper.find('Form').simulate('submit')

    expect(goToStepMock).toHaveBeenCalledWith(CALCULATOR_STEPS.VARIABLE_COSTS + 1)
    expect(wrapper.state().formError).toEqual(false)
  })

  it ('does not go to next step if all the fields are empty', () => {
    const setVariableCostMock = jest.fn()
    const goToStepMock = jest.fn()
    const wrapper = shallow(
      <VariableCosts setVariableCost={setVariableCostMock} goToStep={goToStepMock} />
    );
    wrapper.setState({knowVariableCosts: 'no'})
    wrapper.find('Form').simulate('submit')

    expect(goToStepMock).toHaveBeenCalledTimes(0)
    expect(wrapper.state().formError).toEqual(true)
  })

  it ('outputs a message if user has not filled at least one field', () => {
    const setVariableCostMock = jest.fn()
    const goToStepMock = jest.fn()
    const wrapper = shallow(
      <VariableCosts setVariableCost={setVariableCostMock} goToStep={goToStepMock} />
    );
    wrapper.setState({knowVariableCosts: 'no'})
    wrapper.find('Form').simulate('submit')
    expect(wrapper.find('.errorMsg').text()).toEqual('Enter a valid variable cost to continue')
    expect(wrapper.state().formError).toEqual(true)
  })

  it('displays warning message when appropriate', () => {
    const wrapper = shallow(<VariableCosts pricePerUnit={10}/>);
    expect(wrapper.find('.warningMessage')).toHaveLength(0)
    wrapper.setState({knowVariableCosts: 'yes'})
    wrapper.setState({totalVariableCosts: '20'})
    expect(wrapper.find('.warningMessage')).toHaveLength(2)
    wrapper.setState({totalVariableCosts: '10'})
    expect(wrapper.find('.warningMessage')).toHaveLength(2)
  })

  it('does not prevent submission when warning is displayed', () => {
    const goToStepMock = jest.fn()
    const setVariableCostMock = jest.fn()
    const wrapper = shallow(
      <VariableCosts pricePerUnit={10} goToStep={goToStepMock} setVariableCost={setVariableCostMock} />
    );
    wrapper.setState({knowVariableCosts: 'yes'})
    wrapper.setState({totalVariableCosts: '20'})
    wrapper.find('Form').simulate('submit')
    expect(goToStepMock).toHaveBeenCalledWith(CALCULATOR_STEPS.VARIABLE_COSTS + 1)
  })
})