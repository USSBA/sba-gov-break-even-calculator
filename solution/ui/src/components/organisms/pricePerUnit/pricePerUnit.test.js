import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BreakEvenCalculator from '../../../pages/index'

Element.prototype.scrollIntoView = () => {}

describe('PricePerUnit', () => {
  beforeEach(() => {
    render(<BreakEvenCalculator />)
    const totalFixedCostYesRadioText = 'yes, I know the total of my monthly fixed costs'
    userEvent.click(screen.getByLabelText(totalFixedCostYesRadioText))
    userEvent.type(screen.getByLabelText('total fixed cost'), '1000')
    fireEvent.submit(screen.getByTestId('fixedCosts-form'))
  })

  test('renders correct heading', () => {
    screen.getByRole('heading', { name: /estimate your selling price per unit/i })
  })

  test('renders input field with label', () => {
    screen.getByText(/per unit selling price\*/i)
    screen.getByRole('spinbutton', { name: /per unit selling price\*/i })
  })

  test('renders continue button', () => {
    screen.getByRole('button', { name: /continue/i })
  })

  test('renders back link', () => {
    screen.getByRole('button', { name: /back to fixed costs/i })
  })

  test('renders restart analysis link', () => {
    screen.getByRole('button', { name: /restart analysis/i })
  })

  test('goes to previous page on back link click', () => {
    userEvent.click(screen.getByRole('button', { name: /back to fixed costs/i }))
    screen.getByRole('heading', {name: /calculate your total fixed costs/i})
    screen.getByRole('button', { name: /continue/i })
  })

  test('resets app on restart analysis link', () => {
    userEvent.click(screen.getByRole('button', { name: /restart analysis/i }))
    screen.getByRole('heading', {name: /calculate your total fixed costs/i})
    expect(screen.queryByRole('button', { name: /continue/i })).toBeNull()
  })

  test('returns an error if the field is empty', () => {
    expect(screen.queryByRole('alert')).toBeNull()
    userEvent.click(screen.getByRole('button', { name: /continue/i }))
    screen.getByRole('alert')
  })

  test('clears error when the field has a value', () => {
    userEvent.click(screen.getByRole('button', { name: /continue/i }))
    screen.getByRole('alert')
    userEvent.type(screen.getByRole('spinbutton', { name: /per unit selling price\*/i }), '100')
    expect(screen.queryByRole('alert')).toBeNull()
  })

  test('does not go to the next step on submit if field is empty', () => {
    userEvent.click(screen.getByRole('button', { name: /continue/i }))
    screen.getByRole('heading', { name: /estimate your selling price per unit/i })
    expect(screen.queryByRole('heading', { name: /estimate your expected unit sales/i })).toBeNull()
  })
  
  test('it goes to the next page when field is not empty', () => {
    userEvent.type(screen.getByRole('spinbutton', { name: /per unit selling price\*/i }), '1000')
    userEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(screen.queryByRole('heading', { name: /estimate your selling price per unit/i })).toBeNull()
    screen.getByRole('heading', { name: /estimate your expected unit sales/i })
  })
})