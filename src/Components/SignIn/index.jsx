
import React, { useState, useEffect } from "react"
import {
  message, notification,
} from 'antd';

import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setToken, loginStart, loginFailure, setPermission } from '../../Redux/features/authSlice';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { useTranslation } from "react-i18next";
import Header from '../Header';
import MainFooter from '../Footer';
import './index.css';

 const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, user } = useSelector((state) => state.auth);
  const { t  } = useTranslation();

  const signIn = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const { data: { data, token } } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/signin`
      , { email, password });
      dispatch(setUser(data));
      dispatch(setToken(token));
      notification.open({
        message: 'Welcome back',
        description: `happy shopping ${data.name}`,
        icon: (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ),
      });
      
      // if(data.role) {
        const { data: { data: permissionData } } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/permission-role?roleId=${data.role}`);
        console.log(permissionData, 'permission-role');
        dispatch(setPermission(permissionData));
      // }
      navigate('/')
    } catch ({ response: { data: { message: msg } } }) {
      message.error(msg);
      dispatch(loginFailure());
    }
  };
  
  return (
    <><Header /><div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">{t('signIn')}</h3>
          <div className="form-group mt-3">
            <label>{t('Email-address')}</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group mt-3">
            <label>{t('Password')}</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="d-grid gap-2 mt-3 sec-password">
            <Form.Group className="" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label={t("Save Password")} />
            </Form.Group>
            <p className="forgot-password text-right mt-2">
              <Link to="/forgetPassword">{t('Forgot password')}</Link>
            </p>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#0F6AD0' }} onClick={(e) => signIn(e)}>
              {t('signIn')}
            </button>
          </div>
          <div className="d-grid gap-2 mt-3">
            <hr />
            <p className=""> {t('NewCustomer')}?</p>
            <Link to="/signUp" className="new-customer-a">
              <button type="submit" className="btn btn-primary" disabled={isFetching} style={{ backgroundColor: '#fff', color: '#0F6AD0', width: '100%' }}>
                {t('Create An Account')}
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div><MainFooter /></>
  )
}
export default SignIn;