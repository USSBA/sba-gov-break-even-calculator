import React, { useState } from 'react'

import { Grid, Input, Divider } from 'semantic-ui-react'
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
        (<Input 
          label={{basic: true, content: `${props.type === 'currency' ? '$' : 'Units'}`}} 
          action={{
            content:'APPLY',
            onClick: () => handleApply(),
          }}
          type='number'
          value={fieldValue} 
          onChange={(e, { value }) => {handleInputFieldChange(value)}}
        />) :
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