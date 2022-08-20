import React from "react";
import { Button } from "react-bootstrap";
import { IoExitOutline } from "react-icons/io5";

import { NavLink } from "react-router-dom";
import { useAdminContext } from "../../store/adminContext";
import { useAuth } from "../../store/authContext";
import "./adminSidebar.css";

const AdminSidebar = () => {
  const { activeMenu } = useAdminContext();
  const { handleLogOut } = useAuth();

  return (
    <div>
      <div
        className="admin-sidebar me-1"
        style={{
          width: activeMenu ? "200px" : "0px",
        }}
      >
        <div className="d-flex justify-content-between align-content-center pt-4">
          <NavLink
            to="/"
            className="ms-4 rentea-logo"
            style={{ display: activeMenu ? "inline" : "none" }}
          >
            <p
              style={{ display: activeMenu ? "inline" : "none" }}
              className=" logo"
            >
              Rentea
            </p>
          </NavLink>
        </div>

        <ul className="list-style-none admin-sidebar-list ps-2">
          <p className="mb-2 mt-5 text-secondary">Dashboard</p>
          <NavLink className="d-flex admin-sidebar-link me-1 " to="">
            <i
              className="pe-3 ps-4  mt-auto mb-auto fa-solid fa-table-cells-large "
              style={{ textAlign: activeMenu ? "" : "center" }}
            ></i>

            <p
              style={{
                display: activeMenu ? "inline" : "none",
              }}
              className="mt-auto mb-auto"
            >
              Dashboard{" "}
            </p>
          </NavLink>

          <p className="mt-5 mb-2 text-secondary">Pages</p>
          <NavLink
            className=" d-flex admin-sidebar-link me-1 mb-3"
            to="booking"
          >
            <i className="pe-3 ps-4 pt-1 mt-auto mb-auto fa-solid fa-bookmark"></i>
            <p
              style={{ display: activeMenu ? "inline" : "none" }}
              className="mt-auto mb-auto"
            >
              Bookings
            </p>
          </NavLink>

          <NavLink className="d-flex admin-sidebar-link me-1 mb-3" to="hotels">
            <i className="pe-3 ps-4 mt-auto mb-auto fa-solid fa-house"></i>{" "}
            <p
              style={{ display: activeMenu ? "inline" : "none" }}
              className="pt-1 mt-auto mb-auto"
            >
              Hotels
            </p>
          </NavLink>

          <NavLink
            className="d-flex admin-sidebar-link me-1 mb-3"
            to="customers"
          >
            <i className="pe-3 ps-4 pt-1 mt-auto mb-auto fa-solid fa-user-group"></i>{" "}
            <p
              style={{ display: activeMenu ? "inline" : "none" }}
              className="mt-auto mb-auto"
            >
              Customers
            </p>
          </NavLink>
        </ul>

        <Button
          variant="danger"
          className=" logout-button ms-2 me-5"
          style={{ width: activeMenu ? "190px" : "0px" }}
          onClick={handleLogOut}
        >
          <IoExitOutline className="me-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
