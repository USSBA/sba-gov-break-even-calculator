import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import EditableTotal from './editableTotal'
import BreakEvenCalculator from '../../../pages/index'

Element.prototype.scrollIntoView = () => {}

describe('EditableTotal', () => {
  const mockOnEdit = jest.fn()
  const sampleProps = {
    title: 'Total Cost',
    value: '1000',
    onEdit: mockOnEdit
  }

  test('displays a correct title', () => {
    render(<EditableTotal {...sampleProps}/>)
    expect(screen.getByTestId('title')).toHaveTextContent(sampleProps.title)
  })

  test('displays a correct formatted initial value', () => {
    render(<EditableTotal {...sampleProps}/>)
    expect(screen.getByTestId('value')).toHaveTextContent('$1,000')
  })

  test('displays a correct formatted initial units value', () => {
    render(<EditableTotal {...sampleProps} type='units'/>)
    expect(screen.getByTestId('value')).toHaveTextContent('1,000')
  })

  test('displays an edit button', () => {
    render(<EditableTotal {...sampleProps}/>)
    expect(screen.getByLabelText(`edit ${sampleProps.title}`)).toHaveTextContent('edit')
  })

  test('hides button, shows input field when edit button is clicked', async() => {
    render(<EditableTotal {...sampleProps}/>)
    userEvent.click(screen.getByLabelText(`edit ${sampleProps.title}`))
    expect(screen.queryByLabelText(`edit ${sampleProps.title}`)).toBeNull()
    expect(screen.getByRole('form')).toHaveFormValues({
      "Total Cost": parseInt(sampleProps.value)
    })
  })

  test('calls onEdit when apply is clicked', () => {
    render(<EditableTotal {...sampleProps}/>)
    userEvent.click(screen.getByLabelText(`edit ${sampleProps.title}`))
    userEvent.type(screen.getByRole('input'), '0')
    expect(screen.getByRole('input')).toHaveValue(10000)
    userEvent.click(screen.getByLabelText('apply'))
    expect(mockOnEdit).toHaveBeenCalledWith('10000')
  })

  test('hides form when apply is clicked', () => {
    render(<EditableTotal {...sampleProps}/>)
    userEvent.click(screen.getByLabelText(`edit ${sampleProps.title}`))
    userEvent.click(screen.getByLabelText('apply'))
    expect(screen.getByLabelText(`edit ${sampleProps.title}`)).not.toBeNull()
    expect(screen.queryByLabelText('apply')).toBeNull()
  })

  test('shows error when empty value is submited', () => {
    render(<EditableTotal {...sampleProps}/>)
    userEvent.click(screen.getByLabelText(`edit ${sampleProps.title}`))
    fireEvent.change(screen.getByRole('input'), {target: {value: ''}})
    userEvent.click(screen.getByLabelText('apply'))
    expect(screen.queryByLabelText('apply')).toBeNull()
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  test('does not display apply button when there is an error, but redisplays it when value is entered', () => {
    render(<EditableTotal {...sampleProps}/>)
    userEvent.click(screen.getByLabelText(`edit ${sampleProps.title}`))
    fireEvent.change(screen.getByRole('input'), {target: {value: ''}})
    userEvent.click(screen.getByLabelText('apply'))
    expect(screen.queryByLabelText('apply')).toBeNull()
    expect(screen.getByText('This field is required')).toBeInTheDocument()
    userEvent.type(screen.getByRole('input'), '1000')
    expect(screen.queryByLabelText('apply')).not.toBeNull()
    expect(screen.queryByText('This field is required')).toBeNull()
  })

  test('handles click outside', () => {
    render(<EditableTotal {...sampleProps}/>)
    userEvent.click(screen.getByLabelText(`edit ${sampleProps.title}`))
    expect(screen.queryByLabelText(`edit ${sampleProps.title}`)).toBeNull()
    expect(screen.queryByLabelText('apply')).not.toBeNull()
    userEvent.click(screen.getByTestId('title'))
    expect(screen.queryByLabelText(`edit ${sampleProps.title}`)).not.toBeNull()
    expect(screen.queryByLabelText('apply')).toBeNull()
  })

  test('Editable Total updates value when apply is clicked', () => {
    render(<BreakEvenCalculator />)
    // setup to get to page two where editable total appears
    const totalFixedCostYesRadioText = 'yes, I know the total of my monthly fixed costs'
    userEvent.click(screen.getByLabelText(totalFixedCostYesRadioText))
    userEvent.type(screen.getByLabelText('total fixed cost'), '1000')
    fireEvent.submit(screen.getByTestId('fixedCosts-form'))
    // test eaditable total onEdit implementation
    userEvent.click(screen.getByLabelText(`edit Total fixed cost`))
    userEvent.type(screen.getByRole('input'), '0')
    expect(screen.getByRole('input')).toHaveValue(10000)
    userEvent.click(screen.getByLabelText('apply'))
    expect(screen.getByTestId('value')).toHaveTextContent('10,000')
  })
})