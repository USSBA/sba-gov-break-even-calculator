import React from 'react'
import { shallow } from 'enzyme'

import UnitSales from './unitSales'
import { CALCULATOR_STEPS } from '../../../constants/constants'


describe('UnitSales', () => {
  const setNumUnitsMock = jest.fn()
  const goToStepMock = jest.fn()
  const restartMock = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders an input field and submit button', () => {
    const wrapper = shallow(<UnitSales />)
    expect(wrapper.find('Input')).toHaveLength(1)
    expect(wrapper.find('FormButton')).toHaveLength(1)
  })

  it('calls setNumUnits on Change', () => {
    const wrapper = shallow(
      <UnitSales setNumUnits={setNumUnitsMock} />
    )
    wrapper.find('Input').simulate('change', null, {value: 100})
    expect(setNumUnitsMock).toHaveBeenCalledWith(100)
  })

  it('goes to the next step on submit if a value is entered', () => {
    const wrapper = shallow(
      <UnitSales  setNumUnits={setNumUnitsMock} goToStep={goToStepMock} />
    )

    wrapper.setProps({value: 100})
    wrapper.find('Form').simulate('submit')
    expect(goToStepMock).toHaveBeenCalledWith(CALCULATOR_STEPS.UNIT_SALES + 1)
  })

  it('does not go to the next step on submit if a input field is blank', () => {
    const wrapper = shallow(
      <UnitSales  setNumUnits={setNumUnitsMock} goToStep={goToStepMock} />
    )
    wrapper.find('Form').simulate('submit')
    expect(goToStepMock).toHaveBeenCalledTimes(0)
  })

  it('returns an error if field is empty', () => {
    const wrapper = shallow(
      <UnitSales  setNumUnits={setNumUnitsMock} goToStep={goToStepMock} />
    )

    wrapper.find('Form').simulate('submit')
    expect(wrapper.find('FormInput').dive().dive().find('Label').prop('content')).toEqual('Enter a valid number of units');
  })
  
  it('goes to the previous step on back click', () => {
    const wrapper = shallow(
      <UnitSales goToStep={goToStepMock} />
    )
    wrapper.find('a').first().simulate('click')
    expect(goToStepMock).toHaveBeenCalledWith(CALCULATOR_STEPS.UNIT_SALES - 1)
  })

  it('calls restart prop on restart analysis click', () => {
    const wrapper = shallow(
      <UnitSales restart={restartMock} />
    )
    wrapper.find('a').last().simulate('click')
    expect(restartMock).toHaveBeenCalledTimes(1)
  })
})