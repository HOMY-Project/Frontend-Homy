import React, { useState, useContext } from "react";
import LocaleContext from '../../translations/LocaleContext';
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser, setSearchWord } from "../../Redux/features/authSlice";
import { clearCart, clearWishlist } from "../../Redux/features/cartSlice";
import { useTranslation } from "react-i18next";
import { message, Badge, AutoComplete, Input } from "antd";
import { Form,InputGroup, Container,  Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from "../../assets/logo.png";
import "./media.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

function MainNavbar() {
  const { user, allProducts } = useSelector((state) => state.auth);
  const { quantity } = useSelector((state) => state.cart);
  const [options, setOptions] = useState([]);
  const { t, i18n  } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);

  function changeLocale (l) {
    if (locale !== l) {
      i18n.changeLanguage(l);
    }
  }

  const onSelect = (data) => {
    const proId = allProducts.filter((item) => item.name === data)[0].id;
    navigate(`/api/v1/product/${proId}`);
  };
  const onSearch = (searchText) => {
    dispatch(setSearchWord(searchText));
    setOptions(
      !searchText
        ? []
        : allProducts?.map((product) => ({
            value: product.name,
          }))
    );
  };

  const logout = () => {
    dispatch(clearUser());
    dispatch(clearCart());
    // dispatch(clearWishlist())
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
                  width: "90%",
                }}
                onSelect={onSelect}
                onSearch={onSearch}
              >
                <Input.Search
                  size="large"
                  placeholder={t("searchPlaceholder")}
                  style={{ color: "#F8F9FA !important" }}
                  enterButton
                />
              </AutoComplete>
            </InputGroup>
          </Form>
          <Nav className={locale === 'en' ? 'ms-auto scrollNav' : 'me-auto scrollNav'} navbarScroll>
            {user ? (
              <NavDropdown title={user.name} id="collasible-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/myAccount">{t('myAccount')}</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/addressInfo">{t('myAddress')}</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/myOrders">{t('myOrders')}</Link>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>{t('logout')}</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title={t('myAccount')} id="collasible-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/signIn">{t('signIn')}</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/myOrders">{t('myOrders')}</Link>
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <NavDropdown title={locale === 'en' ? 'English' : 'العربية'} id="basic-nav-dropdown">
              <NavDropdown.Item href="#" onClick={() => changeLocale('en')}>English</NavDropdown.Item>
              <NavDropdown.Item href="#" onClick={() => changeLocale('ar')}>العربية</NavDropdown.Item>
            </NavDropdown>
          {/* <Button className="lang-btn" onClick={() => setLanguage(i18n.language === 'ar' ? 'en' : 'ar')}>
            {language === 'ar' ? 'En' : 'العربية'}
          </Button> */}
            <Nav.Item>
              <Link to="/wishlist">
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
