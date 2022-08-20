import React from "react";
import { useAdminContext } from "../../store/adminContext";
import CustomerTable from "../CustomerTable/customerTable";
import "./adminCustomers.css";

const AdminCustomers = () => {
  const { activeMenu } = useAdminContext();
  return (
    <div
      className="admin-customer "
      style={{ width: activeMenu ? "85vw" : "100vw" }}
    >
      <div className="pt-5">
        <CustomerTable />
      </div>
    </div>
  );
};

export default AdminCustomers;
