import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import { FAQ_CONTENT } from '../../../constants'
import BecAccordion from './accordion'

describe('Accordion', () => {
  
  test('renders correct number of items', () => {
    render(<BecAccordion data={FAQ_CONTENT[0]} />)
    expect(screen.getAllByTestId('accordion-item')).toHaveLength(FAQ_CONTENT[0].length)
  })

  test('clicking on accordion item shows FAQ answer', () => {
    render(<BecAccordion data={FAQ_CONTENT[0]} />)
    expect(screen.getByText('First month’s rent')).not.toBeVisible()
    fireEvent.click(screen.getByText('How to calculate a fixed cost that is not paid monthly'))
    expect(screen.getByText('First month’s rent')).toBeVisible()
  })

  test('clicking on a different item, closes the previously open item', () => {
    render(<BecAccordion data={FAQ_CONTENT[0]} />)
    const secondQuestion = FAQ_CONTENT[0][1].question
    const secondQuestionAnswer = FAQ_CONTENT[0][1].answer.replace('<p>', '').replace('</p>', '').trim()
    fireEvent.click(screen.getByText('How to calculate a fixed cost that is not paid monthly'))
    fireEvent.click(screen.getByText(secondQuestion))
    expect(screen.getByText('First month’s rent')).not.toBeVisible()
    expect(screen.getByText(secondQuestionAnswer)).toBeVisible()
  })
})