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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/upload',
    element: <UploadPage />,
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
