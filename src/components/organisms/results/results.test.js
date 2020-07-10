import React from 'react'
import { shallow } from 'enzyme'

import Results from './results'

describe('Results', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Results />)
    expect(wrapper).toHaveLength(1)
  })

  it('renders break even result card', () => {
    const wrapper = shallow(<Results />)
    expect(wrapper.find('BreakEvenResultsCard')).toHaveLength(1)
  })

  it('renders break even profile card', () => {
    const wrapper = shallow(<Results />)
    expect(wrapper.find('BreakEvenProfileCard')).toHaveLength(1)
  })
})