import React from "react";
import { useNavigate } from "react-router-dom";
import { CardElement } from "@stripe/react-stripe-js";
import { useHotel } from "../../store/hotelContext";
import { BiRupee } from "react-icons/bi";
import { useReserve } from "../../store/reserveContext";
import { useEffect } from "react";

const Payment = () => {
  const { currentHotel } = useHotel();
  const {
    selectedRooms,
    setSelectedRooms,
    grandTotal,
    range,
    alldates,
    getPaymentKey,
    handlePayment,
    requesting,
  } = useReserve();

  useEffect(() => {
    getPaymentKey();
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <span className="border-bottom">Payment Details</span>
      <div className="rDetails p-0 m-0 mt-3">
        <h6 className="text-uppercase">{currentHotel.name}</h6>
        <section className="d-flex justify-content-between align-items-center gap-5">
          <div className="rCard px-4 py-2 m-0">
            <p>Check In</p>
            <article className="d-flex align-items-start">
              <p>{range[0].startDate.getDate()}</p>
              <p>
                {String(range[0].startDate).split(" ")[1]}'
                {range[0].startDate.getYear()}
              </p>
            </article>
          </div>
          <div className="rCard px-4 py-2 m-0">
            <p>Check Out</p>
            <article className="d-flex align-items-start">
              <p>{range[0].endDate.getDate()}</p>
              <p>
                {String(range[0].endDate).split(" ")[1]}'
                {range[0].endDate.getYear()}
              </p>
            </article>
          </div>
        </section>
        {selectedRooms.map((item) => (
          <div
            className="rFinalRooms d-flex justify-content-between p-2 mt-3 m-0"
            key={item._id}
          >
            <section className="p-0 m-0">
              <p>{item.title}</p>
              <p>per {alldates.length} days</p>
            </section>
            <p className="d-flex justify-content-center align-items-center">
              <BiRupee />
              {alldates.length} * {item.price}
            </p>
          </div>
        ))}

        <div className="rTotalPrice d-flex justify-content-between align-items-end p-2 m-0">
          <p>Grand Total:</p>
          <p className="d-flex justify-content-center align-items-center">
            <BiRupee />
            {grandTotal * alldates.length}
          </p>
        </div>
      </div>

      <div className="my-2 p-2">
        <span style={{ fontWeight: 500 }}>Card Details:</span>
        <CardElement className="mt-2" />
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
        <button
          className="rButton"
          onClick={(e) => handlePayment(e, currentHotel)}
        >
          {requesting ? <i className="fa fa-spinner fa-spin"></i> : "Checkout"}
        </button>
      </div>
    </>
  );
};

export default Payment;
