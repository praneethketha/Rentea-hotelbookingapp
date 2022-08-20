import React, { useContext, useState } from "react";
import * as api from "./../services";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { format } from "date-fns";
const ReserveContext = React.createContext();

export const useReserve = () => {
  return useContext(ReserveContext);
};

const ReserveProvider = ({ children }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { config } = useAuth();

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [review, setReview] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [rating, setRating] = useState(0);
  const [alldates, setAlldates] = useState([]);
  const [clientSecret, setClientSecret] = useState("");

  const navigate = useNavigate();

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = JSON.parse(e.target.value);

    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item._id !== value._id)
    );

    setGrandTotal(
      checked ? grandTotal + value.price : grandTotal - value.price
    );
  };

  const reviewChange = (e) => {
    setReview(e.target.value);
  };

  // 1) initializing our payment -> backend -> secrete code
  // 2) confirming the payment with the help of secretcode
  // 3) updating the room availability -> booking document
  // 4) sending the payment mail to user

  // it will get a key from the backend that genearte from the amount we send
  const getPaymentKey = async () => {
    try {
      const { data } = await api.fetchPaymentKey({
        amount: grandTotal * alldates.length,
      });

      setClientSecret(data.data.clientSecret);
    } catch (error) {
      alert(error);
    }
  };

  const handlePayment = async (e, hotel) => {
    e.preventDefault();
    try {
      let rooms = "";
      setRequesting(true);
      await stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        })
        .then((result) => {
          selectedRooms.forEach(async (item) => {
            rooms += `${item.room} `;

            await api.bookNow(
              config,
              {
                hotel: hotel._id,
                dates: alldates,
                amount: item.price * alldates.length,
              },
              item._id
            );
          });
        });
      setRequesting(false);
      navigate("/");

      handlePaymentMail({
        hotel: hotel.name,
        amount: grandTotal * alldates.length,
        rooms,
      });
    } catch (error) {
      alert(error);
    }
  };

  const handlePaymentMail = async (data) => {
    try {
      const dates =
        format(range[0].startDate, "dd/MM/yyyy") +
        "-" +
        format(range[0].endDate, "dd/MM/yyyy");

      await api.sendPaymentMail(config, { ...data, dates });
    } catch (error) {
      alert(error);
    }
  };

  const handleReview = async (e, hotel) => {
    e.preventDefault();
    try {
      setRequesting(true);
      await api.rateNow(config, { review, rating, hotel });
    } catch (error) {
      console.log(error.response);
      alert(error);
    }
    setRequesting(false);
  };

  return (
    <ReserveContext.Provider
      value={{
        range,
        rating,
        requesting,
        selectedRooms,
        grandTotal,
        setRange,
        setSelectedRooms,
        setRating,
        reviewChange,
        isAvailable,
        handleSelect,
        handleReview,
        handlePayment,
        getPaymentKey,
        getDatesInRange,
        alldates,
        setAlldates,
      }}
    >
      {children}
    </ReserveContext.Provider>
  );
};

export default ReserveProvider;
