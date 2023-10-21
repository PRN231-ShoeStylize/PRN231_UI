import React, { useEffect } from "react";
import CommonRoute from "./CommonRoute";
import { isTokenValid } from "../utils/jwt";
import { useNavigate } from "react-router";

const AppRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isTokenValid()) {
      sessionStorage.clear();
      localStorage.clear();
      navigate("/login");
    }
  }, []);
  return <CommonRoute />;
};

export default AppRoute;
