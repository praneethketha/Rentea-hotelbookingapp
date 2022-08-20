import React from "react";
import { useAdminContext } from "../../store/adminContext";
import BookingTable from "../Booking-table/bookingTable";
import "./adminBooking.css";

const AdminBookin = () => {
  const { activeMenu } = useAdminContext();
  return (
    <div
      className="admin-booking"
      style={{ width: activeMenu ? "85vw" : "100vw" }}
    >
      <div className="pt-5">
        <BookingTable />
      </div>
    </div>
  );
};

export default AdminBookin;
