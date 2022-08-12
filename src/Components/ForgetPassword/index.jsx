import axios from 'axios';
import React, { useState } from 'react'

const  ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [ error, setError] = useState('');
    const [ success, setSuccess] = useState('');
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
    <div> 
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {error && <div>{error}</div>}
      <button onClick={(e) => Reset(e) }>Reset Password</button>
      {success && <div className="alert alert-success">{success}</div>}
    </div>
  )
}

export default ForgetPassword;
