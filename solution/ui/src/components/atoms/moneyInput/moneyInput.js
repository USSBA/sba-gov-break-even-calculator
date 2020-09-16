import React from 'react'
import { Form, Input } from 'semantic-ui-react'

const errorContent = (error) => {
  if (error.formError) return { content: error.errorMessage, pointing: 'above' }
}

const MoneyInput = (props) => {

  return(
    <Form.Input {...(props.formError ? {error: errorContent(props)} : {})} >
    
      <Input
        ref={props.inputRef}
        aria-label={props.ariaLabel}
        autoFocus={!!props.autoFocus}
        onChange={props.onChange} 
        label={{basic: true, content: '$'}}
        labelPosition='left'
        name={props.name}
        id={props.name}
        value={props.value} 
        type='number' 
        placeholder='0,000.00'
        {...(props.formError ? {icon: 'exclamation circle'} : {})}
        />
    </Form.Input>
  )
}

export default MoneyInput
