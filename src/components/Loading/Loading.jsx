import React from 'react'
import { Spinner } from 'react-bootstrap';
import styles from './loading.module.css';

function Loading() {
  return (
    <div className={"loading-container" & styles.loading__container}>
      <Spinner animation="grow"/>
    </div>
  )
}

export default Loading
