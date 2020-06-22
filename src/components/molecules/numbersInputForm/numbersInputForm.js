import React from 'react'
import { Form, Grid } from 'semantic-ui-react'

import { MoneyInput } from '../../atoms'

const numbersInputForm = (props) => {
 return (
   props.fields.map((field) => {
     return (
       <Grid.Column key={field.name}>
         <Form.Field>
           <label for={field.name}>{field.name}</label>
           <MoneyInput name={field.name}/>
         </Form.Field>
       </Grid.Column>
     )
   })
 )
}

export default numbersInputForm