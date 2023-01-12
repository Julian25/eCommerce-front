import React from 'react';
import { useState } from 'react';
import { Toast, ToastContainer, ToastHeader } from 'react-bootstrap';
import styles from './toastMessage.module.css'

function ToastMessage({ bg, title, body}) {
  const [show, setShow] = useState(true);
  return (
    <ToastContainer className={styles.toast__container}>
      <Toast bg={bg} onClose={()=> setShow(false)} show={show} delay={3000} autohide>
        <Toast.Header>
          <strong className='me-auto'>{title}</strong>
          <small>now</small>
        </Toast.Header>
        <Toast.Body>
          {body}
        </Toast.Body>
      </Toast>

    </ToastContainer>
  )
}

export default ToastMessage
