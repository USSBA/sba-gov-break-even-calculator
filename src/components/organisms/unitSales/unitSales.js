import React, { useState } from 'react'

import { Form, Input } from 'semantic-ui-react'
import './unitSales.less'

const UnitSales = (props) => {
  const handleSubmit = () => {
    props.goToStep(3)
  }
  return (
    <div className={`unitSales-container ${props.visible ? '' : 'hidden'}`}>
      <h3>Estimate your expected unit sales</h3>
      <p>Establish the number of units your business is expected to sell</p>
      <Form onSubmit={handleSubmit}>
        <div>
          <label for='units'>Number of units to sell*</label>
          <p>Enter the number of units or services you expect to sell</p>
        <Input 
          label={{basic: true, content: 'Units'}}
          labelPosition='right'
          placeholder='0'
          value={props.value}
          onChange={(e, {value}) => props.setNumUnits(value)}
          />
        </div>
        <div className='button-container'>
          <Form.Button primary content='Continue' />
        </div>
        <a onClick={props.restart}>Restart Analysis</a>
      </Form>
    </div>
  )
}

export default UnitSales;