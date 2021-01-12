import React from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Results from '../../organisms/results/results'

window.scrollTo = jest.fn()

describe('BreakEvenDataTable', () => {
  const sampleProps = {
    variableCostPerUnit: '15',
    numUnits: '500',
    pricePerUnit: '150',
    totalFixedCost: '10000',
    updateNumUnits: jest.fn(),
    updatePricePerUnit: jest.fn(),
    updateFixedCost: jest.fn(),
    updateVariableCost: jest.fn()
  }

  beforeEach(() => {
    render(<Results {...sampleProps} />)
  })

  test('creates a table with seven rows', () => {
    expect(screen.getAllByTestId('data-table-row')).toHaveLength(9)
  })

  test('it displays the break-even point', () => {
    const bepRow = screen.getAllByTestId('data-table-row')[4]
    within(bepRow).getByRole('cell', { name: /\$0/i })
  })

  test('renders six columns', () => {
    expect(screen.getAllByRole('columnheader')).toHaveLength(6)
  })

  test('sorts units column on click', () => {
    userEvent.click(screen.getByRole('columnheader', {
      name: /units sold/i
    }))
    expect(within(screen.getAllByTestId('data-table-row')[0]).getAllByRole('cell')[0].textContent).toEqual('0')
    userEvent.click(screen.getByRole('columnheader', {
      name: /units sold/i
    }))
    expect(within(screen.getAllByTestId('data-table-row')[0]).getAllByRole('cell')[0].textContent).toEqual('140')
  })

  test('sorts profit column on click', () => {
    userEvent.click(screen.getByRole('columnheader', {
      name: /profit/i
    }))
    expect(within(screen.getAllByTestId('data-table-row')[0]).getAllByRole('cell')[1].textContent).toEqual('−$10,000')
    userEvent.click(screen.getByRole('columnheader', {
      name: /profit/i
    }))
    expect(within(screen.getAllByTestId('data-table-row')[0]).getAllByRole('cell')[1].textContent).toEqual('$8,900')
  })
  
  test('sorts unit sales column on click', () => {
    userEvent.click(screen.getByRole('columnheader', {
      name: /unit sales/i
    }))
    expect(within(screen.getAllByTestId('data-table-row')[0]).getAllByRole('cell')[2].textContent).toEqual('$0')
    userEvent.click(screen.getByRole('columnheader', {
      name: /unit sales/i
    }))
    expect(within(screen.getAllByTestId('data-table-row')[0]).getAllByRole('cell')[2].textContent).toEqual('$21,000')
  })

  test('sorts variable costs column on click', () => {
    userEvent.click(screen.getByRole('columnheader', {
      name: /variable costs/i
    }))
    expect(within(screen.getAllByTestId('data-table-row')[0]).getAllByRole('cell')[3].textContent).toEqual('$0')
    userEvent.click(screen.getByRole('columnheader', {
      name: /variable costs/i
    }))
    expect(within(screen.getAllByTestId('data-table-row')[0]).getAllByRole('cell')[3].textContent).toEqual('$2,100')
  })

  test('sorts total costs column on click', () => {
    userEvent.click(screen.getByRole('columnheader', {
      name: /total costs/i
    }))
    expect(within(screen.getAllByTestId('data-table-row')[0]).getAllByRole('cell')[5].textContent).toEqual('$10,000')
    userEvent.click(screen.getByRole('columnheader', {
      name: /total costs/i
    }))
    expect(within(screen.getAllByTestId('data-table-row')[0]).getAllByRole('cell')[5].textContent).toEqual('$12,100')
  })
})
