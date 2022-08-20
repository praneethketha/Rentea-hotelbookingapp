import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import "./LoginRegister.css";
const LoginRegister = () => {
  const { state } = useLocation();
  return (
    <section className="loginPage">
      <div className={`container container1 ${state}`} id="container">
        <Outlet />
        <div className="overlay-container">
          <div className="overlay"></div>
        </div>
      </div>
    </section>
  );
};

export default LoginRegister;
