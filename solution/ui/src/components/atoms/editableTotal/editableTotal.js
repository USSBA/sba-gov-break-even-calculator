import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
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
    const handleClickOutside = e => {
      if (node.current.contains(e.target) || formError) {
        return;
      }
      setIsEditing(false)
      setFormError(false)
    };
    // add when mounted
    document.addEventListener("mousedown", handleClickOutside);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [node, formError]);


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
    return `${type === 'currency' ? '$' : ''}${formatNumber(val)}`
  }

  return (
    <Grid.Row verticalAlign='middle' className='editableTotal-row' columns={2}>
      <Grid.Column computer={6} tablet={7} mobile={7} className='title' data-testid='title'>{title}</Grid.Column>
      <Grid.Column computer={10} tablet={9} mobile={9} textAlign='right' className='editableSection'>
          <Form role='form' className='editValueForm' onSubmit={handleApply} size='small'>
            <Form.Field>
              <div ref={node}>
                {isEditing && 
                  <Form.Input 
                    size='small' 
                    {...(formError ? {error: errorContent()} : {})} >
                    <Input
                      role='input'
                      width={8}
                      size='small'
                      aria-label={title}
                      name={title}
                      autoFocus
                      label={{basic: true, content: `${type === 'currency' ? '$' : 'Units'}`}} 
                      action={!formError && {
                        color: 'blue',
                        content:'APPLY',
                        size: 'small',
                        'aria-label':'apply',
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
            <Grid.Column data-testid='value' className='totalValue-container editableValue' computer={11} tablet={10} mobile={10} verticalAlign='middle'>
              {formatTotals(props.value)}
            </Grid.Column>
            <Grid.Column className='editTotal-container' computer={5} tablet={6} mobile={6} verticalAlign='middle'>
              <a 
                role='button'
                aria-label={`edit ${title}`} 
                href="/" className='editButton' 
                onClick={(e) => {
                  e.preventDefault()
                  setIsEditing(true)
                }}
              >edit</a>
            </Grid.Column>
          </Grid>
        )}
      </Grid.Column>
    </Grid.Row>
  )
}

EditableTotal.propTypes = {
  onEdit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['units', 'currency']),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

export default EditableTotal;
