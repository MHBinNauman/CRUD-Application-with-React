import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import ErrorPage from './components/errorPage.jsx'
import Home from './components/home.jsx'
import CRUD from './components/CRUD.jsx'
import About from './components/about.jsx'
import Contact from './components/contact.jsx'
import Login from './components/loginPage.jsx'
import LoginFail from './components/loginFail.jsx'
import LoginSuccess from './components/loginSuccess.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/crud",
    element: <CRUD />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contact",
    element: <Contact/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/loginfailed",
    element: <LoginFail />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/loginsuccess",
    element: <LoginSuccess />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
