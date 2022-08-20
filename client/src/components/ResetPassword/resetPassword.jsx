import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../store/authContext";

const ResetPassword = () => {
  const {
    handleChange,
    errors,
    error,
    setNewUser,
    requesting,
    handleResetPassword,
  } = useAuth();

  const { token } = useParams();
  return (
    <div className="form-container sign-in-container">
      <form
        className="login-form"
        onSubmit={(e) => handleResetPassword(e, token)}
        onChange={(e) => handleChange(e, setNewUser)}
      >
        <Link to="/" className="brand">
          Rentea
        </Link>
        <p className="para">Reset Password</p>
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="off"
        />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          autoComplete="off"
        />
        <p className="fieldError">
          {errors.passwordConfirm && errors.passwordConfirm}
        </p>
        <p className="fieldError">{error}</p>
        <button type="submit" className="signup">
          {!requesting ? (
            "RESET NOW"
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

export default ResetPassword;
