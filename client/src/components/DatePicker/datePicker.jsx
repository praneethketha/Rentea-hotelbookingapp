import React from "react";
import { DateRange } from "react-date-range";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useReserve } from "../../store/reserveContext";
import { Link, useNavigate } from "react-router-dom";

const DatePicker = () => {
  const { range, setRange, getDatesInRange, setAlldates } = useReserve();

  const navigate = useNavigate();
  const handleChange = (item) => {
    setRange([item.selection]);
    const dates = getDatesInRange(
      [item.selection][0].startDate,
      [item.selection][0].endDate
    );
    setAlldates(dates);
    console.log(dates);
  };

  return (
    <>
      <span>Select your dates:</span>
      <div className="rRoomContainer">
        <div className="p-2">
          <DateRange
            onChange={(item) => handleChange(item)}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            minDate={new Date(Date.now())}
            direction="horizontal"
            className="calendarElement"
          />
          <div className="rButtons">
            <button className="rButton2" onClick={() => navigate(-1)}>
              Back
            </button>
            <Link to="roomSelect" className="rButton">
              Next
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DatePicker;
