import React from 'react'
import { shallow } from 'enzyme'
import { BreakEvenGraph } from '../../molecules'


describe('BreakEvenGraph', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <BreakEvenGraph 
        breakEvenUnits={'100'}
        breakEvenSales={'1200'}
      />
    );
    expect(wrapper.find('svg')).toHaveLength(1)
  })
})