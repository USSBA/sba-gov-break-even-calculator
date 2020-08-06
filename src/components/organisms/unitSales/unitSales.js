import React, { useState } from 'react'
import { Form, Input } from 'semantic-ui-react'
import { CALCULATOR_STEPS } from '../../../constants/constants'
import './unitSales.less'

const UnitSales = (props) => {
  const [formError, setFormError] = useState(false)
  const self = CALCULATOR_STEPS.UNIT_SALES

  const handleSubmit = () => {  
    if (!props.value && props.value !== 0) {
      setFormError(true)
    } else {
      setFormError(false)
      props.goToStep(self + 1)
    }
  }

  const errorContent = (formError) => {
    if (formError) return { content: 'Enter a valid number of units', 
                            pointing: 'above' 
                          }
  }

  return (
    <div className={`unitSales-container ${props.visible ? '' : 'hidden'}`}>
      <h3>Estimate your expected unit sales</h3>
      <p>Establish the number of units your business is expected to sell</p>
      <Form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='units'>Number of units to sell*</label>
          <p>Enter the number of units or services you expect to sell</p>
          <Form.Input width={6} {...(formError ? {error: errorContent(true)} : {})} >
            <Input 
              autoFocus
              label={{basic: true, content: 'Units'}}
              labelPosition='right'
              placeholder='0'
              value={props.value}
              onChange={(e, { value }) => {
                props.setNumUnits(value)
                setFormError(false)
              }}
              {...(formError ? {icon: 'exclamation circle'} : {})}
            />
          </Form.Input>
        </div>
        <div className='button-container'>
          <Form.Button primary content='CONTINUE' />
        </div>
        <a onClick={() => props.goToStep(self - 1)}>{`< Back to price per unit`}</a>
        <a onClick={props.restart}>Restart Analysis</a>
      </Form>
    </div>
  )
}

export default UnitSales;