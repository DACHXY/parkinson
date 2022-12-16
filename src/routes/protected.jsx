import React from 'react';
import {
  Navigate, useLocation, Link, useNavigate,
} from 'react-router-dom';

import PopUp from '../components/PopUp';

function ProtectedRoute({ condition, redirectURL, children }) {
  const location = useLocation();
  const redirectPath = `${redirectURL}?next=${location.pathname}`;
  if (!condition()) {
    // return <Navigate to={redirectPath} replace />;
    return (
      <PopUp className="popup-frame-button-only">
        <h3>請先登入</h3>
        <div className="pop-up-button-section">
          <Link className="pop-up-button" to={redirectPath}>Ok</Link>
          <Link className="pop-up-button" to="/home">回到首頁</Link>
        </div>
      </PopUp>
    );
  }
  return children;
}

export function ProtectedRouteRedirect({
  condition, message, redirectURL, children,
}) {
  if (!condition()) {
    return (
      <Navigate to={redirectURL} replace />
    );
  }
  return children;
}

export default ProtectedRoute;
