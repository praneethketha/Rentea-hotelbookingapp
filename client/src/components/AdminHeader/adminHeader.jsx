import React from "react";
import { FaBars } from "react-icons/fa";

import profile from "../../assets/tom.jpg";

import { useAdminContext } from "../../store/adminContext";
import "./adminHeader.css";

const AdminHeader = () => {
  const { setActiveMenu } = useAdminContext();

  return (
    <div className="admin-header d-flex justify-content-between pt-4 ps-4">
      <div className="d-flex admin-header-left">
        <FaBars
          className="admin-header-icons"
          onClick={() => {
            setActiveMenu((prevActiveMenu) => !prevActiveMenu);
          }}
        />
      </div>
      <div className="admin-header-right d-flex">
        <img
          src={profile}
          alt=""
          className="admin-header-profile me-2"
          width="10%"
        />
        <p className="mb-0">Hi, Admin</p>
      </div>
    </div>
  );
};

export default AdminHeader;
