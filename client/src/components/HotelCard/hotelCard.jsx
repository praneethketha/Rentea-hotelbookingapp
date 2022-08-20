import React from "react";
import Card from "react-bootstrap/Card";
import "./hotelCard.css";
import { BiRupee } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
  return (
    <div key={hotel._id} onClick={() => navigate(`${hotel._id}`)}>
      <Card>
        <div className="Hotels">
          <Card.Img variant="top" className="card_img" src={hotel.cover_pic} />
          <div className="hoteltitles">
            <h4>{hotel.name}</h4>
          </div>
        </div>
        <Card.Body className="cardBody">
          <Card.Text className="text">{hotel.location.address}</Card.Text>
          <div className="ratecost">
            <div className="ratings">
              <span className="rate">{hotel.rating.toFixed(1)}/5 </span>
              <span className="rate2">{hotel.reviews.length} ratings</span>
            </div>
            <div className="cost">
              <span className="number">
                <BiRupee />
                {hotel.basePrice}
              </span>
              <p>
                <span>1 room</span> per day
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default HotelCard;
