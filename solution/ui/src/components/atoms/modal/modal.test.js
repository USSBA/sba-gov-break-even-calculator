import React from 'react'
import {shallow} from 'enzyme'

import Modal from './modal'

describe('Modal', () => {
  const sampleProps = {
    content: 'success!',
    open: true,
    onClose: jest.fn()
  }

  it('renders the content', () => {
    const wrapper = shallow(<Modal {...sampleProps} />)
    expect(wrapper.find('p').text()).toBe(`<Icon />${sampleProps.content}`)
  })

  it('calls onClose on click', () => {
    const wrapper = shallow(<Modal {...sampleProps} />)
    wrapper.find('.closeModal').simulate('click', {preventDefault: jest.fn()})
    expect(sampleProps.onClose).toHaveBeenCalledTimes(1)
  })

  it('changes hidden class based on open prop', () => {
    const wrapper = shallow(<Modal {...sampleProps} />)
    expect(wrapper.find('.hidden')).toHaveLength(0)
    wrapper.setProps({open: false})
    expect(wrapper.find('.hidden')).toHaveLength(1)
  })
})