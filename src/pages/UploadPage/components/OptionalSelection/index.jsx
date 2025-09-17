import './index.scss';
import React, { useState, useEffect } from 'react';
import { ACTION } from '../UploadSection/reducer';

function OptionalSelection({
  text, setState, index, reducer,
}) {
  const [value, setValue] = setState;
  const [state, dispatch] = reducer;
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
    if (value[index]) {
      dispatch({ type: ACTION.setDetect, payload: text });
    }
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
