import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import BreakEvenCalculator from '../../../pages/index'

describe('VariableCosts', () => {
  beforeEach(() => {
    render(<BreakEvenCalculator />)
    const knowVariableCost = 'yes, I know the total of my monthly fixed costs'
    userEvent.click(screen.getByLabelText(knowVariableCost))
    userEvent.type(screen.getByLabelText('total fixed cost'), '1000')
    fireEvent.submit(screen.getByTestId('fixedCosts-form'))
    userEvent.type(screen.getByRole('spinbutton', { name: /per unit selling price\*/i }), '25')
    userEvent.click(screen.getByRole('button', { name: /continue/i }))
    userEvent.type(screen.getByRole('spinbutton', {  name: /number of units to sell\*/i}), '123')
    userEvent.click(screen.getByRole('button', { name: /continue/i }))
  })

  test('has correct initial fields', () => {
    const knowVariableCost = screen.getByRole('radio', {
      name: /yes, i know the total of my variable costs per unit/i
    })
    const notKnowVariableCost = screen.getByRole('radio', {
      name: /no, input values individually/i
    })
    
    expect(knowVariableCost.value).toBeNull
    expect(notKnowVariableCost.value).toBeNull
  })

  test('sets VariableCosts value to true on radio button selection', () => {
    const knowVariableCost = screen.getByRole('radio', {
      name: /yes, i know the total of my variable costs per unit/i
    })
    const notKnowVariableCost = screen.getByRole('radio', {
      name: /no, input values individually/i
    })
    userEvent.click(knowVariableCost)

    expect(knowVariableCost.checked).toEqual(true)
    expect(notKnowVariableCost.checked).toEqual(false)

    userEvent.click(notKnowVariableCost)

    expect(knowVariableCost.checked).toEqual(false)
    expect(notKnowVariableCost.checked).toEqual(true)
  })

  test('shows the continue button when a selection has been made', () => {
    const knowVariableCost = screen.getByRole('radio', {
      name: /yes, i know the total of my variable costs per unit/i
    })
    const notKnowVariableCost = screen.getByRole('radio', {
      name: /no, input values individually/i
    })

    expect(screen.queryByRole('button', { name: /continue/i })).not.toBeInTheDocument()

    userEvent.click(knowVariableCost)

    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument()
    
    userEvent.click(notKnowVariableCost)
  
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument()
  })

  test('shows variable cost suggestion box on yes selection', () => {
    const knowVariableCost = screen.getByRole('radio', {
      name: /yes, i know the total of my variable costs per unit/i
    })
    const notKnowVariableCost = screen.getByRole('radio', {
      name: /no, input values individually/i
    })

    expect(screen.queryByText(/Help with your total variable costs?/i)).not.toBeInTheDocument()
  
    userEvent.click(knowVariableCost)
  
    expect(screen.queryByText(/Help with your total variable costs?/i)).toBeInTheDocument()
  
    userEvent.click(notKnowVariableCost)
  
    expect(screen.queryByText(/Help with your total variable costs?/i)).not.toBeInTheDocument()    
  })

  test('shows NumbersInputForm on suggestion link click', () => {
    const knowVariableCost = screen.getByRole('radio', { name: /yes, i know the total of my variable costs per unit/i })
    userEvent.click(knowVariableCost)
    userEvent.click(screen.getByRole('button', { name: /add variable costs individually/i }))
  
    expect(screen.queryByRole('spinbutton', { name: /total monthly variable costs\*/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /direct materials/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /piece rate labor/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /production supplies/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /commissions/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /freight out/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /other variable costs/i })).toBeInTheDocument()
  })

  test('shows NumbersInputForm on no selection', () => {
    const notKnowVariableCost = screen.getByRole('radio', {
      name: /no, input values individually/i
    })
    userEvent.click(notKnowVariableCost)
  
    expect(screen.queryByRole('spinbutton', { name: /total monthly variable costs\*/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /direct materials/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /piece rate labor/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /production supplies/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /commissions/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /freight out/i })).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: /other variable costs/i })).toBeInTheDocument()
  })

  test('calculates the variable cost value and when you go to the next page it displays it', () => {
    const notKnowVariableCost = screen.getByRole('radio', {
      name: /no, input values individually/i
    })
    userEvent.click(notKnowVariableCost)
    userEvent.type(screen.getByRole('spinbutton', { name: /commissions/i }), '12')
    userEvent.click(screen.getByRole('button', { name: /continue/i }))

    screen.getByText(/\$12/i)
  })

  test('saves the variable cost value and when you go to the next page it displays it', () => {
    const knowVariableCost = screen.getByRole('radio', {
      name: /yes, i know the total of my variable costs per unit/i
    })
    userEvent.click(knowVariableCost)
    userEvent.type(screen.getByRole('spinbutton', { name: /total monthly variable costs\*/i }), '12')
    userEvent.click(screen.getByRole('button', { name: /continue/i }))

    expect(screen.getByText(/\$12/i)).toBeInTheDocument()
  })
  
  it('Does not go to the next step when variable cost field is empty', () => {
    const knowVariableCost = screen.getByRole('radio', {
      name: /yes, i know the total of my variable costs per unit/i
    })
    expect(screen.getByRole('heading', { name: /do you know your variable cost per unit\?\*/i })).toBeInTheDocument()

    userEvent.click(knowVariableCost)
    userEvent.click(screen.getByRole('button', { name: /continue/i }))

    expect(screen.getByRole('heading', { name: /do you know your variable cost per unit\?\*/i })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /break\-even point results/i })).not.toBeInTheDocument()
  })

  it('resets fields on radio button switch', () => {
    const knowVariableCost = screen.getByRole('radio', {
      name: /yes, i know the total of my variable costs per unit/i
    })
    const notKnowVariableCost = screen.getByRole('radio', {
      name: /no, input values individually/i
    })
    userEvent.click(knowVariableCost)
    userEvent.type(screen.getByRole('spinbutton', { name: /total monthly variable costs\*/i }), '12')
  
    expect(screen.getByRole('spinbutton', { name: /total monthly variable costs\*/i }).value).toEqual('12')
  
    userEvent.click(notKnowVariableCost)
    userEvent.click(knowVariableCost)
  
    expect(screen.getByRole('spinbutton', { name: /total monthly variable costs\*/i }).value).toEqual('')

    userEvent.click(notKnowVariableCost)
    userEvent.type(screen.getByRole('spinbutton', { name: /commission/i }), '120')
  
    expect(screen.getByRole('spinbutton', { name: /commission/i }).value).toEqual('120')
  
    userEvent.click(knowVariableCost)
    userEvent.click(notKnowVariableCost)
  
    expect(screen.getByRole('spinbutton', { name: /commission/i }).value).toEqual('')
  })

  test('goes to next step if at least one of the form fields is filled', () => {
    const notKnowVariableCost = screen.getByRole('radio', {
      name: /no, input values individually/i
    })
    userEvent.click(notKnowVariableCost)
    userEvent.type(screen.getByRole('spinbutton', { name: /commissions/i }), '12')
    userEvent.click(screen.getByRole('button', { name: /continue/i }))

    expect(screen.queryByRole('heading', { name: /do you know your variable cost per unit\?\*/i })).not.toBeInTheDocument()
    expect(screen.getAllByRole('heading', { name: /break\-even point results/i })[0]).toBeInTheDocument()
  })

  test('does not go to next step if all the fields are empty', () => {
    const notKnowVariableCost = screen.getByRole('radio', {
      name: /no, input values individually/i
    })
    userEvent.click(notKnowVariableCost)
    userEvent.click(screen.getByRole('button', { name: /continue/i }))
    
    expect(screen.queryByRole('heading', { name: /do you know your variable cost per unit\?\*/i })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /break\-even point results/i })).not.toBeInTheDocument()
  })

  test('outputs a message if user has not filled at least one field', () => {
    const notKnowVariableCost = screen.getByRole('radio', {
      name: /no, input values individually/i
    })
    userEvent.click(notKnowVariableCost)
    userEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(screen.getByText(/Enter a valid variable cost per unit to continue/i)).toBeInTheDocument()
  })

  test('displays warning message when appropriate', () => {
    const notKnowVariableCost = screen.getByRole('radio', {
      name: /no, input values individually/i
    })
    userEvent.click(notKnowVariableCost)
    userEvent.type(screen.getByRole('spinbutton', { name: /commissions/i }), '1200')

    expect(screen.getByText(
      /your variable costs are higher than your unit price\. you will never break\-even\. consider adjusting your values\./i
    )).toBeInTheDocument
  })

  test('does not prevent submission when warning is displayed', () => {
    const notKnowVariableCost = screen.getByRole('radio', {
      name: /no, input values individually/i
    })
    userEvent.click(notKnowVariableCost)
    userEvent.type(screen.getByRole('spinbutton', { name: /commissions/i }), '1200')
    userEvent.click(screen.getByRole('button', { name: /continue/i }))

    expect(screen.queryByRole('heading', { name: /do you know your variable cost per unit\?\*/i })).not.toBeInTheDocument()
    expect(screen.getAllByRole('heading', { name: /break\-even point results/i })[0]).toBeInTheDocument()
  })
})