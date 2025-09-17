import './index.scss';

import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthInputBar } from '../../../components/Input';
import { formDataRequest } from '../../../axios';
import SubmitButtonLoading from '../../../components/Button';
import PopUp from '../../../components/PopUp';
import { passwordLengthLimit } from '../../../constant';

function ChangePasswordPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [succeed, setSucceed] = useState(false);
  const [changePasswordSubmit, setChangePasswordSubmit] = useState(false);
  const navigate = useNavigate();

  const submitGate = () => {
    if (!password) {
      setErrorMsg('密碼不得為空');
      return false;
    }
    if (password !== passwordAgain) {
      setErrorMsg('兩次密碼不相符');
      return false;
    }
    if (password.length < passwordLengthLimit) {
      setErrorMsg(`密碼長度至少大於 ${passwordLengthLimit}`);
      return false;
    }
    return true;
  };

  const handleSuccuss = async (res) => {
    if (res.status === 200) {
      setSucceed(true);
    }
    setChangePasswordSubmit(false);
  };

  const handleSubmit = () => {
    setChangePasswordSubmit(true);
    if (submitGate()) {
      const formData = new FormData();
      formData.append('password', password);
      formDataRequest.post(`auth/verify/change?verify_token=${token}&email=${email}`, formData)
        .then(handleSuccuss)
        .catch((err) => {
          setChangePasswordSubmit(false);
          if (err.response.status === 403) {
            setErrorMsg('此驗證連結已失效');
          } else if (err.response.status === 404) {
            setErrorMsg('此驗證連結已失效');
            if (err.response.data.detail === 'email not exist') {
              setErrorMsg('此電子信箱未註冊');
            }
          }
        });
    }
  };

  return (
    <div>
      {
        errorMsg && (
          <PopUp className="popup-frame-button-only">
            <h1 style={{ color: '#fa5c5c' }}>{errorMsg}</h1>
            <div className="pop-up-button-section">
              <button type="button" onClick={() => { setErrorMsg(''); }} className="pop-up-button">好的</button>
              <button type="button" onClick={() => { navigate('/signin'); }} className="pop-up-button">返回登入</button>
            </div>
          </PopUp>
        )
      }
      {
        succeed && (
          <PopUp className="popup-frame-button-only">
            <h1>密碼已成功更改，請重新登入</h1>
            <div className="pop-up-button-section">
              <button type="button" onClick={() => { navigate('/signin'); }} className="pop-up-button">好的</button>
            </div>
          </PopUp>
        )
      }
      <div className="page-frame dashboard-frame">
        <h1 className="page-title">請輸入新密碼</h1>
        <AuthInputBar type="password" text="新密碼" setState={[password, setPassword]} />
        <AuthInputBar type="password" text="確認密碼" setState={[passwordAgain, setPasswordAgain]} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SubmitButtonLoading disabled={changePasswordSubmit} onClick={handleSubmit} type="submit">更改密碼</SubmitButtonLoading>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
