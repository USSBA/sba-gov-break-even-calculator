import React from 'react'
import { shallow, mount } from 'enzyme'

import NumbersInputForm from './numbersInputForm'

describe('NumbersInputForm', () => {
  const fields = [
    {name: 'Rent', description: 'Amount of rent'},
    {name: 'Production Supplies', description: 'Supplies for machinery'}
  ]
  const onChangeMock = jest.fn()

  it('renders the correct number of fields', () => {
    const wrapper = shallow(<NumbersInputForm fields={fields} />)
    expect(wrapper).toHaveLength(2)
  })

  it('renders correct field name and description', () => {
    const wrapper = shallow(<NumbersInputForm fields={fields} />)
    expect(wrapper.find('label').first().text()).toBe(fields[0].name)
    expect(wrapper.find('p').first().text()).toBe(fields[0].description)
  })

  it('calls the onChange handler', () => {
    const wrapper = shallow(<NumbersInputForm fields={fields} onChange={onChangeMock}/>)
    wrapper.find('MoneyInput').first().dive().find('Input').simulate('change')
    expect(onChangeMock).toHaveBeenCalledTimes(1)
  })

})
