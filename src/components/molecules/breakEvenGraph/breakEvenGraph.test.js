import React from 'react'
import { shallow } from 'enzyme'
import { BreakEvenGraph } from '../../molecules'

describe('BreakEvenGraph', () => {
  it('renders without crashing', () => {
    const breakEvenUnits = 10
    const breakEvenSales = 1000

    const wrapper = shallow(
      <BreakEvenGraph 
        breakEvenUnits={'100'}
        breakEvenSales={'1,200'}
      />
    )
    expect(wrapper).toHaveLength(1)
  })
})