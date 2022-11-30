/* eslint-disable react/button-has-type */
import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

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
          <MenuButtonLogOut>
            <button className="btn-no-style"><p className="log-out-text">登出</p></button>
          </MenuButtonLogOut>
        </div>
      </div>
    </div>
  );
}

export default Header;
