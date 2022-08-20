import React from "react";
import { BsStarFill } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";

import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { useReserve } from "../../store/reserveContext";
import { useAuth } from "../../store/authContext";

const Review = ({ setOpen }) => {
  const { userId } = useAuth();
  const { rating, setRating, reviewChange, requesting, handleReview } =
    useReserve();

  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setRating(value);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if (userId) {
      handleReview(e, id);
      setOpen(false);
    } else {
      navigate("/auth");
    }
  };

  const { id } = useParams();

  console.log(id);

  return (
    <div className="reserve filters">
      <div className="rContainer hContainer">
        <IoCloseCircle className="rClose" onClick={() => setOpen(false)} />
        <p className="rHeading p-0 m-0">Rate Now</p>
        <div className="p-2">
          <section className="text-center">
            {stars.map((_, index) => {
              return (
                <BsStarFill
                  key={index}
                  className="defualtStar"
                  color={rating > index ? "#ffe234" : "#cdcdcd"}
                  onClick={() => handleClick(index + 1)}
                />
              );
            })}
          </section>

          <Form
            className="mt-3"
            onChange={(e) => reviewChange(e)}
            onSubmit={(e) => handleSubmit(e)}
          >
            <Form.Group className="mb-3">
              <Form.Label className="mb-0">Feedback</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="What's your feedback?"
                name="review"
                style={{ height: "100px" }}
              />
            </Form.Group>
            <button type="submit" className="rButton">
              {userId ? (
                requesting ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  "Submit"
                )
              ) : (
                "Log In"
              )}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Review;
