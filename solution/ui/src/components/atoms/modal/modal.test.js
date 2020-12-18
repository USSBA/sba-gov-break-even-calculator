import React from 'react'
import { render, screen } from '@testing-library/react'

import Modal from './modal'

describe('Modal', () => {
  const sampleProps = {
    content: 'success!',
    open: true,
    onClose: jest.fn()
  }

  test('renders the content', () => {
    render(<Modal {...sampleProps} />)
    expect(screen.getByRole('alert')).toHaveTextContent(sampleProps.content)
  })

})