import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

// component
import Home from './pages/Homepage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
