import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import logo from "./../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/authContext";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Header = () => {
  const { userId, handleLogOut, currentUser } = useAuth();

  const navigate = useNavigate();

  const handleBookNow = () => {
    if (userId) {
      navigate("/hotels", { state: "default" });
    } else {
      navigate("/auth");
    }
  };

  return (
    <div>
      {/* // <header className="header py-1 bg-dark text-white fixed-top"> */}
      {/* <div className="d-flex align-items-center w-85 mx-auto justify-content-between"> */}
      <nav class="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
        <div className="container">
          <NavLink to="/" className="nav-link logo">
            <img src={logo} alt="logo" />
            Rentea
          </NavLink>
          <button
            class="navbar-toggler text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <HiOutlineMenuAlt3 fontSize={"26px"} />
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav"></div>
            <li
              onClick={() => navigate("/hotels", { state: "default" })}
              className="nav-link mx-2 text-white"
              style={{ cursor: "pointer" }}
            >
              Hotels
            </li>
            {currentUser && currentUser.role === "admin" && (
              <NavLink to="/admin" className="nav-link mx-2 text-white">
                Admin
              </NavLink>
            )}
            {userId && (
              <NavLink to="/profile" className="nav-link mx-2 text-white">
                Profile
              </NavLink>
            )}
            {userId ? (
              <button
                onClick={handleLogOut}
                type="button"
                className="btn btn-outline-light ms-3 book-now"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={handleBookNow}
                type="button"
                className="btn btn-outline-light ms-3 book-now"
              >
                Book Now
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
