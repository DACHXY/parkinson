import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

// component
import Home from './pages/Homepage';
import UploadPage from './pages/UploadPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/upload',
    element: <UploadPage />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
