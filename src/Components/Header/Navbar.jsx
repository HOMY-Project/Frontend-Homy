import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../Redux/features/authSlice';
import { message } from 'antd';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../assets/logo.png";
import "./media.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";


function MainNavbar() {
  const { user } = useSelector((state) => state.auth);
  console.log(user, 'navbar');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(clearUser());
    message.success('Logged out successfully');
    navigate('/');
  };


  return (
    <Navbar bg="light" expand="lg" className="custom-navbar" collapseOnSelect >
      <Container fluid>
        <Navbar.Brand href="#">
          <Link to="/">
            <img src={logo} alt="logo" className="logo-img" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Form className="me-auto my-2 my-lg-0 searchForm">
            <InputGroup className="mb-6">
              <Form.Control
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Text id="basic-addon2">
                <box-icon name="search" color="#F8F9FA"></box-icon>
              </InputGroup.Text>
            </InputGroup>
          </Form>
          <Nav className="me-auto scrollNav" navbarScroll>

            {user ? ( 
              <NavDropdown title={user.name} id="collasible-nav-dropdown">
                <NavDropdown.Item ><Link to="/myAccount">My account</Link></NavDropdown.Item>
                <NavDropdown.Item ><Link to="/myOrders">My orders</Link></NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
            <NavDropdown title="Account" id="collasible-nav-dropdown">
              <NavDropdown.Item><Link to="/signIn">Sign In</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link to="/myOrders">My orders</Link></NavDropdown.Item>
            </NavDropdown>
            )} 

            <Nav.Item>
              <Link to="/Wishlist">
                <box-icon name="heart"></box-icon>
              </Link>
            </Nav.Item>

            <Nav.Item className="cartIconHolder">
              <Link to="/cart">
                <div className="icon-wrap cart-icon">
                  <div className="prod-cart-num">0</div>
                  <box-icon name="cart"></box-icon>
                </div>
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
