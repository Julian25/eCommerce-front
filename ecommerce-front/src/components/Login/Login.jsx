import React, { useState } from 'react';
import styles from  './login.module.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {}
    return (
        <Container>
            <Row>
                <Col md={6} className={styles.login__form__container}>
                    <Form className={styles.form} onSubmit={handleSubmit}>
                        <h1>Login to your account</h1>
                        <Form.Group className={styles.form__box}>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="enter you email" value={email} required 
                            onchange={(e) => setEmail(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className={styles.form__box}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="enter you password" value={password} required 
                            onchange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className={styles.form__box}>
                            <Button type="submit">Login</Button>
                        </Form.Group>
                        <p>
                            Don't have an account? <Link to="/signup">Create account</Link>
                        </p>
                    </Form>
                </Col>
                <Col md={6} className={styles.login__image__container} />
            </Row>
        </Container>
    )
}

export default Login
