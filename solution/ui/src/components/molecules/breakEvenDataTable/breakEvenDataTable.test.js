import React from 'react'
import { shallow } from 'enzyme'

import BreakEvenDataTable from './breakEvenDataTable'

describe('BreakEvenDataTable', () => {
  const tableData = [
    {units: 0, profit: -500, revenue: 0, variableCosts: 0, fixedCosts: 500},
    {units: 10, profit: 0, revenue: 550, variableCosts: 50, fixedCosts: 500},
    {units: 20, profit: 500, revenue: 1100, variableCosts: 100, fixedCosts: 500},
    {units: 30, profit: 1000, revenue: 2200, variableCosts: 200, fixedCosts: 500}
  ]

  it('Renders the right number of rows', () => {
    const wrapper = shallow(<BreakEvenDataTable data={tableData} />)
    expect(wrapper.find('TableRow')).toHaveLength(tableData.length + 1)
  })

  it('Renders 5 columns', () => {
    const wrapper = shallow(<BreakEvenDataTable data={tableData} />)
    expect(wrapper.find('TableHeaderCell')).toHaveLength(5)
  })

  it('Adds class of netLoss on profits less than zero', () => {
    const wrapper = shallow(<BreakEvenDataTable data={tableData} />)
    expect(wrapper.find('.netLoss')).toHaveLength(1)
  })

  it('Sorts columns on click', () => {
    const wrapper = shallow(<BreakEvenDataTable data={tableData} />)
    expect(wrapper.find('TableCell').first().html()).toEqual('<td class="">0</td>')
    wrapper.find('TableHeaderCell').first().simulate('click')
    wrapper.find('TableHeaderCell').first().simulate('click')
    expect(wrapper.find('TableCell').first().html()).toEqual('<td class="">30</td>')
  })
})