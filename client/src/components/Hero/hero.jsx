import React from "react";
import "./hero.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="hero-unit mt-5">
      <div className="hero-titles">
        <h1>Spend Quality Holidays With Us.</h1>
        <p className="mt-2">The best hotel details from all the hotels.</p>
        <button
          className="btn mt-2"
          onClick={() => navigate("/hotels", { state: "default" })}
        >
          Reserve Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
