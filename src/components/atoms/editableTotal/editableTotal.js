import React, { useState, useEffect, useRef } from 'react'

import { Grid, Input, Form } from 'semantic-ui-react'
import { formatNumber } from '../../../helpers'
import './editableTotal.less'

const EditableTotal = (props) => {
  const {title, value, type='currency', onEdit} = props;

  const node = useRef()

  const [fieldValue, setFieldValue] = useState(value)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClickOutside);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      return;
    }
    setIsEditing(false)
  };

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
          <Form onSubmit={handleApply} size='small'>
            <Form.Field>
              <div ref={node}>
                {isEditing && <Input 
                  label={{basic: true, content: `${type === 'currency' ? '$' : 'Units'}`}} 
                  action={{
                    color: 'blue',
                    content:'APPLY',
                    onClick: () => handleApply(),
                  }}
                  type='number'
                  value={fieldValue} 
                  onChange={(e, { value }) => {handleInputFieldChange(value)}}
                />}
              </div>
            </Form.Field>
          </Form>
        {!isEditing && (<>
          <span className='editableValue'>
            {`${type === 'currency' ? '$' : ''}${formatNumber(value)} ${type !== 'currency' ? 'Units' : ''}`}
          </span>
          <a onClick={() => setIsEditing(true)}>edit</a>
        </>)}
      </Grid.Column >
    </Grid.Row>
    </>
  )
  
}

export default EditableTotal;