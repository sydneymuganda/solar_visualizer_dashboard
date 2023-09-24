import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'

// Navigation for different combinations of rendering
import { RouterProvider } from "react-router-dom";

// Import router setup
import { router } from './routes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);