import React from "react";
import { NavLink } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { MdEdit } from "react-icons/md";
import defaultProfile from "../../assets/default.jpg";
import "./edit.css";
import { useAuth } from "../../store/authContext";
import { getBase64 } from "../../utils/getBase64";
import { useEffect } from "react";

const Edit = () => {
  const {
    currentUser,
    newUser,
    errors,
    requesting,
    handleChange,
    setNewUser,
    handleEdit,
  } = useAuth();

  useEffect(() => {
    setNewUser((prevState) => ({ ...prevState, ...currentUser }));
  }, []);

  console.log(newUser);

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
    <div className="edit  pt-3">
      <div className="text-center">
        <NavLink to="" className="text-black">
          Edit-Profile
        </NavLink>
      </div>
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
      <div className="form mt-3">
        <Form
          onChange={(e) => handleChange(e, setNewUser)}
          onSubmit={handleEdit}
        >
          <Form.Group className="mt-3">
            <Form.Label className="mb-0">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              defaultValue={newUser.name}
            />
          </Form.Group>
          <p className="fieldError">{errors.name && errors.name}</p>

          <Form.Group className="mt-3">
            <Form.Label className="mb-0">Email </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              defaultValue={newUser.email}
            />
          </Form.Group>
          <p className="fieldError">{errors.email && errors.email}</p>

          <Form.Group className="mt-3">
            <Form.Label className="mb-0">Contact Numbar</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter number"
              name="contact_number"
              defaultValue={newUser.contact_number}
            />
          </Form.Group>
          <p className="fieldError">
            {errors.contact_number && errors.contact_number}
          </p>

          <button className="edit-button mt-3" type="submit">
            {requesting ? <i className="fa fa-spinner fa-spin"></i> : "Submit"}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Edit;
