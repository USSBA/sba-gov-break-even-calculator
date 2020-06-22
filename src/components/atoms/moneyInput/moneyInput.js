import React from 'react'
import { Input, Label } from 'semantic-ui-react'

const moneyInput = (props) => {
  return(
    <Input label type='text' placeholder='0,000.00'>
      <Label basic>$</Label>
      <input name={props.name} />
    </Input>
  )
}

export default moneyInput