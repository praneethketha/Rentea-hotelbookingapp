import React from "react";
import Form from "react-bootstrap/Form";
import { IoCloseCircle } from "react-icons/io5";
import defaultProfile from "../../assets/default.jpg";
import { MdEdit } from "react-icons/md";
import { getBase64 } from "../../utils/getBase64";
import { useAuth } from "../../store/authContext";
import { useUser } from "../../store/userContext";
import { useLocation, useNavigate } from "react-router-dom";

const AddCustomer = () => {
  const { setNewUser, newUser, handleChange, errors, requesting } = useAuth();

  const { editUser, addNewUser } = useUser();

  const navigate = useNavigate();
  const { state } = useLocation();

  const handleBase64 = (e) => {
    let file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        setNewUser((prevState) => ({ ...prevState, photo: result }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="reserve filters addAdmin">
      <div className="rContainer hContainer">
        <IoCloseCircle className="rClose" onClick={() => navigate(-1)} />
        <p className="rHeading p-0 m-0">Add Customer</p>
        <div className="p-2">
          <div className="text-center d-flex justify-content-center">
            <div className="editProfile">
              <img
                src={newUser.photo || defaultProfile}
                alt="profile"
                className="profile-img edit-img mt-3"
              />
              <label htmlFor="photo" className="editIcon">
                <MdEdit />
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  onChange={handleBase64}
                />
              </label>
            </div>
          </div>
          <Form
            className="mt-3"
            onChange={(e) => handleChange(e, setNewUser)}
            onSubmit={state ? editUser : addNewUser}
          >
            <div className="d-flex justify-content-between align-items-center">
              <Form.Group className="mt-3">
                <Form.Label className="mb-0">Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="name"
                  name="name"
                  value={newUser.name}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label className="mb-0">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="email"
                  name="email"
                  value={newUser.email}
                />
              </Form.Group>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="fieldError">{errors.name && errors.name}</p>
              <p className="fieldError">{errors.email && errors.email}</p>
            </div>
            <Form.Group className="mt-3">
              <Form.Label className="mb-0">Contact Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="contact number"
                name="contact_number"
                value={newUser.contact_number}
              />
            </Form.Group>
            <p className="fieldError">
              {errors.contact_number && errors.contact_number}
            </p>
            <Form.Group className="mt-3">
              <Form.Label className="mb-0">Role</Form.Label>
              <Form.Select
                onChange={(e) => handleChange(e, setNewUser)}
                value={newUser.role}
              >
                <option value="user" defaultChecked>
                  User
                </option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
            {state || (
              <>
                <div className="d-flex justify-content-between align-items-center">
                  <Form.Group className="mt-3">
                    <Form.Label className="mb-0">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="password"
                      name="password"
                    />
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label className="mb-0">Password Confirm</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="password confirm"
                      name="passwordConfirm"
                    />
                  </Form.Group>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="fieldError">
                    {errors.password && errors.password}
                  </p>
                  <p className="fieldError">
                    {errors.passwordConfirm && errors.passwordConfirm}
                  </p>
                </div>
              </>
            )}
            <button type="submit" className="rButton">
              {requesting ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                "Submit"
              )}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
