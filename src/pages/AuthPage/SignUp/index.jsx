import React, { useState } from 'react';
import './index.scss';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { formDataRequest } from '../../../axios';

import Header from '../../../components/Header';
import AuthInputBar from '../components/inputbar';

// dispatch
import {
  setIsLogin, setUsername, setUserId, setSessionToken,
} from '../../../stores/authSlice';

function SignUpPage() {
  const [account, setAccount] = useState();
  const [password, setPassword] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [passwordAgain, setPasswordAgain] = useState();
  const [errMessage, setErrMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (password === passwordAgain) {
      setErrMessage('');
      const formData = new FormData();
      formData.append('username', account);
      formData.append('password', password);
      formDataRequest.post('/auth/signup', formData)
        .then((res) => {
          console.log(res);
          dispatch(setSessionToken(res.data.access_token));
          dispatch(setUsername(account));
          dispatch(setIsLogin(true));
          navigate(searchParams.get('next') ? searchParams.get('next') : '/');
        })
        .catch((err) => {
          setErrMessage(err.response.data.detail);
        });
    } else {
      setErrMessage('兩次密碼不相符');
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="panel">
          <h1 style={{ color: '#3f3f3f' }}>註冊帳號</h1>
          <section className="auth-information-section">
            <div className="error-message">{errMessage}</div>
            <Link className="alternative-link" to="/signin?next=/upload">已經擁有帳號</Link>
            <AuthInputBar text="帳號" type="text" setState={[account, setAccount]} />
            <AuthInputBar text="密碼" type="password" setState={[password, setPassword]} />
            <AuthInputBar text="確認密碼" type="password" setState={[passwordAgain, setPasswordAgain]} />
          </section>
          <button className="submit-button" type="submit" onClick={handleSubmit}>註冊</button>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
