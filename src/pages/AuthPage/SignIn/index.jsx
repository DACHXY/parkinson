import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import './index.scss';
import { useCookies } from 'react-cookie';

import Header from '../../../components/Header';
import { AuthInputBar } from '../../../components/Input';
import SubmitButtonLoading from '../../../components/Button';

import { setIsLogin, setSessionToken, setUser } from '../../../stores/authSlice';
import { formDataRequestNoAuth } from '../../../axios';

function SignInPage() {
  const [cookie, setCookie] = useCookies();
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
      formDataRequestNoAuth.post('/auth/jwt/token', formData)
        .then((res) => {
          dispatch(setUser(res.data));
          dispatch(setIsLogin(true));
          setCookie('access_token', res.data.access_token, { path: '/' });
          setCookie('refresh_token', res.data.refresh_token, { path: '/' });
          navigate(searchParams.get('next') ? searchParams.get('next') : '/');
        })
        .catch((err) => {
          if (err.message.includes('timeout')) {
            setErrMessage('伺服器未回應');
          }
          if (err.response.status === 401) {
            setErrMessage('帳號或密碼錯誤');
          }
          if (err.response.data.detail.includes('email send')) {
            setErrMessage('郵箱未驗證，已重新寄出驗證信');
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
            <AuthInputBar placeHolder="用戶名 或 電子郵件" text="帳號" type="text" setState={[account, setAccount]} />
            <AuthInputBar text="密碼" type="password" setState={[password, setPassword]} />
            <div className="flex-row" style={{ gap: 40 }}>
              <Link className="alternative-link" to="/signup?next=/upload">還沒有帳號?</Link>
              <Link className="alternative-link" to="/forget">忘記密碼</Link>
            </div>
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
