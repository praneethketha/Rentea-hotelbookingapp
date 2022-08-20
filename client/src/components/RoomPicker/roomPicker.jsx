import React, { useEffect } from "react";
import { BiRupee } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useHotel } from "../../store/hotelContext";
import { useReserve } from "../../store/reserveContext";
import Loading from "../Loading/loading";

const RoomPicker = () => {
  const { currentHotel, getHotel, setCurrentHotel, isLoading } = useHotel();
  const { isAvailable, handleSelect, alldates, setSelectedRooms } =
    useReserve();

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    getHotel(id, setCurrentHotel, false);
  }, [id]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <span>Select your rooms:</span>
      <div className="rRoomContainer">
        {currentHotel.rooms &&
          currentHotel.rooms.map((item) => (
            <div className="rItem" key={item._id}>
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc.slice(0, 40)}...</div>
                <div className="rMax">
                  Max people: <b>{item.maxPeople}</b>
                </div>
                <div className="rPrice">
                  <BiRupee />
                  {alldates.length * item.price}
                </div>
              </div>
              <div className="rSelectRooms">
                {item.roomNumbers.map((roomNumber) => {
                  return (
                    <div className="room">
                      <label>{roomNumber.number}</label>
                      <input
                        type="checkbox"
                        value={JSON.stringify({
                          _id: roomNumber._id,
                          title: item.title,
                          price: item.price,
                          room: roomNumber.number,
                        })}
                        onChange={handleSelect}
                        disabled={!isAvailable(roomNumber)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
      </div>

      <div className="rButtons">
        <button
          className="rButton2"
          onClick={() => {
            setSelectedRooms(() => []);
            navigate(-1);
          }}
        >
          Back
        </button>
        <Link to={`/reserve/${id}/payment`} className="rButton">
          Reserve Now!
        </Link>
      </div>
    </>
  );
};

export default RoomPicker;
