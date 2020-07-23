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
    console.log(wrapper.debug())
    expect(wrapper.find('svg')).toHaveLength(1)
  })

  it('includes the Break Even label for the graph', () => {
    const wrapper = shallow(
      <BreakEvenGraph 
        breakEvenUnits={'100'}
        breakEvenSales={'1200'}
      />
    );
    console.log(wrapper.debug())
    expect(wrapper.find('Icon.breakEven')).toHaveLength(1)
  })

  it('includes the Total Cost label for the graph', () => {
    const wrapper = shallow(
      <BreakEvenGraph 
        breakEvenUnits={'100'}
        breakEvenSales={'1200'}
      />
    );
    console.log(wrapper.debug())
    expect(wrapper.find('Icon.totalCost')).toHaveLength(1)
  })
})