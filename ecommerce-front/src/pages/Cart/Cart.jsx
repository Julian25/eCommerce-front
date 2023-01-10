import React from 'react'
import styles from './cart.module.css';
import { useSelector } from 'react-redux';
import { Alert, Container, Row } from 'react-bootstrap';


function Cart() {

    const user = useSelector(state => state.user);
    const products = useSelector(state => state.products);
    const userCartObj = user.cart;
    let cart = products.filter((product) => userCartObj[product._id] != null);

  return (
    <Container className={styles.cart__container}>
      <Row>
        <h1 className='pt-2 h3'>Shopping cart</h1>
        {cart.length === 0 ? (
            <Alert variant='info'>Shopping cart is empty. Add products to your cart</Alert>
        ) : ( 
        <div>Payment here</div>
        ) }
      </Row>
    </Container>
  )
}

export default Cart
