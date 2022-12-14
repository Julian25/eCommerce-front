import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../../services/appApi';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import styles from "./checkOutForm.module.css"

function CheckOutForm() {

    const stripe = useStripe();
    const elements = useElements();
    const user = useSelector( (state) => state.user);
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState("");
    const [createOrder, {isLoading, isError, isSuccess }] = useCreateOrderMutation();
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [paying, setPaying] = useState(false);

    const handlePayment =  async (e) => {
        e.preventDefault();
        if(!stripe || !elements || user.cart.count <= 0 ) return;
        setPaying(true);
        const { client_secret } = await fetch("http://localhost:8080/create-payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ amount: user.cart.total }),
        }).then((res) => res.json());
        const {paymentIntent} = await stripe.confirmCardPayment(client_secret,{
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });
        setPaying(false);

        if(paymentIntent) {
            createOrder({ userId: user._id, cart: user.cart, address, country }).then((res) => {
                if(!isLoading && !isError) {
                    setAlertMessage(`Payment ${paymentIntent.status}`);
                    setTimeout(() => {
                        //navigate('/orders')
                    },2000)
                }
            })
        }
    }
    return (
      <Col className={styles.cart__payment__container}>
        <Form onSubmit={handlePayment}>
            <Row>
                {alertMessage && <Alert>{alertMessage}</Alert>}
                <Col md={6}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder='Name' value={user.name} disabled />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder='Email' value={user.email} disabled />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" placeholder='Country' value={country} onChange={(e) => setCountry(e.target.value)} required />
                    </Form.Group>
                </Col>
            </Row>
            <label htmlFor='card-element'>Card</label>
            <CardElement id='card-element' className={styles.card__element}/>
            <Button className='mt-3' type='submit' disabled={user.cart.count <= 0 || paying || isSuccess}>
                {paying ? 'Processing...' : "Pay"}
            </Button>
        </Form>
      </Col>
  )
}

export default CheckOutForm
