import React, { useState } from 'react';
import './index.scss';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { formDataRequest } from '../../../axios';

import Header from '../../../components/Header';
import AuthInputBar from '../components/inputbar';
import SubmitButtonLoading from '../../../components/Button';

// dispatch
import {
  setIsLogin, setUsername, setUserId, setSessionToken,
} from '../../../stores/authSlice';

function SignUpPage() {
  const passwordLengthLimit = 6;
  const usernameLengthLimit = 4;
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [submitDisable, setSubmitDisable] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [passwordAgain, setPasswordAgain] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitGate = () => {
    if (!account) {
      setErrMessage('帳號不得為空');
      return false;
    }
    if (!password) {
      setErrMessage('密碼不得為空');
      return false;
    }
    if (password !== passwordAgain) {
      setErrMessage('兩次密碼不相符');
      return false;
    }
    if (password.length < passwordLengthLimit) {
      setErrMessage(`密碼長度至少大於 ${passwordLengthLimit}`);
      return false;
    }
    if (account.length < usernameLengthLimit) {
      setErrMessage(`帳號長度至少大於 ${usernameLengthLimit}`);
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
      formDataRequest.post('/auth/signup', formData)
        .then((res) => {
          dispatch(setSessionToken(res.data.access_token));
          dispatch(setUsername(account));
          dispatch(setIsLogin(true));
          navigate(searchParams.get('next') ? searchParams.get('next') : '/');
        })
        .catch((err) => {
          if (err.response?.data.detail) {
            setErrMessage(err.response.data.detail);
          }
          if (err.message.includes('timeout')) {
            setErrMessage('伺服器未回應');
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
          <h1 style={{ color: '#3f3f3f' }}>註冊帳號</h1>
          <section className="auth-information-section">
            <div className={`error-message ${errMessage && 'error-message-animation-start'}`}>{errMessage}</div>
            <Link className="alternative-link" to="/signin?next=/upload">已經擁有帳號 ?</Link>
            <AuthInputBar text="帳號" type="text" setState={[account, setAccount]} />
            <AuthInputBar text="密碼" type="password" setState={[password, setPassword]} />
            <AuthInputBar text="確認密碼" type="password" setState={[passwordAgain, setPasswordAgain]} />
          </section>
          <SubmitButtonLoading disabled={submitDisable} onClick={handleSubmit}>
            註冊
          </SubmitButtonLoading>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
