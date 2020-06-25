import React from 'react'
import { shallow } from 'enzyme'

import StepTwo from './stepTwo'

describe('StepTwo', () => {
  it('renders an input field and submit button', () => {
    const wrapper = shallow(<StepTwo />)
    expect(wrapper.find('Input')).toHaveLength(1)
    expect(wrapper.find('FormButton')).toHaveLength(1)
  })

  it('calls setNumUnits prop and goes to step 3 on submit', () => {
    const setNumUnitsMock = jest.fn()
    const goToStepMock = jest.fn()
    const wrapper = shallow(
      <StepTwo setNumUnits={setNumUnitsMock} goToStep={goToStepMock} />
    )
    wrapper.find('Form').simulate('submit')
    expect(setNumUnitsMock).toHaveBeenCalledWith(0)
    expect(goToStepMock).toHaveBeenCalledWith(3)
  })
})