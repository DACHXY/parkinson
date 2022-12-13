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

// routes
import ProtectedRoute from './routes/protected';
import HistoryItemPage from './pages/HistoryPage/HistoryItemPage';

const isUserLogin = () => {
  const isLogin = useSelector((store) => store.auth.isLogin);
  return isLogin;
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
    path: '/history/:id',
    element: (
      <ProtectedRoute condition={isUserLogin} redirectURL="/signin">
        <HistoryItemPage />
      </ProtectedRoute>
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
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
