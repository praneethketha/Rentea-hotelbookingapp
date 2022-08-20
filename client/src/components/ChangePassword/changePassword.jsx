import React from "react";
import Form from "react-bootstrap/Form";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/authContext";
import "./changePassword.css";

const ChangePasword = () => {
  const {
    error,
    errors,
    requesting,
    handleChangePassword,
    handleChange,
    setNewUser,
  } = useAuth();
  return (
    <div>
      <div className="text-center mb-5 pt-5">
        <NavLink to="" className="text-black">
          Change Password
        </NavLink>
      </div>
      <div className="form mt-5">
        <Form
          onSubmit={handleChangePassword}
          onChange={(e) => handleChange(e, setNewUser)}
        >
          <Form.Group>
            <Form.Label className="mb-1">Old Password</Form.Label>
            <Form.Control type="password" name="passwordCurrent" />
          </Form.Group>
          <p className="fieldError">{error}</p>

          <Form.Group className="mt-3">
            <Form.Label className="mb-1">New Password </Form.Label>
            <Form.Control type="password" name="password" />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label className="mb-1">Confirm Password</Form.Label>
            <Form.Control type="password" name="passwordConfirm" />
          </Form.Group>
          <p className="fieldError">
            {errors.passwordConfirm && errors.passwordConfirm}
          </p>

          <button className="edit-button mt-4" type="submit">
            {requesting ? <i className="fa fa-spinner fa-spin"></i> : "Submit"}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasword;
