import './index.scss';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { jsonRequest } from '../../../axios';
import {
  setUsername, setSessionToken, setIsLogin,
} from '../../../stores/authSlice';

function verifyScema(verifyState) {
  switch (verifyState) {
    case (200):
      return <h1>電子郵箱驗證成功!</h1>;
    case (498):
      return <h1>電子郵箱驗證失敗 時間已失效!</h1>;
    default:
      return <h1>驗證中</h1>;
  }
}
function VerifyPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('token');
  const UserId = searchParams.get('user_id');
  const sessionToken = useSelector((store) => store.auth.sessionToken);
  const [verifyState, setVerifyState] = useState(0);

  useEffect(() => {
    jsonRequest.get(`auth/verify?verify_token=${token}&user_id=${UserId}`)
      .then((res) => {
        setVerifyState(res.status);
        console.log(res.data.access_token);
        dispatch(setSessionToken(res.data.access_token));
        dispatch(setUsername(res.data.username));
        dispatch(setIsLogin(true));
      })
      .catch((err) => err.response && setVerifyState(err.response.status));
  }, []);

  return (
    <div>
      {verifyScema(verifyState)}
    </div>
  );
}

export default VerifyPage;
