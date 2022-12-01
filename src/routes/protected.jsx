import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ next, children }) {
  const isLogin = useSelector((store) => store.auth.isLogin);
  const location = useLocation();
  if (!isLogin) {
    return <Navigate to={`/signin?next=${location.pathname}`} replace />;
  }
  return children;
}

export default ProtectedRoute;
