import { createBrowserRouter, Navigate } from "react-router";

import Register from "../pages/auth/Register";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/Login";
import Project from "../pages/Project";
import Invite from "../pages/Invite";
import Home from "../pages/Home";

import CommonLayout from "../layouts/common/CommonLayout";
import AuthLayout from "../layouts/auth/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      {
        path: "/",
        element: (
          <Navigate
            to="/home"
            replace
          />
        ),
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/invite",
        element: <Invite />,
      },
      {
        path: "/project",
        element: <Project />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: (
          <Navigate
            to="login"
            replace
          />
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/404",
    element: <NotFound />,
  },
  {
    path: "*",
    element: (
      <Navigate
        to="/404"
        replace
      />
    ),
  },
]);

export default router;
