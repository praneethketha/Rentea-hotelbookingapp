import React from "react";
import "./timeline.css";

import { useAuth } from "./../../store/authContext";

const TimeLine = () => {
  const { currentUser } = useAuth();
  return (
    <div>
      <div class="timeline-container">
        <div class="timeline">
          <ul>
            {currentUser.bookings.length ? (
              currentUser.bookings.map((item) => (
                <li key={item._id}>
                  <div class="timeline-content">
                    <p>
                      You have booked a room at hotel {item.hotel.name} for{" "}
                      {item.amount} per day.
                    </p>
                    <p class="date">
                      {
                        String(new Date(item.from).toLocaleString()).split(
                          ","
                        )[0]
                      }{" "}
                      -{" "}
                      {String(new Date(item.to).toLocaleString()).split(",")[0]}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <h4>No Bookings to display!</h4>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
