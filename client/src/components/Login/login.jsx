import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/authContext";
import { NEW_USER } from "../../store/constants";

const Login = () => {
  const {
    handleLogin,
    error,
    setNewUser,
    handleChange,
    requesting,
    setCredentials,
    resetErrors,
  } = useAuth();
  const navigate = useNavigate();

  const handleMove = () => {
    navigate("signUp", { state: "right-panel-active" });
    setNewUser(NEW_USER);
  };
  return (
    <div className="form-container sign-in-container">
      <form
        className="login-form"
        onSubmit={(e) => handleLogin(e)}
        onChange={(e) => handleChange(e, setCredentials)}
      >
        <Link to="/" className="brand">
          Rentea
        </Link>
        <p className="para">Welcome Back!!</p>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <p
          className="loginforgot"
          onClick={() => {
            resetErrors();
            navigate("forgotPassword", { state: "right-panel-active" });
          }}
        >
          Forgot Password?
        </p>
        <p className="fieldError">{error}</p>
        <button className="signin" type="submit">
          {requesting ? <i className="fa fa-spinner fa-spin"></i> : "LOGIN"}
        </button>

        <div className="slidingparastwo">
          <p className="loginpara">New to Rentea?</p>
          <p className="ghost p-0 m-0" id="signIn" onClick={() => handleMove()}>
            Sign Up
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
