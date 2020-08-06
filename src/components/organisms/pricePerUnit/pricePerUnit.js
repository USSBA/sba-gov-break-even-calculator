import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'

import { MoneyInput } from '../../atoms'
import { CALCULATOR_STEPS } from '../../../constants/constants'
import './pricePerUnit.less'

const PricePerUnit = (props) => {
  const [formError, setFormError] = useState(false)
  const self = CALCULATOR_STEPS.PRICE_PER_UNIT

  const handleSubmit = () => {  
    if (!props.value && props.value !== 0) {
      setFormError(true)
    } else {
      setFormError(false)
      props.goToStep(self + 1)
    }
  }

  return (
    <div className={`pricePerUnit-container ${props.visible ? '' : 'hidden'}`}>
      <h3>Estimate your selling price per unit</h3>
      <p>
        Calculate the price at which your unit or service will sell to customers.<br/>
        <span className="subtext">* indicates required field</span>
      </p>

      <Form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='unit price'>Per unit selling price*</label>
          <p className="subtext">Enter the price you plan to sell per unit or service:</p>
          <MoneyInput
            autoFocus
            value={props.value}
            formError= {formError}
            errorMessage= 'Enter a valid price per unit to continue'
            onChange={(e, { value }) => {
              props.setUnitPrice(value)
              setFormError(false)
            }}
            name='unit price' />
        </div>
        <div className='button-container'>
          <Form.Button primary content='CONTINUE' />
        </div>
        <a onClick={() => props.goToStep(self - 1)}>{`< Back to fixed costs`}</a>
        <a onClick={props.restart}>Restart Analysis</a>
      </Form>
    </div>
  )
}

export default PricePerUnit;