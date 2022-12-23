import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

// component
import Home from './pages/Homepage';
import UploadPage from './pages/UploadPage';
import SignInPage from './pages/AuthPage/SignIn';
import SignUpPage from './pages/AuthPage/SignUp';
import Dashboard from './pages/Dashboard';
import HistoryPage from './pages/HistoryPage';
import HistoryItemPage from './pages/HistoryPage/HistoryItemPage';
import VerifyPage from './pages/AuthPage/Verify';
import ForgotPage from './pages/AuthPage/Forgot';
import ChangePasswordPage from './pages/AuthPage/ChangePassword';
import ArticlePage from './pages/ArticlePage';

// routes
import ProtectedRoute, { ProtectedRouteRedirect } from './routes/protected';

const isUserLogin = () => {
  const isLogin = useSelector((store) => store.auth.isLogin);
  return isLogin;
};

const LoginAndVideoListFecthed = () => {
  const isLogin = useSelector((store) => store.auth.isLogin);
  const videoList = useSelector((store) => store.videoInfo.videoList);
  return isLogin && videoList;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/upload',
    element: (
      <ProtectedRoute condition={isUserLogin} redirectURL="/signin">
        <UploadPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/history/:videoId',
    element: (
      <ProtectedRouteRedirect condition={LoginAndVideoListFecthed} redirectURL="/history">
        <HistoryItemPage />
      </ProtectedRouteRedirect>
    ),
  },
  {
    path: '/history',
    element: (
      <ProtectedRoute condition={isUserLogin} redirectURL="/signin">
        <HistoryPage />
      </ProtectedRoute>
    ),
  },

  {
    path: '/dashboard',
    element: (
      <ProtectedRoute condition={isUserLogin} redirectURL="/signin">
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/signin',
    element: (
      <SignInPage />
    ),
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/verify/change',
    element: (
      <ChangePasswordPage />
    ),
  },
  {
    path: '/verify',
    element: (
      <VerifyPage />
    ),
  },
  {
    path: '/forget',
    element: (
      <ForgotPage />
    ),
  },
  {
    path: '/article/:articleId',
    element: (
      <ArticlePage />
    ),
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
