import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const  ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [ error, setError] = useState('');
    const [ success, setSuccess] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();
    const Update = async (e) => {
        e.preventDefault();
        try {
          const { data: { message: verifyMessage } } = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/reset-password/${token}`
          , { newPassword });
          navigate("/signIn");
        } catch ({ response: { data: { message: msg } } }) {
          setError(msg);
        }
      };
  return (
    <div> 
      <input type="email" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        {error && <div>{error}</div>}
      <button onClick={(e) => Update(e) }>Update Password</button>
      {success && <div className="alert alert-success">{success}</div>}
      <Link to="/">Back to Sign In</Link> OR <Link to="/forgetPassword">Forget Password</Link>
    </div>
  )
}

export default ResetPassword;
