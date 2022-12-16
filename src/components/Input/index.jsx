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

export default Inputbar;
