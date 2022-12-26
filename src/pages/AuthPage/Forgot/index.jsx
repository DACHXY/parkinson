import './index.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthInputBar } from '../../../components/Input';
import { jsonRequest } from '../../../axios';
import SubmitButtonLoading from '../../../components/Button';
import PopUp from '../../../components/PopUp';

function ForgotPage() {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [succeed, setSucceed] = useState(false);
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();

  const submitGate = () => {
    const emailRegex = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
    if (!emailRegex.test(email)) {
      setErrorMsg('電子郵件格式錯誤');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (submitGate()) {
      setSubmit(true);
      jsonRequest.get(`auth/change/password?email=${email}`)
        .then((res) => {
          if (res.status === 200) {
            setSucceed(true);
            setSubmit(false);
          }
        }).catch((err) => {
          setSubmit(false);
          setErrorMsg('與伺服器連線失敗');
        });
    }
  };

  return (
    <>
      {
        errorMsg && (
          <PopUp className="popup-frame-button-only">
            <h1 style={{ color: '#fa5c5c' }}>{errorMsg}</h1>
            <div className="pop-up-button-section">
              <button type="button" onClick={() => { setErrorMsg(''); }} className="pop-up-button">好的</button>
            </div>
          </PopUp>
        )
      }
      {
        succeed && (
          <PopUp className="popup-frame-button-only">
            <h1>驗證信已發送</h1>
            <div className="pop-up-button-section">
              <button type="button" onClick={() => { navigate('/signin'); }} className="pop-up-button">好的</button>
            </div>
          </PopUp>
        )
      }
      <div className="page-frame dashboard-frame">
        <h1 className="page-title">忘記密碼</h1>
        <AuthInputBar text="電子郵件" setState={[email, setEmail]} />
        <SubmitButtonLoading disabled={submit} onClick={handleSubmit} type="submit">發送驗證電子郵件</SubmitButtonLoading>
      </div>

    </>

  );
}

export default ForgotPage;
