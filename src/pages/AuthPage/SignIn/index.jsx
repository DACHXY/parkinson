import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import './index.scss';

import Header from '../../../components/Header';
import AuthInputBar from '../components/inputbar';
import SubmitButtonLoading from '../../../components/Button';

import { setIsLogin, setUsername, setSessionToken } from '../../../stores/authSlice';
import { formDataRequest } from '../../../axios';

function SignInPage() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [submitDisable, setSubmitDisable] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState();

  const submitGate = () => {
    if (!account) {
      setErrMessage('帳號不得為空');
      return false;
    }
    if (!password) {
      setErrMessage('密碼不得為空');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (submitGate()) {
      setErrMessage('');
      setSubmitDisable(true);
      const formData = new FormData();
      formData.append('username', account);
      formData.append('password', password);
      formDataRequest.defaults.timeout = 2500;
      formDataRequest.post('/auth/jwt/token', formData)
        .then((res) => {
          dispatch(setSessionToken(res.data.access_token));
          dispatch(setIsLogin(true));
          navigate(searchParams.get('next') ? searchParams.get('next') : '/');
        })
        .catch((err) => {
          console.log(err);
          if (err.message.includes('timeout')) {
            setErrMessage('伺服器未回應');
          }
          if (err.message.includes('password')) {
            setErrMessage('帳號或密碼錯誤');
          }
          setSubmitDisable(false);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="panel">
          <h1 style={{ color: '#3f3f3f' }}>登入帳號</h1>
          <section className="auth-information-section">
            <div className={`error-message ${errMessage && 'error-message-animation-start'}`}>{errMessage}</div>
            <Link className="alternative-link" to="/signup?next=/upload">還沒有帳號?</Link>
            <AuthInputBar text="帳號" type="text" setState={[account, setAccount]} />
            <AuthInputBar text="密碼" type="password" setState={[password, setPassword]} />
          </section>
          <SubmitButtonLoading disabled={submitDisable} onClick={handleSubmit}>
            登入
          </SubmitButtonLoading>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
