import React, { useState } from 'react';
import styles from './signup.module.css';
import {Container, Row, Form, Button, Col, Alert} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useSignupMutation } from '../../services/appApi';

function Signup() {
    const [email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[name, setName] = useState('');
    const [signup, { error, isLoading, isError }] = useSignupMutation();

    const handleSignup = (e)=> {
        e.preventDefault();
        signup({name, email, password});
    };
  return (
    <Container>
        <Row>
            <Col md={6} className={styles.signup__form__container}>
                <Form className={styles.form} onSubmit={handleSignup}>
                    <h1>Create an account</h1>
                    {isError && <Alert variant='danger'>{error.data}</Alert>}
                    <Form.Group className={styles.form__box}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="enter your name" value={name} required 
                        onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className={styles.form__box}>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="enter your email" value={email} required 
                        onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className={styles.form__box}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="enter you password" value={password} required 
                        onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className={styles.form__box} disabled={isLoading}>
                        <Button type="submit">Sign up</Button>
                    </Form.Group>
                    <p>
                        Already have an account? <Link to="/login">Login to your account</Link>
                    </p>
                </Form>
        </Col>
        <Col md={6} className={styles.signup__image__container} />
    </Row>
    </Container>
  )
}

export default Signup;
