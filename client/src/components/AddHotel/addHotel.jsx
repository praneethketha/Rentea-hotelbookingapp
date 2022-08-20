import React from "react";
import Form from "react-bootstrap/Form";
import { MdAdd } from "react-icons/md";
import { IoCloseCircle, IoClose } from "react-icons/io5";
import { getBase64 } from "../../utils/getBase64";
import { useAuth } from "../../store/authContext";
import { useAdminContext } from "../../store/adminContext";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../Loading/loading";
import { useHotel } from "../../store/hotelContext";

const AddHotel = () => {
  const { errors, requesting } = useAuth();
  const { isLoading } = useHotel();
  const { addNewHotel, editHotel, handleHotel, newHotel, setNewHotel } =
    useAdminContext();

  const handleBase64 = (e) => {
    [...e.target.files].forEach((file) => {
      getBase64(file)
        .then((result) => {
          file["base64"] = result;
          setNewHotel((prevState) => ({
            ...prevState,
            images: [...prevState.images, result],
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const handleRemovePics = (index) => {
    let remaining_images = newHotel.images.filter((item, i) => i !== index);
    setNewHotel((prevState) => ({
      ...prevState,
      images: remaining_images,
    }));
  };

  const navigate = useNavigate();
  const { state } = useLocation();

  return isLoading ? (
    <Loading />
  ) : (
    <div className="reserve filters addAdmin">
      <div className="rContainer hContainer">
        <IoCloseCircle className="rClose" onClick={() => navigate(-1)} />
        <p className="rHeading p-0 m-0">Add Hotel</p>
        <div className="p-2 w-100">
          <div className="text-center d-flex justify-content-center flex-column align-items-center w-100">
            <div className="editProfile addImages d-flex justify-content-center align-items-center gap-2">
              {newHotel.images.length ? (
                <>
                  <div className="px-5 py-0 m-0"></div>
                  {newHotel.images.map((item, index) => (
                    <section className="position-relative" key={index}>
                      <IoClose
                        className="rClose removeImg"
                        onClick={() => handleRemovePics(index)}
                      />
                      <img src={item} alt="profile" className="hotel-img" />
                    </section>
                  ))}
                </>
              ) : (
                <></>
              )}
              <label htmlFor="photo" className="addImage">
                <MdAdd />
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  onChange={handleBase64}
                  multiple
                />
              </label>
            </div>
            <p className="fieldError">{errors.cover_pic && errors.cover_pic}</p>
          </div>
          <Form
            className="mt-3"
            onChange={(e) => handleHotel(e)}
            onSubmit={state ? editHotel : addNewHotel}
          >
            <div className="d-flex justify-content-between align-items-center">
              <Form.Group className="mt-3">
                <Form.Label className="mb-0">Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="name"
                  name="name"
                  value={newHotel.name}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label className="mb-0">Base Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="base price"
                  name="basePrice"
                  value={newHotel.basePrice}
                />
              </Form.Group>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="fieldError">{errors.name && errors.name}</p>
              <p className="fieldError">
                {errors.basePrice && errors.basePrice}
              </p>
            </div>
            <Form.Group className="mt-3">
              <Form.Label className="mb-0">Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="description"
                name="description"
                style={{ height: "100px" }}
                value={newHotel.description}
              />
            </Form.Group>
            <p className="fieldError">
              {errors.description && errors.description}
            </p>

            <div className="d-flex justify-content-between align-items-center">
              <Form.Group className="mt-3">
                <Form.Label className="mb-0">Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="address"
                  name="address"
                  value={newHotel.location && newHotel.location.address}
                />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label className="mb-0">City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="city"
                  name="city"
                  value={newHotel.city}
                />
              </Form.Group>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="fieldError">{errors.address && errors.address}</p>
              <p className="fieldError">{errors.city && errors.city}</p>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <Form.Group className="mt-3">
                <Form.Label className="mb-0">Latitude</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="latitude"
                  name="latitude"
                  value={newHotel.latitude}
                />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label className="mb-0">Longitude</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="longitude"
                  name="longitude"
                  value={newHotel.longitude}
                />
              </Form.Group>
            </div>
            <div className="rButtons">
              {state && (
                <button
                  className="rButton2"
                  onClick={() => navigate("/admin/hotels/rooms")}
                >
                  Edit Rooms
                </button>
              )}
              <button type="submit" className="rButton">
                {requesting ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddHotel;
