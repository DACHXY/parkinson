import React from 'react';
import Select from 'react-dropdown-select';

import './index.scss';

export function InformationInput({
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

export function InformationSelect({ text, options, setState }) {
  const setValues = setState;
  return (
    <div className="information-select">
      <span>{text}</span>
      <Select
        style={{
          borderRadius: 8, border: '0.5px solid #4f4f4f', height: 25, fontSize: 24,
        }}
        options={options}
        onChange={(values) => setValues(values)}
      />
    </div>
  );
}
