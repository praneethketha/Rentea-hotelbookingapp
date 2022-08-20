import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/authContext";

const VerifyOTP = () => {
  const {
    handleVerify,
    requesting,
    handleChange,
    setNewUser,
    newUser,
    errors,
  } = useAuth();
  return (
    <div className="form-container sign-in-container">
      <form
        className="login-form"
        onSubmit={(e) => handleVerify(e)}
        onChange={(e) => handleChange(e, setNewUser)}
      >
        <Link to="/" className="brand">
          Rentea
        </Link>
        <p className="para">Verify OTP!!!</p>
        <input
          type="password"
          name="otp"
          value={newUser.otp}
          placeholder="otp"
          autoComplete="off"
        />
        <p className="fieldError">{errors.otp && errors.otp}</p>
        <button type="submit" className="signup">
          {requesting ? <i className="fa fa-spinner fa-spin"></i> : "VERIFY"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
