
import React, { useState } from "react"
import {
  message, notification,
} from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { CheckCircleTwoTone } from '@ant-design/icons';
import Header from '../Header';
import MainFooter from '../Footer';

import '../SignIn/index.css';

 const ChangePassword = () => {
  const [newPassword, setnewPassword] = useState('');
  const [oldPassword, setoldPassword] = useState('');
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const userId = user.id;

  const changePass = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/${userId}/change-password`
      , { newPassword, oldPassword }, { headers: { token: `Bearer ${token}` } });

      notification.open({
        message: 'Your new password has been changed successfully',
        description: {data},
        icon: (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ),
      });
      navigate("/signIn");
    } catch ({ response: { data: { message: msg } } }) {
      message.error(msg);
    }
  };

  return (
    <><Header /><div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Change Password</h3>
          <div className="form-group mt-3">
            <label>Old Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter your old password"
              value={oldPassword}
              onChange={(e) => setoldPassword(e.target.value)}
              required />
          </div>
          <div className="form-group mt-3">
            <label>New Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
              required />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#0F6AD0' }} onClick={(e) => changePass(e)}>
              Save
            </button>
          </div>
        </div>
      </form>
    </div><MainFooter /></>
  )
}
export default ChangePassword;