import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/authContext";

const ForgotPassword = () => {
  const {
    newUser,
    handleChange,
    setNewUser,
    error,
    requesting,
    handleForgotPassword,
  } = useAuth();
  return (
    <div className="form-container sign-in-container">
      <form
        className="login-form"
        onSubmit={(e) => handleForgotPassword(e)}
        onChange={(e) => handleChange(e, setNewUser)}
      >
        <Link to="/" className="brand">
          Rentea
        </Link>
        <p className="para">Forgot!!</p>
        <input
          value={newUser.email}
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="off"
        />
        <p className="fieldError">{error}</p>

        <button type="submit" className="signup">
          {!requesting ? (
            "RESET"
          ) : requesting === "done" ? (
            "EMAIL SENT"
          ) : (
            <i className="fa fa-spinner fa-spin"></i>
          )}
        </button>
        <div className="slidingparas">
          <p className="loginpara">If you want to go back?</p>
          <Link to="/auth" className="ghost p-0 m-0" id="signUp">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
