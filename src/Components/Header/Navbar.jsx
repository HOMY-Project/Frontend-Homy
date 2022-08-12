import React,{useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser, setSearchWord } from "../../Redux/features/authSlice";
import { clearCart } from "../../Redux/features/cartSlice";
import { message, Badge, AutoComplete, Input } from "antd";
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
  const { user, allProducts } = useSelector((state) => state.auth);
  const { quantity } = useSelector((state) => state.cart)
  console.log(quantity, "quantity");
  const [options, setOptions] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSelect = (data) => {
     const proId = allProducts.filter((item) => item.name === data)[0].id
      navigate(`/api/v1/product/${proId}`);
  };


  const onSearch = (searchText) => {
    dispatch(setSearchWord(searchText))
    setOptions(
      !searchText ? [] : allProducts?.map(product => ({
        value: product.name,
      }
    ))
    );
  };

  const logout = () => {
    dispatch(clearUser());
    dispatch(clearCart());
    message.success("Logged out successfully");
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg" className="custom-navbar" collapseOnSelect>
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">
            <img src={logo} alt="logo" className="logo-img" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Form className="me-auto my-2 my-lg-0 searchForm">
            <InputGroup className="mb-6">
              <AutoComplete
                options={options}
                style={{
                  width: '90%',
                }}
                onSelect={onSelect}
                onSearch={onSearch}
              >
                 <Input.Search size="large" placeholder="Search" style={{ color: "#F8F9FA !important" }}enterButton />
                </AutoComplete>
            </InputGroup>
          </Form>
          <Nav className="me-auto scrollNav" navbarScroll>
            {user ? (
              <NavDropdown title={user.name} id="collasible-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/myAccount">My account</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/addressInfo">My address</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/myOrders">My orders</Link>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Account" id="collasible-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/signIn">Sign In</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/myOrders">My orders</Link>
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Nav.Item>
              <Link to="/Wishlist">
                <box-icon name="heart"></box-icon>
              </Link>
            </Nav.Item>

            <Nav.Item className="cartIconHolder">
              <Link to="/cart">
                <Badge count={quantity}>
                  <box-icon name="cart"></box-icon>
                </Badge>
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
