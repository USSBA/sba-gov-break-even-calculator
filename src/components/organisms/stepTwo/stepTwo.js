import React, { useState } from 'react'

import { Form, Input } from 'semantic-ui-react'
import './stepTwo.less'

const StepTwo = (props) => {
  const [units, setUnits] = useState(0)
  const handleSubmit = () => {
    props.setNumUnits(units)
    props.goToStep(3)
  }
  return (
    <div className='stepTwo-container'>
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
          onChange={(e, {value}) => setUnits(value)}
          />
        </div>
        <div className='button-container'>
          <Form.Button primary content='Continue' />
        </div>
        <a onClick={()=>{props.goToStep(1)}}>Restart Analysis</a>
      </Form>
    </div>
  )
}

export default StepTwo;