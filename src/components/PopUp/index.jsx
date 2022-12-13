import './index.scss';
import React from 'react';

function PopUp({ children, className }) {
  return (
    <div className="popup-background">
      <div className={`popup-frame ${className && className}`}>
        {children}
      </div>
    </div>
  );
}

export default PopUp;
