import './index.scss';
import React from 'react';

function SubmitButtonLoading({ disabled, onClick, children }) {
  return (
    <button
      disabled={disabled}
      className="submit-button-animation"
      type="submit"
      onClick={onClick}
    >
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
      {children}
    </button>
  );
}

export default SubmitButtonLoading;
