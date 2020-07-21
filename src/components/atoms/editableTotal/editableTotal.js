import React, { useState } from 'react'

import { Grid, Button, Input } from 'semantic-ui-react'
import { MoneyInput } from '../../atoms'

const EditableTotal = (props) => {
  const {title, value, onEdit} = props;

  const [fieldValue, setFieldValue] = useState(value)
  const [isEditing, setIsEditing] = useState(false)

  const handleInputFieldChange = (value) => {
    setIsEditing(true)
    setFieldValue(value)
  }

  const handleApply = () => {
    onEdit(fieldValue)
    setIsEditing(false)
  }

  return (
    <>
    <Grid.Row columns={2}>
      <Grid.Column className='title'>{title}</Grid.Column>
      <Grid.Column textAlign='right' className='editableSection'>
        {isEditing ? 
        (<Input 
          label={{basic: true, content: '$'}} 
          action={{
            content:'APPLY',
            onClick: () => handleApply(),
          }}
          type='number'
          value={fieldValue} 
          onChange={(e, { value }) => {handleInputFieldChange(value)}}
        />) :
        (<>
          <span>{value}</span>
          <a onClick={() => setIsEditing(true)}>Edit</a>
        </>)
        }
      </Grid.Column >
    </Grid.Row>
    </>
  )
  
}

export default EditableTotal;