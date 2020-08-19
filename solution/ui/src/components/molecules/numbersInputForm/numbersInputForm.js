import React from 'react'
import { Form, Grid } from 'semantic-ui-react'

import { MoneyInput } from '../../atoms'

import './numbersInputForm.less'

const NumbersInputForm = (props) => {
 return (
  props.fields && props.fields.map((field) => {
     return (
       <Grid.Column key={field.name}>
         <Form.Field>
          <label className='numbersInputForm-label' for={field.name}>{field.name}</label>
          <p className='numbersInputForm-p'>{field.description}</p>
          
          <MoneyInput 
           onChange={ props.onChange } 
           name={field.name}/>
         </Form.Field>
       </Grid.Column>
     )
   })
 )
}

export default NumbersInputForm
