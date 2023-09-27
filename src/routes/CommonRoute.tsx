import React from "react";
import { useRoutes } from "react-router-dom";
import LoginPage from "../page/login.page";
import RegisterPage from "../page/register.page";
import MainHeader from "../components/header/MainHeader";
import HomePage from "../page/home.page";
import ShopHomePage from "../page/shop/shop.page";

const CommonRoute = () => {
  let element = useRoutes([
    {
      path: "",
      element: <LoginPage />,
      index: true,
    },
    {
      path: "home",
      element: <HomePage />,
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
    {
      path: "/shop",
      element: <ShopHomePage />,
    },
  ]);

  return element;
};

export default CommonRoute;
