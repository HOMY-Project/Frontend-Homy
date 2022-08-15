import React, { useState } from "react";
import i18n from '../src/translations/i18n';
import LocaleContext from '../src/translations/LocaleContext';
import {Helmet} from "react-helmet";
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AddaddressForm, OrderStatus,SignIn,Wishlist, Signup, PageNotFound, OrderConfirm, AddressInfo, Header, Footer, SubFooter, ChangePassword,Cart, Orders, SingleOrder, Shipment, ForgetPassword, ResetPassword  } from './Components';
import { Home, AboutUs, ProductDetails, AccountInformation } from './Pages';
import Loading from './Components/LoadingSpinner/index';
import "./App.css";
import "antd/dist/antd.min.css";

import { Layout } from "antd";
const { Content } = Layout;

function App() {
  const { user } = useSelector((state) => state.auth);
  const [locale, setLocale] = useState(i18n.language);
  i18n.on('languageChanged', (lng) => setLocale(i18n.language));

  return (
    <div className="App">
      <ThemeProvider dir={locale === 'en' ? 'ltr' : 'rtl'}>
        <LocaleContext.Provider value={{locale, setLocale}}>
          <React.Suspense fallback={ <Loading />} >
          <Helmet htmlAttributes={{
              lang: locale,
              dir: locale === 'en' ? 'ltr' : 'rtl'
            }} />
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
                      <Route path="/wishlist" element={<Wishlist /> } />
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
          </React.Suspense>
        </LocaleContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
