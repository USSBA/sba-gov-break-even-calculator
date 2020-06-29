import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'

import { MoneyInput } from '../../atoms'
import './stepThree.less'

const StepThree = (props) => {
  const [unitPrice, setUnitPrice] = useState(0)
  const handleSubmit = () => {
    props.setUnitPrice(unitPrice)
    props.goToStep(4)
  }
  return (
    <div className='stepThree-container'>
      <h3>Estimate your selling price per unit</h3>
      <p>Calculate the price at which your unit or service will sell to customers.</p>
      <Form onSubmit={handleSubmit}>
        <div>
          <label for='unit price'>Per unit selling price*</label>
          <p>Enter the price you plan to sell per unit or service</p>
          <MoneyInput 
            onChange={(e, {value}) => setUnitPrice(value)}
            name='unit price' />
        </div>
        <div className='button-container'>
          <Form.Button primary content='Continue' />
        </div>
        <a onClick={()=>{props.goToStep(1)}}>Restart Analysis</a>
      </Form>
    </div>
  )
}

export default StepThree;