import React from 'react'

import { Input, Button } from 'semantic-ui-react'

const StepTwo = (props) => {
  return (
    <div className='stepTwo-container'>
      <h3>Estimate your expected unit sales</h3>
      <p>Establish the number of units your business is expected to sell</p>
      <label for='units'>Number of units to sell*</label>
      <p>Enter the number of units or services you expect to sell</p>
      <Input 
        label={{basic: true, content: 'Units'}}
        labelPosition='right'
        placeholder='0'
      />
      <div className='button-container'>
        <Button onClick={()=>{props.goToStep(3)}} primary content='Continue' />
      </div>
      <a onClick={()=>{props.goToStep(1)}}>Restart Analysis</a>
    </div>
  )
}

export default StepTwo;