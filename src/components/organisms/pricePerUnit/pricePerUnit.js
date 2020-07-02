import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'

import { MoneyInput } from '../../atoms'
import './pricePerUnit.less'

const PricePerUnit = (props) => {
  const handleSubmit = () => {
    props.goToStep(4)
  }
  return (
    <div className={`pricePerUnit-container ${props.visible ? '' : 'hidden'}`}>
      <h3>Estimate your selling price per unit</h3>
      <p>Calculate the price at which your unit or service will sell to customers.</p>
      <Form onSubmit={handleSubmit}>
        <div>
          <label for='unit price'>Per unit selling price*</label>
          <p>Enter the price you plan to sell per unit or service</p>
          <MoneyInput 
            value={props.value}
            onChange={(e, {value}) => props.setUnitPrice(value)}
            name='unit price' />
        </div>
        <div className='button-container'>
          <Form.Button primary content='Continue' />
        </div>
        <a onClick={props.restart}>Restart Analysis</a>
      </Form>
    </div>
  )
}

export default PricePerUnit;