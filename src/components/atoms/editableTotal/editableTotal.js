import React from 'react'

import { Grid } from 'semantic-ui-react'

const EditableTotal = (props) => {
  const {title, value, onEdit} = props;
  return (
    <Grid.Row columns={2}>
      <Grid.Column floated={left} className='title'>{title}</Grid.Column>
      <Grid.Column floated={right} className='editableSection'>
        <div>{value}</div>
        <a onClick={onEdit}>Edit</a>
      </Grid.Column >
    </Grid.Row>
  )
  
}

export default EditableTotal;