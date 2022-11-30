import './index.scss';
import React, { useState, useEffect } from 'react';

function OptionalSelection({ text, setState, index }) {
  const [value, setValue] = setState;
  const [checkedStatus, setCheckedStatus] = useState(value[text]);
  const status = { checked: 'optional-selection-checked', unchecked: 'optional-selection-unchecked' };

  const handleClick = () => {
    setValue(value.map(() => false));
    setValue((values) => [
      ...values.slice(0, index),
      true,
      ...values.slice(index + 1),
    ]);
  };

  useEffect(() => {
    setCheckedStatus(value[index]);
  }, [value]);

  return (
    <button onClick={handleClick} type="button" className="btn-no-style optional-seclction-button-frame">
      <div className={`optional-selection-item ${checkedStatus ? status.checked : status.unchecked}`}>
        {text}
      </div>
    </button>
  );
}

export default OptionalSelection;
