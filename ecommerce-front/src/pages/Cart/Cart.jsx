import React from 'react'
import styles from './cart.module.css';
import { useSelector } from 'react-redux';
import { Alert, Container, Row, Col, Table } from 'react-bootstrap';


function Cart() {

    const user = useSelector(state => state.user);
    const products = useSelector( state => state.products);
    const userCartObj = user.cart;
    let cart = products.filter((product) => userCartObj[product._id] != null);

  return (
    <Container className={styles.cart__container}>
      <Row>
        <Col md={7}>
          <h1 className='pt-2 h3'>Shopping cart</h1>
          {cart.length == 0 ? (
              <Alert variant='info'>Shopping cart is empty. Add products to your cart</Alert>
          ) : ( 
          <div>Payment here</div>
          ) }
        </Col>
        <Col md={5}>
          {cart.length > 0 && (
            <>
              <Table responsive="sm" className={styles.cart__table}>
                <thead>
                  <tr> 
                    <th>&nbsp;</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr>
                      <td>&nbsp;</td>
                      <td>
                        <i className={`fa fa-times ${styles.icon__remove}`}></i>
                        <img src={item.pictures[0].url} className={styles.product__img}/>
                      </td>
                      <td>{item.price}</td>
                      <td>
                        <span className={styles.quantity__indicator}>
                          <i className={`fa fa-minus-circle ${styles.quantity__button} ${styles.minus}`}></i>
                          <span>{user.cart[item._id]}</span>
                          <i className={`fa fa-plus-circle ${styles.quantity__button } ${styles.plus}`}></i>
                        </span>
                      </td>
                      <td>{item.price * user.cart[item._id]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div>
                <h3 className='h4 pt-4'>
                   Total: ${user.cart.total}
                </h3>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Cart
