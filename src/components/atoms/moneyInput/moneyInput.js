import React from 'react'
import { Input } from 'semantic-ui-react'

const MoneyInput = (props) => {
  return(
    <Input 
      onChange={props.onChange} 
      label={{basic: true, content: '$'}}
      labelPosition='left'
      name={props.name}
      value={props.value} 
      type='number' 
      placeholder='0,000.00' />
  )
}

export default MoneyInput