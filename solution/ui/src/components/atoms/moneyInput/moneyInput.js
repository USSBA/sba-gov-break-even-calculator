import React from 'react'
import { Form, Input } from 'semantic-ui-react'

const errorContent = (error) => {
  if (error.formError) return { content: error.errorMessage, pointing: 'above' }
}

const MoneyInput = (props) => {
  return(
    <Form.Input width={props.width} {...(props.formError ? {error: errorContent(props)} : {})} >
      <Input 
        autoFocus={!!props.autoFocus}
        onChange={props.onChange} 
        label={{basic: true, content: '$'}}
        labelPosition='left'
        name={props.name}
        value={props.value} 
        type='number' 
        placeholder='0,000.00'
        {...(props.formError ? {icon: 'exclamation circle'} : {})}
        />
    </Form.Input>
  )
}

export default MoneyInput