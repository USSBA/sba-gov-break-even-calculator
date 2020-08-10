import React from 'react'
import { shallow } from 'enzyme'
import Header from './header.js'

describe('Header', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper).toHaveLength(1);
  })

  it('renders link back to landing page', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper.find('.return-link').text()).toContain('Return to break-even page')
  })
})