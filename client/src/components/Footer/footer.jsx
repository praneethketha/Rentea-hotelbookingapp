import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer py-2">
      <p>
        copyright @
        <Link
          to="/"
          className="text-black text-decoration-none"
          style={{ fontWeight: "600" }}
        >
          Rentea
        </Link>{" "}
        2022
      </p>
    </div>
  );
};

export default Footer;
