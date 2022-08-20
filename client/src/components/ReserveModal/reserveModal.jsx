import React from "react";
import "./reserveModal.css";
import { GiCheckMark } from "react-icons/gi";

import { Outlet, useLocation } from "react-router-dom";

const ReserveModal = () => {
  const data = useLocation();

  return (
    <div className="reserve">
      <div className="rContainer">
        <div className="stages">
          {data.pathname === "/reserve/roomSelect" ||
          data.pathname === "/reserve/payment" ? (
            <div className="stageCircle stageChecked">
              <GiCheckMark />
            </div>
          ) : (
            <div className="stageCircle">1</div>
          )}
          {data.pathname === "/reserve/payment" ? (
            <div className="stageCircle stageChecked">
              <GiCheckMark />
            </div>
          ) : (
            <div className="stageCircle">2</div>
          )}

          <div className="stageCircle">3</div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default ReserveModal;
