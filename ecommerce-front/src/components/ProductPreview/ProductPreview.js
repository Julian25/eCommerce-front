import React from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Card, Badge } from 'react-bootstrap'
import styles from './ProductPreview.module.css'

function ProductPreview({ _id, category, name, pictures }) {
  return (
    <LinkContainer to={`/product/${_id}`} className={styles.product__link} >
      <Card className={styles.product__card}>
        <Card.Img variant='top' className={styles.product__preview__img} src={pictures[0].url}/>
        <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Badge bg='warning' text='black'>
              {category}
            </Badge>
        </Card.Body>
      </Card>
    </LinkContainer>
  )
}

export default ProductPreview;
