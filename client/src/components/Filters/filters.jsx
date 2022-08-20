import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import { BsStarFill } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import Slider from "@mui/material/Slider";

import { useReserve } from "../../store/reserveContext";
import { styled } from "@mui/material";
import { useHotel } from "../../store/hotelContext";
import { useEffect } from "react";

const CustomSlider = styled(Slider)({
  color: "#52af77",
});

const Filters = ({ setOpen }) => {
  const {
    hotels,
    cities,
    priceRange,
    setPriceRange,
    filterChange,
    getHotelsByFilters,
    value,
  } = useHotel();

  const handleChange = (event, newValue) => {
    setPriceRange(newValue);
  };
  const { rating, setRating } = useReserve();

  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setRating(value);
  };

  useEffect(() => {
    setPriceRange([hotels[0].basePrice, hotels[hotels.length - 1].basePrice]);
  }, []);

  return (
    <div className="reserve filters">
      <div className="rContainer hContainer">
        <IoCloseCircle className="rClose" onClick={() => setOpen(false)} />
        <span>Filter by:</span>
        <section className="text-center">
          {stars.map((_, index) => {
            return (
              <BsStarFill
                key={index}
                className="defualtStar"
                color={rating > index ? "#ffe234" : "#cdcdcd"}
                onClick={() => handleClick(index + 1)}
              />
            );
          })}
        </section>
        <Form
          className="mt-3"
          //   onChange={(e) => reviewChange(e)}
          onSubmit={(e) => {
            getHotelsByFilters(e);
            setOpen(false);
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label className="mb-0">City</Form.Label>
            <Form.Select onChange={(e) => filterChange(e)}>
              <option value="" defaultChecked>
                All
              </option>
              {cities.map((item) => (
                <option value={item.name} key={item._id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3 price-range">
            <Form.Label>Price</Form.Label>
            <CustomSlider
              value={priceRange}
              onChange={handleChange}
              valueLabelDisplay="auto"
              min={value[0]}
              max={value[1]}
            />
          </Form.Group>

          <button type="submit" className="rButton">
            Submit
            {/* {requesting ? <i className="fa fa-spinner fa-spin"></i> : "Submit"} */}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Filters;
