import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useAuth } from "../../store/authContext";

const Deactivate = ({ setOpen }) => {
  const { handleDeactivate } = useAuth();
  return (
    <div className="reserve filters">
      <div className="rContainer dContainer">
        <IoCloseCircle className="rClose" onClick={() => setOpen(false)} />
        <form onSubmit={handleDeactivate}>
          <p>Please confirm to deactivate your rentea account!!!</p>
          <button className="rButton dButton">Deactivate</button>
        </form>
      </div>
    </div>
  );
};

export default Deactivate;
