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
    expect(wrapper.find('#lineChart')).toHaveLength(1)
  })


  it('includes all labels for the graph', () => {
    const wrapper = shallow(
      <BreakEvenGraph 
        breakEvenUnits={'100'}
        breakEvenSales={'1200'}
      />
    );
    expect(wrapper.find('.labelImg')).toHaveLength(4)
  })

  it('includes unit label bottom of x axis', () => {
    const wrapper = shallow(
      <BreakEvenGraph 
        breakEvenUnits={'100'}
        breakEvenSales={'1200'}
      />
    );
    expect(wrapper.find('.unitLabel').first().text()).toEqual('Units')
  })

  it('includes break even point label', () => {
    const wrapper = shallow(
      <BreakEvenGraph 
        breakEvenUnits={'100'}
        breakEvenSales={'1200'}
      />
    );
    expect(wrapper.find('.units').first().text()).toEqual('100')
  })

  it('includes unit label bottom of x axis', () => {
    const wrapper = shallow(
      <BreakEvenGraph 
        breakEvenUnits={'100'}
        breakEvenSales={'1200'}
      />
    );
    expect(wrapper.find('.unitLabel').first().text()).toEqual('Units')
  })
})