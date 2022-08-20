import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { useAdminContext } from "../../store/adminContext";
import { useHotel } from "../../store/hotelContext";
import { NEW_ROOM } from "../../store/constants";

const EditRooms = () => {
  const navigate = useNavigate();
  const { getAllHotels } = useHotel();
  const { setNewRoom, newHotel, removeRoom } = useAdminContext();

  const handleEdit = (item, rooms) => {
    setNewRoom(() => ({ ...item, rooms }));
    navigate("/admin/hotels/addRoom", {
      state: { id: newHotel._id, edit: true },
    });
  };

  const handleMove = () => {
    let id;
    setNewRoom(NEW_ROOM);
    if (state) {
      id = state.id;
    } else {
      id = newHotel._id;
    }
    navigate("/admin/hotels/addRoom", {
      state: { id },
    });
  };

  const handleClose = () => {
    getAllHotels();
    navigate(-2);
  };

  const { state } = useLocation();

  return (
    <div className="reserve filters addAdmin">
      <div className="rContainer hContainer">
        <IoCloseCircle className="rClose" onClick={handleClose} />
        <p className="rHeading p-0 m-0">Rooms:</p>
        <div className="p-0">
          {newHotel.rooms &&
            newHotel.rooms.map((item) => {
              const roomsList = item.roomNumbers
                .map((item) => item.number)
                .join(",");
              return (
                <div
                  className="p-2 d-flex justify-content-between align-items-center border mt-2"
                  key={item._id}
                >
                  <section className="p-0 m-0">
                    <p className="m-0 p-0">{item.title}</p>
                    <p className="m-0 p-0">Rooms: {roomsList}</p>
                  </section>
                  <section className="p-0 m-0">
                    <p className="m-0 p-0">{item.price}</p>
                    <p className="m-0 p-0">
                      <MdOutlineEdit
                        className="editHotel"
                        onClick={() => handleEdit(item, roomsList)}
                      />
                      <MdDelete
                        className="delHotel"
                        onClick={() => removeRoom(item._id)}
                      />
                    </p>
                  </section>
                </div>
              );
            })}

          <button className="rButton" onClick={() => handleMove()}>
            add rooom
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRooms;
