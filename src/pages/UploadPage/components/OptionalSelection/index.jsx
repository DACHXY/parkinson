import './index.scss';

import React from 'react';

function OptionalSelection({ text }) {
  const status = { check: 'optional-selection-checked', unchecked: 'optional-selection-unchecked' };
  return (
    <button type="button" className="btn-no-style optional-seclction-button-frame">
      <div className={`optional-selection-item ${status.check}`}>
        {text}
      </div>
    </button>
  );
}

export default OptionalSelection;
