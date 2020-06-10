import React from 'react'
import { shallow } from 'enzyme'
import IndexPage from './index.js'

describe('IndexPage', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<IndexPage />)
    expect(wrapper).toHaveLength(5);
  })
})
