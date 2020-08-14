import React from 'react'
import { shallow } from 'enzyme'

import MoneyInput from './moneyInput'

describe('MoneyInput', () => {
  const onChangeMock = jest.fn()
  it('receives expected props', () => {
    const wrapper = shallow(
      <MoneyInput
        onChange={onChangeMock}
        name='Loans'
        value='10' />
    )

    expect(wrapper.props().children.props).toEqual(
      expect.objectContaining({
        labelPosition: 'left',
        name: 'Loans',
        value: '10',
        type: 'number',
        placeholder: '0,000.00',
        onChange: onChangeMock,
      })
    )
  })
})