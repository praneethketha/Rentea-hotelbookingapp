import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar/adminSidebar";
import AdminHeader from "../../components/AdminHeader/adminHeader";
import "./admin.css";

const Admin = () => {
  return (
    <div className="admin d-flex">
      <div>
        <AdminSidebar />
      </div>

      <div>
        <AdminHeader />
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Admin;
