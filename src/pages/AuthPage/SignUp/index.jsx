import React, { useState } from 'react';
import './index.scss';
import { Link, useNavigation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { formDataRequestNoAuth } from '../../../axios';

import Header from '../../../components/Header';
import { AuthInputBar } from '../../../components/Input';
import SubmitButtonLoading from '../../../components/Button';
import PopUp from '../../../components/PopUp';
import { passwordLengthLimit, usernameLengthLimit } from '../../../constant';

// dispatch
import {
  setUser,
} from '../../../stores/authSlice';

function SignUpPage() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [submitDisable, setSubmitDisable] = useState(false);
  const [passwordAgain, setPasswordAgain] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleError = async (err) => {
    if (err.response?.data.detail) {
      setErrMessage(err.response.data.detail);
    }
    if (err.response?.data.detail.includes('user exist')) {
      setErrMessage('帳號已使用');
    }
    if (err.response?.data.detail.includes('email exist')) {
      setErrMessage('電子郵件已使用');
    }
    if (err.message.includes('timeout')) {
      setErrMessage('伺服器未回應');
    }
    setSubmitDisable(false);
  };

  const submitGate = () => {
    const regex = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
    if (!account) {
      setErrMessage('帳號不得為空');
      return false;
    }
    if (!email) {
      setErrMessage('電子郵件不得為空');
      return false;
    }
    if (!regex.test(email)) {
      setErrMessage('電子郵件格式錯誤 xxx@xxx.xxx');
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
      formData.append('email', email);
      formDataRequestNoAuth.post('/auth/signup', formData)
        .then((res) => {
          if (res.status === 201) {
            setEmailSent(true);
          }
        })
        .catch(handleError);
    }
  };

  return (
    <div>
      { emailSent
      && (
        <PopUp className="popup-frame-button-only">
          <h3>電子郵箱需要驗證</h3>
          <div>驗證信已寄出</div>
          <div className="pop-up-button-section">
            <Link to="/signin" className="pop-up-button">好的</Link>
          </div>
        </PopUp>
      )}
      <Header />
      <div className="container">
        <div className="panel">
          <h1 style={{ color: '#3f3f3f' }}>註冊帳號</h1>
          <section className="auth-information-section">
            <div className={`error-message ${errMessage && 'error-message-animation-start'}`}>{errMessage}</div>
            <AuthInputBar text="帳號" type="text" setState={[account, setAccount]} />
            <AuthInputBar text="電子郵箱" type="text" setState={[email, setEmail]} />
            <AuthInputBar text="密碼" type="password" setState={[password, setPassword]} />
            <AuthInputBar text="確認密碼" type="password" setState={[passwordAgain, setPasswordAgain]} />
            <Link className="alternative-link" to="/signin?next=/upload">已經擁有帳號 ?</Link>
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
