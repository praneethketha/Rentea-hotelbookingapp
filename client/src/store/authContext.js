import React, { useContext, useState } from "react";
import * as api from "./../services";
import cookie from "react-cookies";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CREDENTIALS, NEW_USER } from "./constants";
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [newUser, setNewUser] = useState(NEW_USER);
  const [credentials, setCredentials] = useState(CREDENTIALS);
  const [config, setConfig] = useState({});
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    beforeSubmit(e);
    try {
      const { data } = await api.signup(newUser);

      setCurrentUser({ userId: data.data.userId });
      navigate("auth/verifyOTP");

      resetNewUser();
    } catch (err) {
      handleError(err);
    }
    setRequesting(false);
  };

  const handleLogin = async (e) => {
    beforeSubmit(e);

    try {
      const { data } = await api.login(credentials);

      if (data.status === "pending") {
        setCredentials(CREDENTIALS);
        setCurrentUser({ userId: data.data.userId });
        navigate("auth/verifyOTP");

        return setRequesting(false);
      }

      saveCurrentUser(data, "/");
      setCredentials(CREDENTIALS);
    } catch (err) {
      handleError(err);
    }
    setRequesting(false);
  };

  const handleVerify = async (e) => {
    beforeSubmit(e);

    try {
      const { data } = await api.verifyOTP({
        user_id: currentUser.userId,
        otp: newUser.otp,
      });

      saveCurrentUser(data, "/");
      resetNewUser();
    } catch (error) {
      setErrors({ otp: error.response.data.message });
    }
    setRequesting(false);
  };

  const handleChangePassword = async (e) => {
    beforeSubmit(e);
    try {
      const { data } = await api.changePassword(config, newUser);
      saveCurrentUser(data, -1);
      resetNewUser();
    } catch (err) {
      handleError(err);
    }
    setRequesting(false);
  };

  const handleForgotPassword = async (e) => {
    beforeSubmit(e);
    try {
      await api.forgotPassword({ email: newUser.email });
      setRequesting("done");
    } catch (err) {
      handleError(err);
    }
    setRequesting(false);
  };

  const handleResetPassword = async (e, token) => {
    beforeSubmit(e);
    try {
      const { data } = await api.resetPassword(newUser, token);
      saveCurrentUser(data, "/");
      resetNewUser();
    } catch (err) {
      handleError(err);
    }
    setRequesting(false);
  };

  const handleDeactivate = async (e) => {
    beforeSubmit(e);
    try {
      await api.updateMe(config, { active: false });

      handleLogOut();
    } catch (err) {
      handleError(err);
    }
    setRequesting(false);
  };

  const handleChange = (e, fn) => {
    fn((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const getUser = async () => {
    try {
      const { data } = await api.fetchUser(cookie.load("userId"));

      setCurrentUser(data.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleEdit = async (e) => {
    beforeSubmit(e);
    try {
      const { data } = await api.updateMe(config, newUser);

      setCurrentUser(data.data);
      navigate(-1);
      resetNewUser();
    } catch (err) {
      handleError(err);
    }
    setRequesting(false);
  };

  const saveCurrentUser = (data, path, replace) => {
    cookie.save("token", data.token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    cookie.save("userId", data.data._id, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    setCurrentUser(data.data);

    setConfig({
      headers: {
        authorization: `Bearer ${data.token}`,
      },
    });

    setUserId(data.data._id);

    if (replace) {
      navigate(path, { replace: replace });
    } else {
      navigate(path);
    }
  };

  const handleLogOut = () => {
    cookie.remove("userId");
    cookie.remove("token");

    setConfig({
      headers: {
        authorization: `Bearer `,
      },
    });

    setUserId(() => "");
    setCurrentUser(() => {});

    navigate("/");
  };

  const beforeSubmit = (e) => {
    e.preventDefault();
    resetErrors();
    setRequesting(true);
  };

  const handleError = (err) => {
    const errMsg = err.response.data.message;
    if (errMsg[0] === "{") {
      setErrors(JSON.parse(errMsg));
    } else {
      setError(errMsg);
    }
  };

  const resetErrors = () => {
    setError("");
    setErrors({});
  };

  const resetNewUser = () => {
    console.log("reset new user");
    setNewUser(NEW_USER);
  };

  useEffect(() => {
    setConfig({
      headers: {
        authorization: `Bearer ${
          cookie.load("token") ? cookie.load("token") : ""
        }`,
      },
    });

    setUserId(cookie.load("userId"));

    if (cookie.load("userId")) {
      getUser();
    }
  }, [userId]);

  return (
    <AuthContext.Provider
      value={{
        config,
        newUser,
        currentUser,
        errors,
        error,
        userId,
        requesting,
        resetErrors,
        resetNewUser,
        setRequesting,
        setNewUser,
        setCredentials,
        beforeSubmit,
        handleChange,
        handleLogin,
        handleSignUp,
        handleVerify,
        handleEdit,
        handleLogOut,
        handleError,
        handleChangePassword,
        handleForgotPassword,
        handleResetPassword,
        handleDeactivate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
