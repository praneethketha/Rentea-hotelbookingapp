import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./authContext";
import { useHotel } from "./hotelContext";
import * as api from "./../services";
import { useNavigate } from "react-router-dom";
import { NEW_HOTEL, NEW_ROOM } from "./constants";

const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [newHotel, setNewHotel] = useState(NEW_HOTEL);
  const [newRoom, setNewRoom] = useState(NEW_ROOM);
  const [rooms, setRooms] = useState([]);
  const { beforeSubmit, setRequesting, handleError } = useAuth();
  const { getAllHotels, getHotel } = useHotel();

  const navigate = useNavigate();

  const handleHotel = (e) => {
    if (e.target.name === "address") {
      setNewHotel((prevState) => ({
        ...prevState,
        location: { ...prevState.location, [e.target.name]: e.target.value },
      }));
    } else {
      setNewHotel((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleRoom = (e) => {
    setNewRoom((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const addNewHotel = async (e) => {
    beforeSubmit(e);
    try {
      setRequesting(true);
      const body = {
        ...newHotel,
        location: {
          ...newHotel.location,
          coordinates: [newHotel.latitude * 1, newHotel.longitude * 1],
        },
        cover_pic: newHotel.images[0],
        images: newHotel.images.slice(1),
      };
      const { data } = await api.createHotel(body);
      getAllHotels();
      navigate("/admin/hotels/rooms", { state: { id: data.data._id } });
    } catch (error) {
      handleError(error);
    }
    setRequesting(false);
  };

  const editHotel = async (e) => {
    beforeSubmit(e);

    try {
      setRequesting(true);
      const body = {
        ...newHotel,
        location: {
          ...newHotel.location,
          coordinates: [newHotel.latitude * 1, newHotel.longitude * 1],
        },
        cover_pic: newHotel.images[0],
        images: newHotel.images.slice(1),
      };
      await api.updateHotel(body, newHotel._id);
      getAllHotels();
      navigate("/admin/hotels/rooms");
    } catch (error) {
      handleError(error);
    }
    setRequesting(false);
  };

  const addNewRoom = async (e, hotel) => {
    beforeSubmit(e);
    try {
      setRequesting(true);
      const roomNumbers = newRoom.rooms
        .split(",")
        .map((item) => ({ number: item }));
      const body = {
        ...newRoom,
        roomNumbers,
        hotel,
      };
      await api.createRoom(body);
      setNewRoom(() => NEW_ROOM);

      getHotel(hotel, setNewHotel, true);
      navigate(-1);
    } catch (error) {
      handleError(error);
    }
    setRequesting(false);
  };

  const editRoom = async (e, hotel) => {
    beforeSubmit(e);
    try {
      setRequesting(true);
      const roomNumbers = newRoom.rooms
        .split(",")
        .map((item) => ({ number: item }));
      const body = {
        ...newRoom,
        roomNumbers,
        hotel,
      };
      await api.updateRoom(body, newRoom._id);
      setNewRoom(() => NEW_ROOM);
      getHotel(hotel, setNewHotel, true);
      navigate(-1);
    } catch (error) {
      handleError(error);
    }
    setRequesting(false);
  };

  const removeRoom = async (id) => {
    try {
      await api.deleteRoom(id);
      getHotel(newHotel._id, setNewHotel, true);
    } catch (error) {
      alert(error);
    }
  };

  const removeHotel = async (id) => {
    try {
      console.log(id);
      await api.deleteHotel(id);
      getAllHotels();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        NEW_HOTEL,
        NEW_ROOM,
        rooms,
        newRoom,
        activeMenu,
        newHotel,
        editRoom,
        editHotel,
        handleHotel,
        handleRoom,
        addNewHotel,
        addNewRoom,
        removeRoom,
        removeHotel,
        setNewRoom,
        setNewHotel,
        setRooms,
        setActiveMenu,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
