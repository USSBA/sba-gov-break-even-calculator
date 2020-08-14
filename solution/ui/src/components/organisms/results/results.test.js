import React from 'react'
import { shallow } from 'enzyme'

import Results from './results'

describe('Results', () => {
  const sampleProps = {
    variableCostPerUnit: '10',
    numUnits: '90',
    pricePerUnit: '110',
    totalFixedCost: '1000'
  }

  it('renders without crashing', () => {
    const wrapper = shallow(<Results />)
    expect(wrapper).toHaveLength(1)
  })

  it('renders break even result card', () => {
    const wrapper = shallow(<Results />)
    expect(wrapper.find('BreakEvenResultsCard')).toHaveLength(1)
  })

  it('passes correct props to BreakEvenResultsCard', () => {
    const wrapper = shallow(<Results {...sampleProps}/>)
    expect(wrapper.find('BreakEvenResultsCard').props()).toEqual({
      breakEvenRevenue: 1100,
      breakEvenUnits: 10,
      expectedUnits: sampleProps.numUnits,
      fixedCost: sampleProps.totalFixedCost,
      pricePerUnit: sampleProps.pricePerUnit,
      variableCost: sampleProps.variableCostPerUnit,
    })
  })

  it('renders break even profile card', () => {
    const wrapper = shallow(<Results />)
    expect(wrapper.find('BreakEvenProfileCard')).toHaveLength(1)
  })

  it('passes correct props to BreakEvenProfileCard', () => {
    const wrapper = shallow(<Results {...sampleProps}/>)
    expect(wrapper.find('BreakEvenProfileCard').props()).toEqual({
      breakEvenSales: 1100,
      breakEvenUnits: 10,
    })
  })

  it('renders BreakEvenDataTable', () => {
    const wrapper = shallow(<Results {...sampleProps}/>)
    const bepDataTable = wrapper.find('BreakEvenDataTable').dive()
    expect(bepDataTable.find('TableRow')).toHaveLength(9)
  })
})