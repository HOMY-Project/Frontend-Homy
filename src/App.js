import React from "react";
import { Routes, Route } from 'react-router-dom';
import { AddaddressForm, OrderStatus,SignIn, Signup, AddressInfo, Header, Footer, SubFooter  } from './Components';
import { Home, AboutUs, ProductDetails, AccountInformation } from './Pages';
import "./App.css";
import "antd/dist/antd.min.css";

import { Layout } from "antd";
const { Content } = Layout;

function App() {
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
                  <Route path="/myOrders" element={<OrderStatus />} />
                  <Route path="/myAccount" element={<AccountInformation />} />
                  <Route path="/addressInfo" element={<AddressInfo />} />
                  <Route path="/addAddress" element={<AddaddressForm />} />
                  <Route path="/api/v1/product/:productId" element={<ProductDetails /> } />
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
