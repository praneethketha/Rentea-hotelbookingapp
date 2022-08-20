import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/authContext";
import Deactivate from "../Deactivate/deactivate";
import "./sidebar.css";

const ProfileSidebar = () => {
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <ul className="sidebar-list">
        <NavLink className="sidebar-list-item profile-link" to="">
          <i className="sidebar-icon fa-solid fa-circle-user  pe-2 ps-2"></i>
          <p className="sidebar-heading">Profile</p>
        </NavLink>
        {currentUser.role === "admin" || (
          <NavLink className="sidebar-list-item" to="timeline">
            <i className="sidebar-icon fa-solid fa-clock  pe-2 ps-2"></i>
            <p className="sidebar-heading"> TimeLine</p>
          </NavLink>
        )}
        <NavLink className="sidebar-list-item" to="edit">
          <i className="sidebar-icon fa-solid fa-pen-to-square  pe-2 ps-2"></i>
          <p className="sidebar-heading">Edit-Profile</p>
        </NavLink>
        <NavLink className="sidebar-list-item" to="change-password">
          <i className="sidebar-icon fa-solid fa-key  pe-2 ps-2"></i>
          <p className="sidebar-heading">Change Password</p>
        </NavLink>
        {currentUser.role === "admin" || (
          <li
            className="sidebar-list-item  deactivate"
            onClick={() => setOpen(true)}
          >
            <i className="sidebar-icon fa-solid fa-circle-xmark  pe-2 ps-2"></i>
            <p className="sidebar-heading">Deactivate</p>
          </li>
        )}
      </ul>
      {open && <Deactivate setOpen={setOpen} />}
    </div>
  );
};

export default ProfileSidebar;
