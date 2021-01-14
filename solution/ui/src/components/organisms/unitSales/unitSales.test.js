import React from 'react'
import { shallow } from 'enzyme'

import UnitSales from './unitSales'
import { CALCULATOR_STEPS } from '../../../constants'


describe('UnitSales', () => {
  const setNumUnitsMock = jest.fn()
  const goToStepMock = jest.fn()
  const restartMock = jest.fn()

  const baseProps = {
    goToStep: goToStepMock,
    restart: restartMock,
    setNumUnits: setNumUnitsMock,
    visible: true
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders an input field and submit button', () => {
    const wrapper = shallow(<UnitSales {...baseProps} />)
    expect(wrapper.find('Input')).toHaveLength(1)
    expect(wrapper.find('FormButton')).toHaveLength(1)
  })

  it('calls setNumUnits on Change', () => {
    const wrapper = shallow(
      <UnitSales {...baseProps} />
    )
    wrapper.find('Input').simulate('change', null, {value: 100})
    expect(setNumUnitsMock).toHaveBeenCalledWith(100)
  })

  it('goes to the next step on submit if a value is entered', () => {
    const wrapper = shallow(
      <UnitSales {...baseProps} />
    )

    wrapper.setProps({value: 100})
    wrapper.find('Form').simulate('submit')
    expect(goToStepMock).toHaveBeenCalledWith(CALCULATOR_STEPS.UNIT_SALES + 1)
  })

  it('does not go to the next step on submit if the input field is blank', () => {
    const wrapper = shallow(
      <UnitSales  {...baseProps} />
    )
    wrapper.find('Form').simulate('submit')
    expect(goToStepMock).toHaveBeenCalledTimes(0)
  })

  it('returns an error if the field is empty', () => {
    const wrapper = shallow(
      <UnitSales  {...baseProps} />
    )

    wrapper.find('Form').simulate('submit')
    expect(wrapper.find('FormInput').dive().dive().find('Label').prop('content')).toEqual('Enter a valid number of units to continue');
  })
  
  it('goes to the previous step on back click', () => {
    const wrapper = shallow(
      <UnitSales {...baseProps} />
    )
    wrapper.find('Button').first().simulate('click')
    expect(goToStepMock).toHaveBeenCalledWith(CALCULATOR_STEPS.UNIT_SALES - 1)
  })

  it('calls restart prop on restart analysis click', () => {
    const wrapper = shallow(
      <UnitSales {...baseProps} />
    )
    wrapper.find('Button').last().simulate('click')
    expect(restartMock).toHaveBeenCalledTimes(1)
  })
})