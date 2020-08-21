import React, { useState, useEffect, useRef } from 'react'

import { Grid, Input, Form } from 'semantic-ui-react'
import { formatNumber } from '../../../helpers'
import './editableTotal.less'

const errorContent = () => {
  return { content: 'This field is required', 
           pointing: 'above' 
  }
}

const EditableTotal = (props) => {
  const {title, type='currency', onEdit} = props;

  const node = useRef()

  const [fieldValue, setFieldValue] = useState(props.value)
  const [isEditing, setIsEditing] = useState(false)
  const [formError, setFormError] = useState(false)


  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClickOutside);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = e => {
    if (node.current.contains(e.target) || formError) {
      return;
    }
    setIsEditing(false)
    setFormError(false)
  };

  const handleInputFieldChange = (value) => {
    setFieldValue(value)
    setFormError(false)
  }

  const handleApply = () => {
    if (fieldValue === '')  {
      setIsEditing(true)
      setFormError(true)
    } else {
      onEdit(fieldValue)
      setIsEditing(false)
      setFormError(false)
    }
  }

  const formatTotals = (val) => {
    if(!val && val !== 0) return ''
    return `${type === 'currency' ? '$' : ''}${formatNumber(val)}${type !== 'currency' ? ' Units' : ''}`
  }

  return (
    <Grid.Row verticalAlign='middle' className='editableTotal-row' columns={2}>
      <Grid.Column computer={8} mobile={6} className='title'>{title}</Grid.Column>
      <Grid.Column computer={8} mobile={10} textAlign='right' className='editableSection'>
          <Form onSubmit={handleApply} size='small'>
            <Form.Field>
              <div ref={node}>
                {isEditing && 
                  <Form.Input width={props.width} {...(formError ? {error: errorContent()} : {})} >
                    <Input
                      size='small'
                      aria-label={title}
                      autoFocus
                      label={{basic: true, content: `${type === 'currency' ? '$' : 'Units'}`}} 
                      action={!formError && {
                        color: 'blue',
                        content:'APPLY',
                        size: 'small',
                        onClick: () => handleApply(),
                      }}
                      type='number'
                      value={fieldValue} 
                      onChange={(e, { value }) => {handleInputFieldChange(value)}}
                      {...(formError ? {icon: 'exclamation circle'} : {})}
                    />
                  </Form.Input>}
              </div>
            </Form.Field>
          </Form>
        {!isEditing && (
          <Grid columns={2} stackable={false}>
            <Grid.Column computer={13} mobile={11} verticalAlign='middle' className='editableValue'>
              {formatTotals(props.value)}
            </Grid.Column>
            <Grid.Column computer={3} mobile={5} verticalAlign='middle'>
              <a aria-label={`edit ${title}`} href="#" className='editButton' onClick={() => setIsEditing(true)}>edit</a>
            </Grid.Column>
          </Grid>
        )}
      </Grid.Column>
    </Grid.Row>
  )
}

export default EditableTotal;
