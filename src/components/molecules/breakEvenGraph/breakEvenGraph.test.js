import React from 'react'
import { shallow, mount } from 'enzyme'
import { BreakEvenGraph } from '../../molecules'
import { getDataAndConfig, getHtml, checkSvg } from ‘./helper’;


describe('BreakEvenGraph', () => {
  it('renders without crashing', () => {
    const wrapper = mount(
      <BreakEvenGraph 
        breakEvenUnits={'100'}
        breakEvenSales={'1200'}
      />
    )
    const html = wrapper.find('svg').html();
    expect(wrapper).toHaveLength(1)
  })
})