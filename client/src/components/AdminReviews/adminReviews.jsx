import React from "react";
import "./adminReviews.css";
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";
import Card from "react-bootstrap/Card";
import { Col, Container, Row } from "react-bootstrap";
import { IoChevronBack } from "react-icons/io5";
import { useHotel } from "../../store/hotelContext";
import { calculateStars } from "../../utils/starsCalculator";
import defaultProfile from "./../../assets/default.jpg";

import Header from "../Header/header";
import Footer from "../Footer/footer";
import { useNavigate } from "react-router-dom";
const AdminReviews = () => {
  const { currentHotel } = useHotel();
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <Container
        style={{ minHeight: "calc(100vh - 10.9rem)", marginTop: "6rem" }}
      >
        <div className="mainreviews">
          <div className="mainreviewsinner">
            <h4 className="heading">
              <span>
                <IoChevronBack onClick={() => navigate(-1)} />
              </span>
              {currentHotel.name}
            </h4>
            <div className="d-flex justify-content-start align-items-center gap-2">
              <h6>{currentHotel.rating.toFixed(1)}</h6>

              <p className="starreviews">
                {calculateStars(currentHotel.rating).map((item, i) =>
                  item ? (
                    item === 1 ? (
                      <BsStarFill key={i} />
                    ) : (
                      <BsStarHalf key={i} />
                    )
                  ) : (
                    <BsStar key={i} />
                  )
                )}
              </p>
              <span className="totalreviews">
                {currentHotel.reviews.length} reviews
              </span>
            </div>
          </div>

          <div className="classifyhotels ">
            <Row className="Row1">
              {currentHotel.reviews &&
                currentHotel.reviews.map((item) => (
                  <Col lg={3} md={4} sm={6} xs={12} key={item._id}>
                    <Card className="reviewCard">
                      <Card.Img
                        className="reviewCardImg"
                        variant="top"
                        src={item.user.photo ? item.user.photo : defaultProfile}
                      />
                      <Card.Body>
                        <Card.Title>{item.user.name}</Card.Title>
                        <p className="starreviews">
                          {calculateStars(item.rating).map((item, i) =>
                            item ? (
                              item === 1 ? (
                                <BsStarFill key={i} />
                              ) : (
                                <BsStarHalf key={i} />
                              )
                            ) : (
                              <BsStar key={i} />
                            )
                          )}
                        </p>
                        <Card.Text>"{item.review.slice(0, 100)}..."</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};
export default AdminReviews;
