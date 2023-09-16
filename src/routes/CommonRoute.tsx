import React from "react";
import { useRoutes } from "react-router-dom";
import LoginPage from "../page/login.page";
import { MainNavbar } from "../components/common/MainNavbar";
import RegisterPage from "../page/register.page";
import MainHeader from "../components/header/MainHeader";

const CommonRoute = () => {
  let element = useRoutes([
    {
      path: "",
      element: <LoginPage />,
      index: true,
    },
    {
      path: "home",
      element: <MainNavbar />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/header",
      element: <MainHeader />,
    },
  ]);

  return element;
};

export default CommonRoute;
