import React from 'react';
import './index.scss';

function AuthInputBar({ text, type, setState }) {
  const [value, setValue] = setState;
  const hanldeOnChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="auth-input-bar-frame">
      <span className="auth-input-bar-text">{text}</span>
      <input onChange={hanldeOnChange} value={value} className="auth-input-bar" type={type} />
    </div>
  );
}

export default AuthInputBar;
