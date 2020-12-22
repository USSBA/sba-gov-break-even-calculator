import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from 'semantic-ui-react'

import './modal.less'

const Modal = (props) => {
  const { onClose, content, open } = props;

  return(
    <div 
      className={`confirmationModal-container ${open ? '' : 'hidden'}`}
      aria-hidden={!open} >
      <p role={open ? 'alert' : ''} className='modalContent'><Icon name='check circle' size='small' />{content}</p>
      <a 
        aria-label='close modal'
        className='closeModal'
        href='/' 
        onClick={(e) => {
          e.preventDefault()
          onClose()
        }}>+</a>
    </div>
  )
}

Modal.propTypes = {
  onClose: PropTypes.func,
  content: PropTypes.string,
  open: PropTypes.bool,
}

export default Modal;