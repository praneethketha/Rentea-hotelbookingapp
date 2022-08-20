import React, { useContext, useState } from "react";
import * as api from "../services";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useAuth } from "./authContext";

const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const {
    config,
    newUser,
    beforeSubmit,
    setRequesting,
    resetNewUser,
    handleError,
  } = useAuth();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const getAllUsers = useCallback(async () => {
    try {
      setRequesting(true);
      const { data } = await api.fetchAllUsers(config);
      setUsers(data.data);
      resetNewUser();
    } catch (error) {
      alert(error);
    }
    setRequesting(false);
  }, []);

  const addNewUser = async (e) => {
    beforeSubmit(e);
    try {
      await api.createUser(newUser);
      navigate(-1);
      getAllUsers();
      resetNewUser();
    } catch (err) {
      handleError(err);
    }
    setRequesting(false);
  };

  const editUser = async (e) => {
    beforeSubmit(e);
    try {
      await api.updateUser(newUser, newUser._id);
      navigate(-1);
      getAllUsers();
      resetNewUser();
    } catch (err) {
      handleError(err);
    }
    setRequesting(false);
  };

  const deactivateUser = async (id, data) => {
    console.log(data);
    try {
      await api.updateUser({ active: data }, id);
      getAllUsers();
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        addNewUser,
        editUser,
        deactivateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
