import React from "react";
import "./notFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="error_page">
      <div className="error_img">
        <h1>404</h1>
        <div className="error_info">
          <p>Look like you're lost</p>
          <p>the page you are looking for not available!</p>
          <Link to="/" className="rButton2">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
