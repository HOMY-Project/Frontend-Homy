import React, { useState } from "react";
import i18n from '../src/translations/i18n';
import LocaleContext from '../src/translations/LocaleContext';
import { Helmet } from "react-helmet";
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AddaddressForm, OrderStatus, SignIn, Wishlist, 
  Signup, Category, PageNotFound, OrderConfirm, AddressInfo, 
  ChangePassword, Cart, Orders, SingleOrder, Shipment, ForgetPassword, 
  ResetPassword } from './Components';
import { Home, AboutUs, ProductDetails, AccountInformation } from './Pages';
import Loading from './Components/LoadingSpinner/index';
import {
  Dashboard,
  Brands,
  Orders as OrdersList,
  Products,
  Users,
  Banners,
  Roles,
  Rtl,
  Profile,
  Categories
} from './HomyDashboard/Dashboard-Pages';
import Main from './HomyDashboard/components/layout/Main';
import "./HomyDashboard/assets/styles/main.css";
import "./HomyDashboard/assets/styles/responsive.css";
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
        <LocaleContext.Provider value={{ locale, setLocale }}>
          <React.Suspense fallback={<Loading />} >
            <Helmet htmlAttributes={{
              lang: locale,
              dir: locale === 'en' ? 'ltr' : 'rtl'
            }} />

            <Layout >
              <Content>
                <Routes>
                {user && user.role !== 1 && ( 
                <Route exact path='/' element={<Main/>}>
                    <Route  path='/' element={<Dashboard/>}/>
                    <Route  path="users" element={<Users />} />
                    <Route  path="orders" element={<OrdersList />} />
                    <Route  path="categories" element={<Categories />} />
                    <Route  path="products" element={<Products />} />
                    <Route  path="brands" element={<Brands />} />
                    <Route  path="roles" element={<Roles />} />
                    <Route  path="banners" element={<Banners />} />
                    <Route  path="rtl" element={<Rtl />} />
                    <Route  path="profile" element={<Profile />} />
                    <Route from="*" to="/dashboard" />
                </Route>
                )}
                {user && user.role === 1 && (
                <>
                <Route exact path="/" element={<Home />} />
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
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/forgetPassword" element={<ForgetPassword />} />
                <Route path="/resetPassword/:token" element={<ResetPassword />} />
                <Route path="/api/v1/product/:productId" element={<ProductDetails />} />
                <Route path="/api/products/:itemId" element={<Category />} />
                <Route exact path="*" element={<PageNotFound />} />
                </>
                  )}
            </Routes>
              </Content>
            </Layout>

          </React.Suspense>
        </LocaleContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
