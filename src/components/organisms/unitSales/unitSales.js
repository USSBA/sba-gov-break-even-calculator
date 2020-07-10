import React, { useState } from 'react'

import { Form, Input } from 'semantic-ui-react'
import { CALCULATOR_STEPS } from '../../../constants/constants'

import './unitSales.less'

const UnitSales = (props) => {
  const self = CALCULATOR_STEPS.UNIT_SALES
  return (
    <div className={`unitSales-container ${props.visible ? '' : 'hidden'}`}>
      <h3>Estimate your expected unit sales</h3>
      <p>Establish the number of units your business is expected to sell</p>
      <Form onSubmit={() => props.goToStep(self + 1)}>
        <div>
          <label htmlFor='units'>Number of units to sell*</label>
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
        <a onClick={() => props.goToStep(self - 1)}>{`<Back to fixed costs`}</a>
        <a onClick={props.restart}>Restart Analysis</a>
      </Form>
    </div>
  )
}

export default UnitSales;