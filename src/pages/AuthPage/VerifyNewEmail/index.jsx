import './index.scss';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { jsonRequest } from '../../../axios';
import {
  setIsLogin, setUser,
} from '../../../stores/authSlice';

function verifyScema(verifyState) {
  switch (verifyState) {
    case (200):
      return <h1 className="page-title">電子郵箱驗證成功! 將在 5 秒後導向登入畫面</h1>;
    case (498):
      return <h1 className="page-title">電子郵箱驗證失敗 時間已失效! 將在 5 秒後導向登入畫面</h1>;
    case (404):
      return <h1 className="page-title">電子郵箱驗證失敗 此驗證連結已失效! 將在 5 秒後導向登入畫面</h1>;
    default:
      return <h1 className="page-title">驗證中</h1>;
  }
}
function VerifyNewEmailPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('token');
  const UserId = searchParams.get('user_id');
  const NewEmail = searchParams.get('new_email');
  const [verifyState, setVerifyState] = useState(0);
  const [ifVerifySent, setIfVerifySent] = useState(false);

  useEffect(() => {
    if (!ifVerifySent) {
      jsonRequest.get(`auth/verify_new_email?verify_token=${token}&user_id=${UserId}&new_email=${NewEmail}`)
        .then((res) => {
          setVerifyState(res.status);
          dispatch(setUser(res.data));
          dispatch(setIsLogin(true));
          setTimeout(() => {
            navigate('/signin');
          }, 5000);
        })
        .catch((err) => err.response && setVerifyState(err.response.status));
      setIfVerifySent(false);
    }
  }, []);

  return (
    <div className="page-frame dashboard-frame">
      {verifyScema(verifyState)}
    </div>
  );
}

export default VerifyNewEmailPage;
