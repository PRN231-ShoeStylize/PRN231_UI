import React, { useEffect } from "react";
import CommonRoute from "./CommonRoute";
import { TOKEN_HAS_EXPIRED } from "../constants/constants";
import { useNavigate } from "react-router";

const AppRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(sessionStorage.getItem(TOKEN_HAS_EXPIRED) != null){
      navigate("");
    }
  }, [])
  return <CommonRoute />;
};

export default AppRoute;
