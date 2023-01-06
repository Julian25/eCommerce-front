import React from 'react'
import styles from './navigation.module.css'
import {Navbar, Container, Nav, NavDropdown, Button} from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { logOut } from '../../features/userSlice';
import { LinkContainer } from 'react-router-bootstrap';

function Navigation() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  
  const handleLogOut = () => {
    dispatch(logOut());
  }
  console.log(user);
  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <LinkContainer to="/">
        <Navbar.Brand>eCommerce</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
        {!user && (
                  <LinkContainer to="/login">
                            <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
        )}
        {user && (
          <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
            {user.isAdmin && (
              <>
               <LinkContainer to="/dashboard">
                  <NavDropdown.Item>Dashboard</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/new-product">
                  <NavDropdown.Item >Create product</NavDropdown.Item>
                </LinkContainer>
              </>
            )}
            {!user.isadmin && (
              <>
                <LinkContainer to="/cart">
                  <NavDropdown.Item>Cart</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/order">
                  <NavDropdown.Item >My orders</NavDropdown.Item>
                </LinkContainer>
              </>
            )}
            <NavDropdown.Divider />
            <Button variant='danger' onClick={handleLogOut} className={styles.logout__btn}>Logout</Button>
          </NavDropdown>
        )}
          
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Navigation