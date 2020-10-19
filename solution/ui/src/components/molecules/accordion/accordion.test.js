import React from 'react'
import { shallow } from 'enzyme'

import { FAQ_CONTENT } from '../../../constants/constants'
import BecAccordion from './accordion'

describe('Accordion', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<BecAccordion data={[]} />)
    expect(wrapper.find('Accordion')).toHaveLength(1)
  })

  it('renders correct number of items', () => {
    const wrapper = shallow(<BecAccordion data={FAQ_CONTENT[0]} />)
    expect(wrapper.find('AccordionItem')).toHaveLength(FAQ_CONTENT[0].length)
  })
})