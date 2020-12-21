import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Modal from './modal'
import { BreakEvenProfileCard } from '../../molecules'

describe('Modal', () => {
  const modalProps = {
    content: 'success!',
    open: true,
    onClose: jest.fn()
  }

  const sampleProps = {
    variableCostPerUnit: '10',
    numUnits: '90',
    pricePerUnit: '110',
    totalFixedCost: '1000',
    updateNumUnits: jest.fn(),
    updatePricePerUnit: jest.fn(),
    updateFixedCost: jest.fn(),
    updateVariableCost: jest.fn()
  }

  test('renders the content', () => {
    render(<Modal {...modalProps} />)
    expect(screen.getByRole('alert')).toHaveTextContent(modalProps.content)
  })

  test('it shows confirmation modal on value change', () => {
    render(<BreakEvenProfileCard {...sampleProps}/>)
    userEvent.click(screen.queryAllByRole('button')[0])
    userEvent.click(screen.getByLabelText('apply'))
    expect(screen.queryByRole('alert')).toBeInTheDocument()
  })

  test('it closes confirmation modal on x click', () => {
    render(<BreakEvenProfileCard {...sampleProps}/>)
    userEvent.click(screen.queryAllByRole('button')[0])
    userEvent.click(screen.getByLabelText('apply'))
    expect(screen.queryByRole('alert')).toBeInTheDocument()
    userEvent.click(screen.getByLabelText('close modal'))
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  test('it closes confirmation modal after a timeout', async() => {
    render(<BreakEvenProfileCard {...sampleProps}/>)
    userEvent.click(screen.queryAllByRole('button')[0])
    userEvent.click(screen.getByLabelText('apply'))
    expect(screen.queryByRole('alert')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    }, {timeout: 4000})
  })
})