import React from "react";
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AddaddressForm, OrderStatus,SignIn, Signup, PageNotFound, OrderConfirm, AddressInfo, Header, Footer, SubFooter, ChangePassword,Cart, Orders, SingleOrder, Shipment, ForgetPassword, ResetPassword  } from './Components';
import { Home, AboutUs, ProductDetails, AccountInformation } from './Pages';
import "./App.css";
import "antd/dist/antd.min.css";

import { Layout } from "antd";
const { Content } = Layout;

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="App">
        <Layout className="layout">
            <Header />
            <Content>
            <div className="site-layout-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/aboutus" element={<AboutUs />} />
                  <Route path="/signIn" element={<SignIn />} />
                  <Route path="/signUp" element={<Signup />} />
                  <Route path="/myOrders" element={!user ? <OrderStatus /> : <Orders />} />
                  <Route path="/myAccount" element={<AccountInformation />} />
                  <Route path="/addressInfo" element={<AddressInfo />} />
                  <Route path="/addAddress" element={<AddaddressForm />} />
                  <Route path="/changePassword" element={<ChangePassword />} />
                  <Route path="/singleOrder" element={<SingleOrder />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/order-confirm" element={<OrderConfirm />} />
                  <Route path="/shipment" element={<Shipment />} />
                  <Route path="/forgetPassword" element={<ForgetPassword />} />
                  <Route path="/resetPassword/:token" element={<ResetPassword />} />
                  <Route path="/api/v1/product/:productId" element={<ProductDetails /> } />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
            </div>
            </Content>
            <Footer />
            <SubFooter />
        </Layout>
    </div>
  );
}

export default App;
