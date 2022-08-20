import axios from "axios";

const URL = "http://localhost:8000/api/v1";

export const fetchAllHotels = (searchTerm, queryStr) =>
  axios.get(`${URL}/hotels?key=${searchTerm}${queryStr}`);
export const fetchHotel = (id) => axios.get(`${URL}/hotels/${id}`);
export const signup = (data) => axios.post(`${URL}/users/signup`, data);
export const login = (data) => axios.post(`${URL}/users/login`, data);
export const verifyOTP = (data) => axios.patch(`${URL}/users/verifyOTP`, data);
export const fetchUser = (id) => axios.get(`${URL}/users/${id}`);
export const updateMe = (config, data) =>
  axios.patch(`${URL}/users/updateMe`, data, config);
export const changePassword = (config, data) =>
  axios.patch(`${URL}/users/updateMyPassword`, data, config);
export const forgotPassword = (data) =>
  axios.post(`${URL}/users/forgotPassword`, data);
export const resetPassword = (data, token) =>
  axios.patch(`${URL}/users/resetPassword/${token}`, data);

export const rateNow = (config, data) =>
  axios.post(`${URL}/reviews`, data, config);

export const fetchPriceRange = () => axios.get(`${URL}/hotels/priceRange`);

export const fetchCities = () => axios.get(`${URL}/hotels/cities`);

export const fetchPaymentKey = (data) =>
  axios.post(`${URL}/bookings/payment`, data);

export const bookNow = (config, data, id) =>
  axios.patch(`${URL}/hotels/bookNow/${id}`, data, config);
export const sendPaymentMail = (config, data) =>
  axios.post(`${URL}/bookings/payment/mail`, data, config);

export const fetchAllUsers = (config) => axios.get(`${URL}/users/`, config);

export const fetchAllBookings = () => axios.get(`${URL}/bookings`);

export const fetchBookingStats = () =>
  axios.get(`${URL}/bookings/getBookingStats`);

export const createUser = (data) => axios.post(`${URL}/users`, data);
export const createHotel = (data) => axios.post(`${URL}/hotels`, data);
export const createRoom = (data) => axios.post(`${URL}/rooms`, data);
export const updateUser = (data, id) => axios.patch(`${URL}/users/${id}`, data);
export const updateHotel = (data, id) =>
  axios.patch(`${URL}/hotels/${id}`, data);
export const updateRoom = (data, id) => axios.patch(`${URL}/rooms/${id}`, data);
export const deleteRoom = (id) => axios.delete(`${URL}/rooms/${id}`);
export const deleteHotel = (id) => axios.delete(`${URL}/hotels/${id}`);
export const getCities = () => axios.get(`${URL}/cities`);
