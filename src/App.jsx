import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { jsonRequest } from './axios';
import { setSessionToken, setUser } from './stores/authSlice';

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
import VerifyNewEmailPage from './pages/AuthPage/VerifyNewEmail';

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
    path: '/verify_new_email',
    element: (
      <VerifyNewEmailPage />
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
  const [cookies, setCookie] = useCookies(['access_token', 'username']);
  const dispatch = useDispatch();
  useEffect(() => {
    if (cookies.access_token) {
      jsonRequest.get('/auth/getUser', { headers: { 'Authorization': cookies.access_token } })
        .then((res) => {
          dispatch(setUser(res.data));
          dispatch(setSessionToken(cookies.access_token));
        });
    }
  }, []);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
