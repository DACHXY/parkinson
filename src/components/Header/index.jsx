import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../stores/authSlice';

function MenuButton({ text, url, onClick }) {
  return (
    <Link onClick={onClick} to={url} className="menu-button">
      <span className="menu-button-text">
        {text}
      </span>
    </Link>
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

  const HeaderLeftItems = [
    { text: '首頁', url: '/home', key: 0 },
    { text: '檢測', url: '/upload', key: 1 },
    { text: '紀錄', url: '/history', key: 2 },
    { text: '關於', url: '/', key: 3 },
  ];

  const handleLogout = () => {
    dispatch(signOut());
  };

  return (
    <div className="header-placeholder">
      <div className="header-container">
        <div className="header-container-left">
          {HeaderLeftItems.map(
            (item) => <MenuButton key={item.key} url={item.url} text={item.text} />,
          )}
        </div>
        <div className="header-container-mid"> </div>
        <div className="header-container-right">
          {
            auth.isLogin ? (
              <>
                <MenuButton url="/dashboard" text={auth.username} />
                <MenuButtonLogOut>
                  <Link onClick={handleLogout} to="/signin" className="log-out-text">登出</Link>
                </MenuButtonLogOut>
              </>
            )
              : (
                <MenuButton url="/signin" text="登入" />
              )
          }
        </div>
      </div>
    </div>
  );
}

export default Header;
