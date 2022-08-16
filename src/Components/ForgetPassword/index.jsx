import axios from 'axios';
import React, { useState } from 'react'
import { useTranslation } from "react-i18next";

const  ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [ error, setError] = useState('');
    const [ success, setSuccess] = useState('');
    const { t } = useTranslation();

    const Reset = async (e) => {
        e.preventDefault();
        try {
          const { data: { message: verifyMessage } } = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/forget-password`
          , { email });
          setSuccess(verifyMessage);
        } catch ({ response: { data: { message: msg } } }) {
          setError(msg);
        }
      };
  return (
<div className="Auth-form-container">
<form className="Auth-form">
  <div className="Auth-form-content">
    <h3 className="Auth-form-title">{t("Reset Password")}</h3>
    <div className="form-group mt-3">
      <label>{t("Email-address")}</label>
      <input type="email" value={email} className="form-control mt-1" onChange={(e) => setEmail(e.target.value)} />
    </div>
    {error && <div>{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
    <div className="d-grid gap-2 mt-3">
      <button onClick={(e) => Reset(e) }  className="btn btn-primary">{t("Reset Password")}</button>
    </div>
  </div>
</form>
</div> 
  )
}

export default ForgetPassword;
