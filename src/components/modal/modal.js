import React from 'react'
import './modal.scss'

const Modal = props => {
  return (
    <React.Fragment>
      <div className="modal-screen" />
      <div className="modal-container">
        {props.children}
      </div>
    </React.Fragment>
  )
}
export default Modal