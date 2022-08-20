import React, { useEffect, useState } from "react";
import { useAdminContext } from "../../store/adminContext";
import { useBooking } from "../../store/bookingContext";
import { useUser } from "../../store/userContext";
import LineChart from "../LineChart/lineChart";
import { useHotel } from "./../../store/hotelContext";
import "./adminDashboard.css";

const AdminDashboard = () => {
  const { activeMenu } = useAdminContext();
  const { hotels } = useHotel();
  const { bookings, bookingStats } = useBooking();
  const { users } = useUser();
  const [label, setLabel] = useState([]);
  const [data, setData] = useState([]);

  const getBookings_data = () => {
    let labels = bookingStats.map((item) => item._id);
    let data = bookingStats.map((item) => item.sumAmount);
    let data1 = bookingStats.map((item) => item.numBookings);
    setLabel(labels);
    setData([data, data1]);
  };

  let totalAmount = 0;
  bookings.forEach((item) => {
    totalAmount += item.amount;
  });

  useEffect(() => {
    getBookings_data();
  }, []);

  return (
    <div className="dashboard" style={{ width: activeMenu ? "85vw" : "100vw" }}>
      <div className="dashboard-top pt-5">
        <div className="dashboard-top-first">
          <p className="pt-2">Total amount</p>
          <h1 className="pt-2">₹{totalAmount}</h1>
        </div>
        <div className="dashboard-top-second">
          <i className="pt-3 fa-solid fa-user-group"></i>
          <h4 className="pt-2">{users.length}</h4>
          <p className="">Customers</p>
        </div>
        <div className="dashboard-top-third">
          <i className="pt-3 fa-solid fa-house"></i>
          <h4 className="pt-2">{hotels.length}</h4>
          <p className="">Hotels</p>
        </div>
        <div className="dashboard-top-fourth">
          <i className="pt-3 fa-solid fa-bookmark"></i>
          <h4 className="pt-2">{bookings.length}</h4>
          <p className="">Bookings</p>
        </div>
      </div>
      <div className="dashboard-bottom mt-3">
        <LineChart
          label={label}
          data={data}
          labels={["number of bookings", "bookings amount"]}
          main_label={"Day Wise Bookings"}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
