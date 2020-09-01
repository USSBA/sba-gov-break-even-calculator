import React from 'react'
import { Icon } from 'semantic-ui-react'

import './modal.less'

const Modal = (props) => {
  const { onClose, content, open } = props;

  return(
    <div className={`confirmationModal-container ${open ? '' : 'hidden'}`}>
      <p><Icon name='check circle' size='small' />{content}</p>
      <a 
        aria-label='close modal'
        className='closeModal'
        href='#' 
        onClick={(e) => {
          e.preventDefault()
          onClose()
        }}>+</a>
    </div>
  )
}

export default Modal;