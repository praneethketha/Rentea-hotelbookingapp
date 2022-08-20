import React, { useContext, useState } from "react";
import * as api from "../services";
import { useEffect } from "react";
import { useCallback } from "react";

const BookingContext = React.createContext();

export const useBooking = () => {
  return useContext(BookingContext);
};

const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [bookingStats, setBookingStats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllBookings = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await api.fetchAllBookings();
      setBookings(data.data);
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  }, []);

  const getBookingStats = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await api.fetchBookingStats();
      setBookingStats(data.data);
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  });

  useEffect(() => {
    getAllBookings();
    getBookingStats();
  }, []);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        bookingStats,
        isLoading,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;
