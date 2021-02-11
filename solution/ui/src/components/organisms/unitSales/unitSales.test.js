import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BreakEvenCalculator from '../../../pages/index'

Element.prototype.scrollIntoView = () => {}

describe('UnitSales', () => {

  beforeEach(() => {
    render(<BreakEvenCalculator />)
    const totalFixedCostYesRadioText = 'yes, I know the total of my monthly fixed costs'
    userEvent.click(screen.getByLabelText(totalFixedCostYesRadioText))
    userEvent.type(screen.getByLabelText('total fixed cost'), '1000')
    fireEvent.submit(screen.getByTestId('fixedCosts-form'))
    userEvent.type(screen.getByRole('spinbutton', { name: /per unit selling price\*/i }), '25')
    userEvent.click(screen.getByRole('button', { name: /continue/i }))
  })

  test('renders an input field and submit button', () => {
    screen.getByRole('spinbutton', { name: /number of units to sell\*/i })
    screen.getByRole('button', { name: /continue/i })
  })

  test('Sets the number of units to 123', () => {
    userEvent.type(screen.getByRole('spinbutton', { name: /number of units to sell\*/i }), '123')
    userEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(screen.getByText(/123/i)).toBeInTheDocument()
  })

  test('does not go to the next step on submit if the input field is blank', () => {
    userEvent.click(screen.getByRole('button', { name: /continue/i }))
    screen.getByRole('spinbutton', { name: /number of units to sell\*/i })
  })

  test('returns an error if the field is empty', () => {
    userEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(screen.getByRole('heading', { name: /estimate your expected unit sales/i })).toBeInTheDocument()
    expect(screen.getByText(/enter a valid number of units to continue/i)).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /do you know your variable cost per unit\?\*/i })).not.toBeInTheDocument()
  })
  
  test('goes to the previous step on back click', () => {
    userEvent.click(screen.getByRole('button', { name: /back to price per unit/i }))
    expect(screen.getByRole('heading', { name: /estimate your selling price per unit/i })).toBeInTheDocument()
  })

  test('resets fields and goes back to fixed cost on restart analysis click', () => {
    userEvent.click(screen.getByRole('button', { name: /restart analysis/i }))
    expect(screen.getByRole('heading', { name: /calculate your total fixed costs/i }))
    expect(screen.getByRole('radio', { name: /yes, i know the total of my monthly fixed costs/i }).checked).toEqual(false)
    expect(screen.getByRole('radio', { name: /no, input values individually/i }).checked).toEqual(false)
    expect(screen.queryByRole('spinbutton', { name: /total fixed cost/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /continue/i }))
  })
})