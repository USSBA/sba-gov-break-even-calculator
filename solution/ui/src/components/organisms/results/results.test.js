import React from 'react'
import { within, render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import BreakEvenCalculator from '../../../pages/index'

Element.prototype.scrollIntoView = () => {}
window.scrollTo = jest.fn()

describe('Results', () => {
  beforeEach(() => {
    render(<BreakEvenCalculator />)
    userEvent.click(screen.getByLabelText('yes, I know the total of my monthly fixed costs'))
    userEvent.type(screen.getByLabelText('total fixed cost'), '1000')
    fireEvent.submit(screen.getByTestId('fixedCosts-form'))
    userEvent.type(screen.getByRole('spinbutton', { name: /per unit selling price\*/i }), '25')
    userEvent.click(screen.getByRole('button', { name: /continue/i }))
    userEvent.type(screen.getByRole('spinbutton', {  name: /number of units to sell\*/i}), '123')
    userEvent.click(screen.getByRole('button', { name: /continue/i }))
    userEvent.click(screen.getByRole('radio', {
      name: /yes, i know the total of my variable costs per unit/i
    }))
    userEvent.type(screen.getByRole('spinbutton', { name: /total monthly variable costs\*/i }), '12')
    userEvent.click(screen.getByRole('button', { name: /continue/i }))

  });

  test('renders break even result card', () => {
    expect(screen.getByRole('heading', {
      name: /your break-even point results/i
    })).toBeInTheDocument()
  })

  test('renders break even profile card', () => {
    expect(screen.getByRole('heading', {
      name: /break-even profile/i
    })).toBeInTheDocument()
  })

  test('renders the graph', () => {
    expect(screen.getByRole('heading', {
      name: /break-even point graph/i
    })).toBeInTheDocument()
  })

  test('renders BreakEvenDataTable', () => {
    expect(screen.getByRole('heading', {
      name: /break-even point unit sales/i
    })).toBeInTheDocument()
  })

  test('renders print CTA', () => {
    expect(screen.getByRole('button', {
      name: /print results/i
    })).toBeInTheDocument()
  })

  test('Changing number of units updates the results page values', () => {
    //test number of units is currently at
    expect(screen.getByText(/123 units/i)).toBeInTheDocument()
    expect(screen.getAllByText(/123/i)).toHaveLength(2)

    //profit is currently at
    expect(screen.getByText(/\$599/i)).toBeInTheDocument()

    //unit sales value is currently
    expect(screen.getByText(/\$1,923/i)).toBeInTheDocument()

    //the breakeven value is currently at
    const view = screen.getByTestId('breakevenLabel');
    expect(within(view).getByText(/77/i)).toBeInTheDocument()
    expect(screen.getAllByText(/77/i)).toHaveLength(3)

    // change number of units
    userEvent.click(screen.getByRole('button', { name: /edit # of units/i }))
    userEvent.clear(screen.getByRole('input', { name: /# of units/i }))
    userEvent.type(screen.getByRole('input', { name: /# of units/i }), '555')
    userEvent.click(screen.getByRole('button', { name: /apply/i }))

    //profit is updated
    expect(screen.getByText(/\$6,215/i)).toBeInTheDocument()

    //unit sales value remains the same
    expect(screen.getByText(/\$1,923/i)).toBeInTheDocument()

    //number of units is updated everywhere.
    expect(screen.getByText(/555 units/i)).toBeInTheDocument()
    expect(screen.getAllByText(/555/i)).toHaveLength(2)

    //the breakeven value remains the same
    const breakevenLabelView = screen.getByTestId('breakevenLabel');
    expect(within(breakevenLabelView).getByText(/77/i)).toBeInTheDocument()
    expect(screen.getAllByText(/77/i)).toHaveLength(3)
  })

  test('Changing price per unit updates the results page values', () => {
    //test number of units is currently at
    expect(screen.getByText(/123 units/i)).toBeInTheDocument()
    expect(screen.getAllByText(/123/i)).toHaveLength(2)

    //profit is currently at
    expect(screen.getByText(/\$599/i)).toBeInTheDocument()

    //unit sales value is currently
    expect(screen.getByText(/\$1,923/i)).toBeInTheDocument()

    //the breakeven value is currently at
    const view = screen.getByTestId('breakevenLabel');
    expect(within(view).getByText(/77/i)).toBeInTheDocument()
    expect(screen.getAllByText(/77/i)).toHaveLength(3)

    // change number of units
    userEvent.click(screen.getByRole('button', {  name: /edit price per unit/i}))
    userEvent.clear(screen.getByRole('input', {  name: /price per unit/i}))
    userEvent.type(screen.getByRole('input', {  name: /price per unit/i}), '55')
    userEvent.click(screen.getByRole('button', { name: /apply/i }))

    //profit is updated
    expect(screen.getByText(/\$4,289/i)).toBeInTheDocument()

    //unit sales value remains the same
    expect(screen.getByText(/\$1,279/i)).toBeInTheDocument()

    //number of units is updated everywhere.
    expect(screen.getByText(/^123 units/i)).toBeInTheDocument()
    expect(screen.getAllByText(/^123/i)).toHaveLength(2)

    //the breakeven value is updated
    const breakevenLabelView = screen.getByTestId('breakevenLabel');
    expect(within(breakevenLabelView).getByText(/^23/i)).toBeInTheDocument()
    expect(screen.getAllByText(/^23/i)).toHaveLength(3)
  })


  test('Changing fixed costs updates the results page values', () => {
    //test number of units is currently at
    expect(screen.getByText(/123 units/i)).toBeInTheDocument()
    expect(screen.getAllByText(/123/i)).toHaveLength(2)

    //profit is currently at
    expect(screen.getByText(/\$599/i)).toBeInTheDocument()

    //unit sales value is currently
    expect(screen.getByText(/\$1,923/i)).toBeInTheDocument()

    //the breakeven value is currently at
    const view = screen.getByTestId('breakevenLabel');
    expect(within(view).getByText(/77/i)).toBeInTheDocument()
    expect(screen.getAllByText(/77/i)).toHaveLength(3)

    // change number of units
    userEvent.click(screen.getByRole('button', { name: /edit fixed costs/i }))
    userEvent.clear(screen.getByRole('input', {  name: /fixed costs/i}))
    userEvent.type(screen.getByRole('input', {  name: /fixed costs/i}), '1003')
    userEvent.click(screen.getByRole('button', { name: /apply/i }))

    //profit is updated
    expect(screen.getByText(/\$596/i)).toBeInTheDocument()

    //unit sales value is updated
    expect(screen.getByText(/\$1,929/i)).toBeInTheDocument()

    //number of units is updated everywhere.
    expect(screen.getByText(/^123 units/i)).toBeInTheDocument()
    expect(screen.getAllByText(/^123/i)).toHaveLength(2)

    //the breakeven value is updated
    const breakevenLabelView = screen.getByTestId('breakevenLabel');
    expect(within(breakevenLabelView).getByText(/^77/i)).toBeInTheDocument()
    expect(screen.getAllByText(/^77/i)).toHaveLength(3)
  })

  test('Changing variable costs updates the results page values', () => {
    //test number of units is currently at
    expect(screen.getByText(/123 units/i)).toBeInTheDocument()
    expect(screen.getAllByText(/123/i)).toHaveLength(2)

    //profit is currently at
    expect(screen.getByText(/\$599/i)).toBeInTheDocument()

    //unit sales value is currently
    expect(screen.getByText(/\$1,923/i)).toBeInTheDocument()

    //the breakeven value is currently at
    const view = screen.getByTestId('breakevenLabel');
    expect(within(view).getByText(/77/i)).toBeInTheDocument()
    expect(screen.getAllByText(/77/i)).toHaveLength(3)

    // change variable cost
    userEvent.click(screen.getByRole('button', {  name: /edit variable costs/i}))
    userEvent.clear(screen.getByRole('input', {  name: /variable costs/i}))
    userEvent.type(screen.getByRole('input', {  name: /variable costs/i}), '8')
    userEvent.click(screen.getByRole('button', { name: /apply/i }))

    //profit is updated
    expect(screen.getByText(/\$1,091/i)).toBeInTheDocument()

    //unit sales value is updated
    expect(screen.getByText(/\$1,471/i)).toBeInTheDocument()

    //number of units is updated everywhere.
    expect(screen.getByText(/^123 units/i)).toBeInTheDocument()
    expect(screen.getAllByText(/^123/i)).toHaveLength(2)

    //the breakeven value is updated
    const breakevenLabelView = screen.getByTestId('breakevenLabel');
    expect(within(breakevenLabelView).getByText(/^59/i)).toBeInTheDocument()
    expect(screen.getAllByText(/^59/i)).toHaveLength(3)
  })
})


describe ('ResultsWithHighVC', () => { 
  test('doesn\'t render the graph when variable cost is equal or higher than price per unit', () => {
    beforeEach(() => {
      render(<BreakEvenCalculator />)
      userEvent.click(screen.getByLabelText('yes, I know the total of my monthly fixed costs'))
      userEvent.type(screen.getByLabelText('total fixed cost'), '1000')
      fireEvent.submit(screen.getByTestId('fixedCosts-form'))
      userEvent.type(screen.getByRole('spinbutton', { name: /per unit selling price\*/i }), '25')
      userEvent.click(screen.getByRole('button', { name: /continue/i }))
      userEvent.type(screen.getByRole('spinbutton', {  name: /number of units to sell\*/i}), '123')
      userEvent.click(screen.getByRole('button', { name: /continue/i }))
      userEvent.click(screen.getByRole('radio', {
        name: /yes, i know the total of my variable costs per unit/i
      }))
      userEvent.type(screen.getByRole('spinbutton', { name: /total monthly variable costs\*/i }), '1200')
      userEvent.click(screen.getByRole('button', { name: /continue/i }))
    });

    expect(screen.queryByRole('heading', {
      name: /break-even point graph/i
    })).not.toBeInTheDocument()
  })
})
