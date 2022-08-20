import React, { useEffect } from "react";
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import Carousel from "react-bootstrap/Carousel";
import { Button } from "react-bootstrap";
import Loading from "./../../components/Loading/loading";
import defaultProfile from "./../../assets/default.jpg";
import Review from "./../../components/Review/review";

import "./hotelDetail.css";
import { useHotel } from "../../store/hotelContext";
import { useNavigate, useParams } from "react-router-dom";
import { calculateStars } from "../../utils/starsCalculator";
import Map from "../../components/Map/map";
import { useState } from "react";
import { useAuth } from "../../store/authContext";
import { Footer, Header } from "../../components";

const HotelDetail = () => {
  const [index, setIndex] = useState(0);

  const [open, setOpen] = useState(false);

  const { userId, currentUser } = useAuth();
  const { isLoading, getHotel, currentHotel, setCurrentHotel } = useHotel();
  const { id } = useParams();

  const navigate = useNavigate();

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const handleReserve = () => {
    if (userId) {
      navigate(`/reserve/${currentHotel._id}`);
    } else {
      navigate("/auth");
    }
  };

  useEffect(() => {
    getHotel(id, setCurrentHotel, false);
  }, []);

  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-85 mb-5 hotel-details mx-auto">
          <div className="hotelheader">
            <div className="hotelheaderleft">
              <div className="hotelheaderleftparas">
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
                <p className="totalreviews">
                  {currentHotel.reviews && currentHotel.reviews.length} reviews
                </p>
              </div>
              <div className="hotelheaderlefttext">
                <h6>{currentHotel.name}</h6>
                <p className="p-0 m-0">
                  <IoLocationOutline />
                  {currentHotel.location && currentHotel.location.address}
                </p>
              </div>
            </div>

            {currentUser && currentUser.role === "admin" ? (
              <div
                className="hotelheaderright"
                onClick={() => navigate(`/reviews/${currentHotel._id}`)}
              >
                <Button variant="dark">Reviews</Button>
              </div>
            ) : (
              <div className="hotelheaderright">
                <Button variant="dark me-2" onClick={() => setOpen(true)}>
                  Rate Now
                </Button>
                <Button variant="dark" onClick={handleReserve}>
                  Reserve
                </Button>
              </div>
            )}
          </div>
          <div className="hotel-carousel">
            <Carousel activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item className="item_corousel">
                <img
                  className="d-block w-100"
                  src={currentHotel.cover_pic}
                  alt="First slide"
                />
              </Carousel.Item>
              {currentHotel.images &&
                currentHotel.images.map((item, i) => (
                  <Carousel.Item key={i} className="item_corousel">
                    <img
                      className="d-block w-100"
                      src={item}
                      alt="First slide"
                    />
                  </Carousel.Item>
                ))}
            </Carousel>
          </div>
          <div className="hotelpics">
            <div className="hotelpicsleft">
              <img src={currentHotel.cover_pic} alt="hotel" />
            </div>
            <div className="hotelpicsright">
              {currentHotel.images && (
                <>
                  <div className="hotelpicsrightone">
                    <img src={currentHotel.images[0]} alt="hotel" />
                  </div>
                  <div className="hotelpicsrighttwo">
                    <img src={currentHotel.images[1]} alt="hotel" />
                  </div>
                  <div className="hotelpicsrightthree">
                    <img src={currentHotel.images[2]} alt="hotel" />
                    {/* <h6>+2 photos</h6> */}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="hoteldesc my-4 p-0">
            <div className="hoteldescleft">
              <h6>Description</h6>
              <p>{currentHotel.description}</p>
            </div>
            {currentHotel.location && (
              <Map
                className="map"
                latitude={currentHotel.location.coordinates[0]}
                longitude={currentHotel.location.coordinates[1]}
                address={currentHotel.location.address}
              />
            )}
          </div>
          <Carousel className="review-carousel pt-4">
            {currentHotel.reviews &&
              currentHotel.reviews.slice(0, 4).map((item) => (
                <Carousel.Item className="reviewscorousel" key={item._id}>
                  <Carousel.Caption>
                    <div className="corouselinner">
                      <p>"{item.review.slice(0, 100)}..."</p>
                      <p className="customerreviews">
                        {calculateStars(item.rating).map((element, i) =>
                          element ? (
                            element === 1 ? (
                              <BsStarFill key={i} />
                            ) : (
                              <BsStarHalf key={i} />
                            )
                          ) : (
                            <BsStar key={i} />
                          )
                        )}
                      </p>
                      <img
                        src={item.user.photo || defaultProfile}
                        alt=""
                        style={{ borderRadius: "50%", objectFit: "cover" }}
                        width="54px"
                        height="54px"
                      />
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
          </Carousel>
          {(currentUser && currentUser.role === "admin") || (
            <div className="reservebutton">
              <Button variant="dark" onClick={handleReserve}>
                Reserve Now
              </Button>
            </div>
          )}
          {open && <Review setOpen={setOpen} />}
        </div>
      )}
      <Footer />
    </>
  );
};

export default HotelDetail;
