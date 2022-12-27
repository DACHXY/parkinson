import './index.scss';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { TitleInputbar } from '../../components/Input';
import SubmitButtonLoading from '../../components/Button';
import { formDataRequest, jsonRequest } from '../../axios';
import PopUp from '../../components/PopUp';
import { signOut } from '../../stores/authSlice';
import { usernameLengthLimit } from '../../constant';

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies();
  const userInfo = useSelector((store) => store.auth);
  const [username, setUsername] = useState(userInfo.username);
  const [modifySubmit, setModifySubmit] = useState(false);
  const [succeedPopup, setSucceedPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [changePassword, setChangePassword] = useState(false);
  const [handleDeleteUserCheck, setHandleDeleteUserCheck] = useState(false);
  const [email, setEmail] = useState(userInfo.email);

  const submitGate = () => {
    const regex = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
    if (!regex.test(email)) {
      setErrorMsg('電子郵箱格式不正確');
      return false;
    }
    if (username.length < usernameLengthLimit) {
      setErrorMsg(`帳號長度至少大於 ${usernameLengthLimit}`);
      return false;
    }
    return true;
  };

  const handleModifyUserData = () => {
    if (submitGate()) {
      setModifySubmit(true);
      const formData = new FormData();
      const information = {
        username,
        email,
      };
      formData.append('information', JSON.stringify(information));
      formDataRequest.post('user/user_personal', formData, {
        headers: {
          'authorization': `Bearer ${userInfo.sessionToken}`,
        },
      }).then((res) => {
        if (res.status === 201) {
          setSucceedPopup(true);
        }
        setModifySubmit(false);
      }).catch((err) => {
        setModifySubmit(false);
        const error = err.response.data.detail.toString();
        if (error === 'username exist') { setErrorMsg('使用者名稱已存在'); }
      });
    }
  };

  const handleChangePassword = () => {
    jsonRequest.get(`auth/change/password?email=${userInfo.email}`, {
      headers: {
        'authorization': `Bearer ${userInfo.sessionToken}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        setChangePassword(true);
      }
    });
  };

  const handleDeleteUser = () => {
    setHandleDeleteUserCheck(false);
    jsonRequest.delete('user/user_delete', {
      headers: {
        'authorization': `Bearer ${userInfo.sessionToken}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        dispatch(signOut());
        navigate('/signin');
      }
    }).catch((err) => {
      setErrorMsg('刪除使用者失敗');
    });
  };

  return (
    <div>
      {
        handleDeleteUserCheck && (
          <PopUp className="popup-frame-button-only">
            <h1 style={{ color: '#fa5c5c' }}>警告</h1>
            <span>確認要刪除此帳戶嗎?</span>
            <div className="pop-up-button-section">
              <button style={{ color: '#fa5c5c' }} type="button" onClick={handleDeleteUser} className="pop-up-button">確定</button>
              <button type="button" onClick={() => { setHandleDeleteUserCheck(false); }} className="pop-up-button">取消</button>
            </div>
          </PopUp>
        )
      }
      {
        changePassword && (
          <PopUp className="popup-frame-button-only">
            <h1>驗證信已寄出</h1>
            <div className="pop-up-button-section">
              <button
                type="button"
                onClick={() => {
                  setChangePassword(false);
                  removeCookie('access_token', { path: '/' });
                  removeCookie('refresh_token', { path: '/' });
                  dispatch(signOut());
                  navigate('/signin');
                }}
                className="pop-up-button"
              >
                好的

              </button>
            </div>
          </PopUp>
        )
      }
      {
        errorMsg && (
          <PopUp className="popup-frame-button-only">
            <h1>發生錯誤</h1>
            <span style={{ color: '#fa5c5c' }}>{errorMsg}</span>
            <div className="pop-up-button-section">
              <button type="button" onClick={() => { setErrorMsg(''); }} className="pop-up-button">好的</button>
            </div>
          </PopUp>
        )
      }
      {succeedPopup && (
        <PopUp className="popup-frame-button-only">
          <h1>修改成功!</h1>
          <span>如果有修改電子郵箱，請點選驗證信中的鏈接，以完成更改</span>
          <span>電子信箱:</span>
          <span>{email}</span>
          <div className="pop-up-button-section">
            <button type="button" onClick={() => { setSucceedPopup(false); window.location.reload(); }} className="pop-up-button">好的</button>
          </div>
        </PopUp>
      )}
      <Header />
      <div className="page-frame dashboard-frame">
        <h1 className="page-title">個人頁面</h1>
        <section className="dashboard-content">
          <div className="dashboard-content-left">
            <section>
              <TitleInputbar className="dashboard-content-input" type="text" text="電子郵件" setState={[email, setEmail]} />
              <TitleInputbar className="dashboard-content-input" type="text" text="使用者名稱" setState={[username, setUsername]} />
            </section>
            <div className="flex-row" style={{ justifyContent: 'center', width: '100%' }}>
              <SubmitButtonLoading
                disabled={modifySubmit}
                onClick={handleModifyUserData}
              >
                修改資料
              </SubmitButtonLoading>
            </div>
          </div>
          <div className="dashboard-content-right">
            <div className="flex-col" style={{ justifyContent: 'center', width: '100%', gap: '16px' }}>
              <SubmitButtonLoading
                onClick={handleChangePassword}
              >
                更改密碼
              </SubmitButtonLoading>
              <SubmitButtonLoading
                disabled={modifySubmit}
                onClick={() => setHandleDeleteUserCheck(true)}
                style={{ color: '#fff', backgroundColor: '#fa5c5c' }}
              >
                刪除使用者
              </SubmitButtonLoading>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
