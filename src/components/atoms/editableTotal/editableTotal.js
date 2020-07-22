import React, { useState } from 'react'

import { Grid, Input, Form } from 'semantic-ui-react'
import { formatNumber } from '../../../helpers'
import './editableTotal.less'

const EditableTotal = (props) => {
  const {title, value, type='currency', onEdit} = props;

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
    <Grid.Row className='editableTotal-row' columns={2}>
      <Grid.Column className='title'>{title}</Grid.Column>
      <Grid.Column textAlign='right' className='editableSection'>
        {isEditing ? 
        (
          <Form onSubmit={handleApply} size='small'>
            <Form.Field>
              <Input 
                label={{basic: true, content: `${type === 'currency' ? '$' : 'Units'}`}} 
                action={{
                  color: 'blue',
                  content:'APPLY',
                  onClick: () => handleApply(),
                }}
                type='number'
                value={fieldValue} 
                onChange={(e, { value }) => {handleInputFieldChange(value)}}
              />
            </Form.Field>
          </Form>
        ) :
        (<>
          <span className='editableValue'>
            {`${type === 'currency' ? '$' : ''}${formatNumber(value)} ${type !== 'currency' ? 'Units' : ''}`}
          </span>
          <a onClick={() => setIsEditing(true)}>edit</a>
        </>)
        }
      </Grid.Column >
    </Grid.Row>
    </>
  )
  
}

export default EditableTotal;