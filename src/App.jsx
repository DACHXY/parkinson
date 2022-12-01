import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

// component
import Home from './pages/Homepage';
import UploadPage from './pages/UploadPage';
import SignInPage from './pages/AuthPage/SignIn';
import SignUpPage from './pages/AuthPage/SignUp';
import Dashboard from './pages/Dashboard';

// routes
import ProtectedRoute from './routes/protected';

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
      <ProtectedRoute>
        <UploadPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/signin',
    element: <SignInPage />,
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
