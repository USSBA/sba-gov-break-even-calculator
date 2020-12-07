import React from 'react'
import {shallow} from 'enzyme'
import Hero from './hero'

describe('Hero', () => {
  it('contains calculator icon', () => {
    const wrapper = shallow(<Hero><div>hi</div></Hero>)
    expect(wrapper.find('Image')).toHaveLength(1)
  })
})