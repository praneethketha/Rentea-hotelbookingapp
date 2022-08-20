import React from "react";
import { NavLink } from "react-router-dom";
import { useHotel } from "../../store/hotelContext";

import "./grid.css";

const Grid = ({ flexDirection, cities }) => {
  const { setSearchTerm } = useHotel();

  return (
    cities && (
      <div
        className="grid"
        style={{
          display: "flex",
          flexDirection: flexDirection,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <div>
          <NavLink
            to="hotels"
            className="popular"
            onClick={() => setSearchTerm(cities[0].name)}
          >
            <img src={cities[0].photo} alt="" className="popularImg" />
            <div className="popularTitle">
              <h4>{cities[0].name}</h4>
            </div>
          </NavLink>
          <NavLink
            to="hotels"
            className="popular"
            onClick={() => setSearchTerm(cities[1].name)}
          >
            <img src={cities[1].photo} alt="" className="popularImg" />
            <div className="popularTitle">
              <h4>{cities[1].name}</h4>
            </div>
          </NavLink>
        </div>
        <div>
          <NavLink
            to="hotels"
            className="popular"
            onClick={() => setSearchTerm(cities[2].name)}
          >
            <img src={cities[2].photo} alt="" className="popularImg" />
            <div className="popularTitle">
              <h4>{cities[2].name}</h4>
            </div>
          </NavLink>

          <NavLink
            to="hotels"
            className="popular"
            onClick={() => setSearchTerm(cities[3].name)}
          >
            <img src={cities[3].photo} alt="" className="popularImg" />
            <div className="popularTitle">
              <h4>{cities[3].name}</h4>
            </div>
          </NavLink>
        </div>

        <NavLink
          to="hotels"
          className="popular"
          onClick={() => setSearchTerm(cities[4].name)}
        >
          <img src={cities[4].photo} alt="" className="popularImgspecial" />
          <div className="popularTitle">
            <h4>{cities[4].name}</h4>
          </div>
        </NavLink>
      </div>
    )
  );
};

export default Grid;
