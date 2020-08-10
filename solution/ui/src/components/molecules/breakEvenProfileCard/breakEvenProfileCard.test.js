import React from 'react'
import { shallow } from 'enzyme'

import BreakEvenProfileCard from './breakEvenProfileCard'

describe('BreakEvenProfileCard', () => {
  it('renders two circles', () => {
    const wrapper = shallow(
      <BreakEvenProfileCard 
        breakEvenUnits={'100'}
        breakEvenSales={'1,200'}
      />
    )
    expect(wrapper.find('.circleContent')).toHaveLength(2)
  })

  it('passes the correct values to respective circles', () => {
    const wrapper = shallow(
      <BreakEvenProfileCard 
        breakEvenUnits={'100'}
        breakEvenSales={'1,200'}
      />
    )
    expect(wrapper.find('.unitsCircle .number').text()).toEqual('100')
    expect(wrapper.find('.salesCircle .number').text()).toEqual('$1,200')
  })
})