import React from 'react'
import { shallow } from 'enzyme'

import StepThree from './stepThree'

describe('StepThree', () => {
  it('renders money input field and submit button', () => {
    const wrapper = shallow(<StepThree />)
    expect(wrapper.find('MoneyInput')).toHaveLength(1)
    expect(wrapper.find('FormButton')).toHaveLength(1)
  })

  it('calls setNumUnits prop and goes to step 4 on submit', () => {
    const setUnitPriceMock = jest.fn()
    const goToStepMock = jest.fn()
    const wrapper = shallow(
      <StepThree setUnitPrice={setUnitPriceMock} goToStep={goToStepMock} />
    )
    wrapper.find('Form').simulate('submit')
    expect(setUnitPriceMock).toHaveBeenCalledWith(0)
    expect(goToStepMock).toHaveBeenCalledWith(4)
  })
})