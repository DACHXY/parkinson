import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ condition, redirectURL, children }) {
  const location = useLocation();
  const redirectPath = `${redirectURL}?next=${location.pathname}`;
  if (!condition()) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
}

export default ProtectedRoute;
