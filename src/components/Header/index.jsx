import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { signOut } from '../../stores/authSlice';

function MenuButton({
  text, url, onClick, target,
}) {
  return (
    <Link onClick={onClick} target={target} to={url} className="menu-button">
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
  const [cookie, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

  const HeaderLeftItems = [
    {
      text: '首頁', url: '/home', target: '', key: 0,
    },
    {
      text: '檢測', url: '/upload', target: '', key: 1,
    },
    {
      text: '紀錄', url: '/history', target: '', key: 2,
    },
  ];

  const handleLogout = () => {
    removeCookie('access_token', { path: '/' });
    removeCookie('refresh_token', { path: '/' });
    dispatch(signOut());
  };

  return (
    <div className="header-placeholder">
      <div className="header-container">
        <div className="header-container-left">
          {HeaderLeftItems.map(
            (item) => (
              <MenuButton
                key={item.key}
                url={item.url}
                text={item.text}
                target={item.target}
              />
            ),
          )}
          <a
            href="https://zh.wikipedia.org/wiki/%E5%B8%95%E9%87%91%E6%A3%AE%E6%B0%8F%E7%97%87"
            target="_blank"
            rel="noreferrer"
            className="menu-button"
          >
            <span className="menu-button-text">
              關於
            </span>
          </a>
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
