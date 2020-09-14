import React, { useState } from 'react'
import { Grid, Form } from 'semantic-ui-react'

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
        <Grid>
          <Grid.Column computer={8} tablet={8} mobile={16}>
            <label htmlFor='unit price'>Per unit selling price*</label>
            <p className="subtext">Enter the price you plan to sell per unit or service:</p>
            <MoneyInput
              autoFocus
              value={props.value}
              formError= {formError}
              errorMessage= 'Enter a valid selling price to continue'
              onChange={(e, { value }) => {
                props.setUnitPrice(value)
                setFormError(false)
              }}
              name='unit price' />
          </Grid.Column>
        </Grid>
        <div className='button-container'>
          <Form.Button primary content='CONTINUE' />
        </div>
        <Grid className='returnLinks' columns={2}>
          <Grid.Column id='backLink' mobile={8} computer={4}>
            <a 
              aria-label='Back to fixed costs'
              href="#" 
              onClick={() => props.goToStep(self - 1)}
            >{`< Back to fixed costs`}</a>
          </Grid.Column>
          <Grid.Column id='restartLink' mobile={8} computer={3}>
            <a href="#" onClick={props.restart}>Restart Analysis</a>
          </Grid.Column>
        </Grid>
      </Form>
    </div>
  )
}

export default PricePerUnit;