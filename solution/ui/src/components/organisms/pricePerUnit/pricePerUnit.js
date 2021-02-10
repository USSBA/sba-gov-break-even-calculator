import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Button, Grid, Form } from 'semantic-ui-react'
import { MoneyInput } from '../../atoms'
import { CALCULATOR_STEPS } from '../../../constants'
import './pricePerUnit.less'

const PricePerUnit = (props) => {
  const priceInputRef = useRef(null)
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

  useEffect(() => {
    if (props.visible) {
      priceInputRef.current.focus()
      document.getElementsByClassName('pricePerUnit-container')[0].scrollIntoView()
    }
  }, [props.visible])

  return (
    <div aria-hidden={!props.visible} className={`pricePerUnit-container ${props.visible ? '' : 'hidden'}`}>
      <h3>Estimate your selling price per unit</h3>
      <p>
        Calculate the price at which your unit or service will sell to customers.<br/>
        <span className="subtext">* indicates required field</span>
      </p>

      <Form onSubmit={handleSubmit}>
        <Grid>
          <Grid.Column computer={8} tablet={8} mobile={16}>
            <label htmlFor='unitPrice'>Per unit selling price*</label>
            <p className="subtext">Enter the price you plan to sell per unit or service:</p>
            <MoneyInput
              inputRef={priceInputRef}
              autoFocus
              value={props.value}
              formError= {formError}
              errorMessage= 'Enter a valid selling price to continue'
              onChange={(e, { value }) => {
                props.setUnitPrice(value)
                setFormError(false)
              }}
              name='unitPrice' />
          </Grid.Column>
        </Grid>
        <div className='button-container'>
          <Form.Button type='submit' primary content='CONTINUE' />
        </div>
        <Grid className='returnLinks' columns={2}>
          <Grid.Column id='backLink' mobile={8} computer={4}>
            <Button
              basic 
              color='blue'
              type='button'
              className='noBorder' 
              aria-label='Back to fixed costs'
              onClick={() => props.goToStep(self - 1)}
            >{`< Back to fixed costs`}</Button>
          </Grid.Column>
          <Grid.Column id='restartLink' mobile={8} computer={3}>
            <Button basic color='blue' type='button' className='noBorder' onClick={props.restart}>Restart Analysis</Button>
          </Grid.Column>
        </Grid>
      </Form>
    </div>
  )
}

PricePerUnit.propTypes = {
  goToStep: PropTypes.func.isRequired,
  restart: PropTypes.func.isRequired,
  setUnitPrice: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  visible: PropTypes.bool.isRequired
}

export default PricePerUnit;
