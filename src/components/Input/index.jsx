import './index.scss';
import React from 'react';

function Inputbar() {
  return (
    <div>Inputbar</div>
  );
}

export function TitleInputbar({
  text, type, setState, ref,
}) {
  const [value, setValue] = setState;
  return (
    <div className="information-input" ref={ref}>
      <span>{text}</span>
      <div className="input-frame">
        <input
          type={type}
          onChange={(event) => setValue(event.target.value)}
          value={value}
        />
      </div>
    </div>
  );
}

export function AuthInputBar({
  text, type, setState, placeHolder = '',
}) {
  const [value, setValue] = setState;
  const hanldeOnChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="auth-input-bar-frame">
      <span className="auth-input-bar-text">{text}</span>
      <input placeholder={placeHolder} onChange={hanldeOnChange} value={value} className="auth-input-bar" type={type} />
    </div>
  );
}

export default Inputbar;
