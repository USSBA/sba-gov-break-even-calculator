import React from 'react'
import { shallow, mount } from 'enzyme'

import EditableTotal from './editableTotal'

describe('EditableTotal', () => {
  const mockOnEdit = jest.fn()
  const sampleProps = {
    title: 'Total Cost',
    value: '1000',
    onEdit: mockOnEdit
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the passed value as units or currency', () => {
    const wrapper = shallow(<EditableTotal {...sampleProps}/>)
    expect(wrapper.find('.editableValue').text()).toEqual('$1,000')
    wrapper.setProps({type: 'units'})
    expect(wrapper.find('.editableValue').text()).toEqual('1,000 Units')
  })

  it('renders input field when edit button is clicked', () => {
    const wrapper = shallow(<EditableTotal {...sampleProps}/>)
    expect(wrapper.find('Input')).toHaveLength(0)
    wrapper.find('.editButton').simulate('click')
    expect(wrapper.find('Input')).toHaveLength(1)
  })

  it('calls onEdit when apply is clicked', () => {
    const wrapper = shallow(<EditableTotal {...sampleProps}/>)
    wrapper.find('.editButton').simulate('click')
    wrapper.find('Input').dive().find('Button').simulate('click')
    expect(mockOnEdit).toHaveBeenCalledWith('1000')
    expect(wrapper.find('Input')).toHaveLength(0)
  })

  it('calls onEdit when the form is submitted', () => {
    const wrapper = shallow(<EditableTotal {...sampleProps}/>)
    wrapper.find('.editButton').simulate('click')
    wrapper.find('Form').simulate('submit')
    expect(mockOnEdit).toHaveBeenCalledWith('1000')
    expect(wrapper.find('Input')).toHaveLength(0)
  })
})