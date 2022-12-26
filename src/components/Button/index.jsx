import './index.scss';
import React from 'react';

function SubmitButtonLoading({
  disabled, onClick, children, style, className,
}) {
  return (
    <button
      style={style}
      disabled={disabled}
      className={`submit-button-animation ${className && className}`}
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
