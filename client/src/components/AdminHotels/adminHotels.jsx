import React from "react";
import { useAdminContext } from "../../store/adminContext";
import HotelTable from "../Hotel-table/hotelTable";
import "./adminHotel.css";

const AdminHotel = () => {
  const { activeMenu } = useAdminContext();
  return (
    <div
      className="admin-hotel"
      style={{ width: activeMenu ? "85vw" : "100vw" }}
    >
      <div className="pt-5">
        <HotelTable />
      </div>
    </div>
  );
};

export default AdminHotel;
