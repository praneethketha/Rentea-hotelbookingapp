import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/authContext";

const SignUp = () => {
  const {
    handleSignUp,
    handleChange,
    setNewUser,
    newUser,
    errors,
    requesting,
  } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="form-container sign-in-container">
      <form
        className="login-form"
        onSubmit={(e) => handleSignUp(e)}
        onChange={(e) => handleChange(e, setNewUser)}
      >
        <Link to="/" className="brand">
          Rentea
        </Link>
        <p className="para">Welcome to Rentea</p>
        <input
          value={newUser.name}
          type="text"
          name="name"
          placeholder="Name"
          autoComplete="off"
        />
        <p className="fieldError">{errors.name && errors.name}</p>
        <input
          value={newUser.email}
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="off"
        />
        <p className="fieldError">{errors.email && errors.email}</p>
        <input
          value={newUser.contact_number}
          type="number"
          name="contact_number"
          placeholder="contact number"
          autoComplete="off"
        />
        <p className="fieldError">
          {errors.contact_number && errors.contact_number}
        </p>
        <div className="d-flex justify-content-between align-items-center gap-2 m-0 p-0">
          <section className="m-0 p-0">
            <input
              value={newUser.password}
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="off"
            />
            <p className="fieldError">{errors.password && errors.password}</p>
          </section>
          <section className="m-0 p-0">
            <input
              value={newUser.passwordConfirm}
              type="password"
              name="passwordConfirm"
              placeholder="Confirmpassword"
              autoComplete="off"
            />
            <p className="fieldError">
              {errors.passwordConfirm && errors.passwordConfirm}
            </p>
          </section>
        </div>
        <button type="submit" className="signup">
          {requesting ? <i className="fa fa-spinner fa-spin"></i> : "SIGN UP"}
        </button>
        <div className="slidingparas">
          <p className="loginpara">Already have an account?</p>
          <p
            className="ghost p-0 m-0"
            id="signUp"
            onClick={() => navigate("/auth")}
          >
            Sign In
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
