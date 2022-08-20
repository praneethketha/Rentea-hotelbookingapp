import React from "react";
import { Container } from "react-bootstrap";
import Grid from "../Grid/grid";

import "./popular.css";
import { useHotel } from "../../store/hotelContext";
import Loading from "../Loading/loading";

const Popular = () => {
  const { cities } = useHotel();
  return !cities.length ? (
    <Loading />
  ) : (
    <Container className="my-4">
      <div className="w-85 mx-auto">
        <h2 className="popular-heading">Featured Cities</h2>
        <Grid flexDirection="row" cities={cities.slice(0, 5)} />
        <Grid flexDirection="row-reverse" cities={cities.slice(5, 10)} />
      </div>
    </Container>
  );
};

export default Popular;
