import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Button, Grid, Form, Input } from 'semantic-ui-react'
import { CALCULATOR_STEPS } from '../../../constants'
import './unitSales.less'

const UnitSales = (props) => {
  const [formError, setFormError] = useState(false)
  const self = CALCULATOR_STEPS.UNIT_SALES
  const unitsInputRef = useRef(null)

  const handleSubmit = () => {  
    if (!props.value && props.value !== 0) {
      setFormError(true)
    } else {
      setFormError(false)
      props.goToStep(self + 1)
    }
  }

  const errorContent = () => {
    return { 
      content: 'Enter a valid number of units to continue', 
      pointing: 'above'
    }
  }

  useEffect(() => {
    if (props.visible) {
      unitsInputRef.current.focus()
    }
  }, [props.visible])
  
  return (
    <div aria-hidden={!props.visible} className={`unitSales-container ${props.visible ? '' : 'hidden'}`}>
      <h3>Estimate your expected unit sales</h3>
      <p>
        Establish the number of units your business is expected to sell<br/>
        <span className="subtext">* indicates required field</span>
      </p>
      <Form onSubmit={handleSubmit}>
      <Grid>
        <Grid.Column computer={8} tablet={8} mobile={16}>
          <label htmlFor='units'>Number of units to sell*</label>
          <p className="subtext">Enter the number of units or services you expect to sell</p>

          <Form.Input {...(formError ? {error: errorContent()} : {})} >
            <Input 
              id='units'
              ref={unitsInputRef}
              autoFocus
              label={!formError && {basic: true, content: 'Units'}}
              labelPosition={formError ? '' : 'right'}
              placeholder='0'
              type='number'
              value={props.value}
              onChange={(e, { value }) => {
                props.setNumUnits(value)
                setFormError(false)
              }}
              {...(formError ? {icon: 'exclamation circle'} : {})}
              />
            </Form.Input>
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
              aria-label='Back to price per unit' 
              onClick={() => props.goToStep(self - 1)}
            >{`< Back to price per unit`}</Button>
          </Grid.Column>
          <Grid.Column id='restartLink' mobile={8} computer={3}>
            <Button basic color='blue' type='button' className='noBorder' onClick={props.restart}>Restart Analysis</Button>
          </Grid.Column>
        </Grid>
      </Form>
    </div>
  )
}

UnitSales.propTypes = {
  goToStep: PropTypes.func.isRequired,
  restart: PropTypes.func.isRequired,
  setNumUnits: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  visible: PropTypes.bool.isRequired
}

export default UnitSales;
