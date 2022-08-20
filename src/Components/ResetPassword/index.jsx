import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import '../SignIn/index.css';
import Header from '../Header';
import MainFooter from '../Footer';

const  ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [ error, setError] = useState('');
    const [ success, setSuccess] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const Update = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/reset-password/${token}`
          , { newPassword });
          navigate("/signIn");
        } catch ({ response: { data: { message: msg } } }) {
          setError(msg);
        }
      };
  return (
    <><Header /><div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">{t("Reset Password")}</h3>
          <div className="form-group mt-3">
            <label>{t("Email-address")}</label>
            <input type="email" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control mt-1" />
          </div>
          {error && <div>{error}</div>}
          <div className="d-grid gap-2 mt-3 sec-password">
            <p className="forgot-password text-right mt-2">
              <Link to="/">Back to Sign In</Link> OR <Link to="/forgetPassword">{t("Forget Password")}</Link>
            </p>
          </div>
          {success && <div className="alert alert-success">{success}</div>}
          <div className="d-grid gap-2 mt-3">
            <button onClick={(e) => Update(e)} className="btn btn-primary">{t("Update Password")}</button>
          </div>
        </div>
      </form>
    </div><MainFooter /></>
  )
}

export default ResetPassword;
