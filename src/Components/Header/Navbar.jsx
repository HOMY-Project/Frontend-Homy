import React from "react";
import { Link } from "react-router-dom";
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
// import 'boxicons';

function MainNavbar() {
  return (
    <Navbar bg="light" expand="lg" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand href="#">
          <Link to="/">
            <img src={logo} alt="logo" className="logo-img" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
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
          <Nav className="d-flex" style={{ maxHeight: "100px" }} navbarScroll>
            <NavDropdown title="Account" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/signIn">Sign In</NavDropdown.Item>
              <NavDropdown.Item href="/myOrders">My orders</NavDropdown.Item>
            </NavDropdown>

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
