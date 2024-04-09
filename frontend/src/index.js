import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './pages/login.js'
import Profile from './pages/profile.js'
import MySub from './pages/mySub.js'
import Sub from './pages/sub.js'
import Saved from './pages/savedPosts'
import SubGred from './pages/subGred';
import Posting from './pages/posting';

import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/mySub',
    element: <MySub />
  },
  {
    path: '/sub',
    element: <Sub />
  },
  {
    path: '/savedPosts',
    element: <Saved />
  },
  {
    path: '/subGreddiit/:name',
    element: <SubGred />
  },
  {
    path: '/subGreddiitPost/:name',
    element: <Posting />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
