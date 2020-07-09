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
    expect(wrapper.state().totalVariableCosts).toEqual(0)
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
    wrapper.find('Form').simulate('submit')
    expect(setVariableCostMock).toHaveBeenCalledWith(0)
    expect(goToStepMock).toHaveBeenCalledWith(CALCULATOR_STEPS.VARIABLE_COSTS + 1)
  })

  it('resets fields on radio button switch', () => {
    const wrapper = shallow(<VariableCosts />);
    wrapper.setState({knowVariableCosts: 'no'})
    wrapper.setState({fields: {Rent: '100'}})
    wrapper.find('[label="Yes"]').simulate('change', null, {value: 'yes'})
    expect(wrapper.state().fields).toEqual(variableCostInitState);
  })
})