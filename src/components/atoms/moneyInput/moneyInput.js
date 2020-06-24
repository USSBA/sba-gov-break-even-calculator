import React from 'react'
import { Input, Label } from 'semantic-ui-react'
import './moneyInput.less'

const MoneyInput = (props) => {
  return(
    <Input 
      onChange={props.onChange} 
      label 
      name={props.name}
      value={props.value} 
      type='number' 
      placeholder='0,000.00'>
      <Label id='moneySymbol' basic>$</Label>
      <input name={props.name} />
    </Input>
  )
}

export default MoneyInput