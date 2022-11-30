import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setIsLogin } from '../../stores/authSlice';

function MenuButton({ children }) {
  return (
    <div className="menu-button">
      {children}
    </div>
  );
}

function MenuButtonLogOut({ children }) {
  return (
    <div className="menu-button-logout">
      {children}
    </div>
  );
}

function Header() {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

  const handleLogout = () => {
    dispatch(setIsLogin(false));
  };

  return (
    <div className="header-placeholder">
      <div className="header-container">
        <div className="header-container-left">
          <MenuButton>
            <Link to="/" className="menu-button-text">首頁</Link>
          </MenuButton>
          <MenuButton>
            <Link to="/upload" className="menu-button-text">檢測</Link>
          </MenuButton>
          <MenuButton>
            <Link to="/" className="menu-button-text">紀錄</Link>
          </MenuButton>
          <MenuButton>
            <Link to="/" className="menu-button-text">關於</Link>
          </MenuButton>
        </div>
        <div className="header-container-mid"> </div>
        <div className="header-container-right">
          {
            auth.isLogin ? (
              <MenuButtonLogOut>
                <button onClick={handleLogout} type="button" className="btn-no-style log-out-text">登出</button>
              </MenuButtonLogOut>
            )
              : (
                <MenuButton>
                  <Link to="/signin" className="menu-button-text">登入</Link>
                </MenuButton>
              )
        }
        </div>
      </div>
    </div>
  );
}

export default Header;
