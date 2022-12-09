import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import './index.scss';

import Header from '../../../components/Header';
import AuthInputBar from '../components/inputbar';

import { setIsLogin, setUsername, setSessionToken } from '../../../stores/authSlice';
import { formDataRequest } from '../../../axios';

function SignInPage() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrMessage('');

    // test
    dispatch(setIsLogin(true));

    // const formData = new FormData();
    // formData.append('username', account);
    // formData.append('password', password);
    // formDataRequest.post('/auth/jwt/token', formData)
    //   .then((res) => {
    //     dispatch(setSessionToken(res.data.access_token));
    //     dispatch(setIsLogin(true));
    //     navigate(searchParams.get('next') ? searchParams.get('next') : '/');
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setErrMessage('帳號或密碼錯誤');
    //   });
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="panel">
          <h1 style={{ color: '#3f3f3f' }}>登入帳號</h1>
          <section className="auth-information-section">
            <div className="error-message">{errMessage}</div>
            <Link className="alternative-link" to="/signup?next=/upload">還沒有帳號?</Link>
            <AuthInputBar text="帳號" type="text" setState={[account, setAccount]} />
            <AuthInputBar text="密碼" type="password" setState={[password, setPassword]} />
          </section>
          <button className="submit-button" type="submit" onClick={handleSubmit}>登入</button>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
