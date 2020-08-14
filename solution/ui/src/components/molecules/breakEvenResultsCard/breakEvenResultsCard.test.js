import React from 'react'
import { shallow } from 'enzyme'

import BreakEvenResultsCard from './breakEvenResultsCard'

describe('BreakEvenResultsCard', () => {
  const props = {
    expectedUnits: '100',
    breakEvenUnits: '200',
    breakEvenRevenue: '2000',
    pricePerUnit: '15',
    variableCost: '5',
    fixedCost: '2000',
  }

  it('renders two rows of content', () => {
    const wrapper = shallow(<BreakEvenResultsCard {...props}/>)
    expect(wrapper.find('GridRow')).toHaveLength(2)
  })

  it('displays loss as expected', () => {
    const wrapper = shallow(<BreakEvenResultsCard {...props}/>)
    expect(wrapper.find('.number.loss')).toHaveLength(2)
    expect(wrapper.find('.number.loss').first().text()).toEqual('-$1,000')
  })

  it('displays profit as expected', () => {
    const wrapper = shallow(
      <BreakEvenResultsCard {...props} expectedUnits={300}/>
    )
    expect(wrapper.find('.number.loss')).toHaveLength(0)
    expect(wrapper.find('.number.profit')).toHaveLength(1)
    expect(wrapper.find('.number.profit').text()).toEqual('$1,000')
  })

  it('displays correct contribution margin ratio', () => {
    const wrapper = shallow(<BreakEvenResultsCard {...props}/>)
    expect(wrapper.find('.contributionMargin').text()).toEqual('67%')
  })
})