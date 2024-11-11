import React from "react";
import Spinner from "react-bootstrap/Spinner";
const Spinners = () => {
  return (
    <div className="text-center">
      {/* <Spinner animation="border" variant="danger" /> */}
      <Spinner animation="grow" size="lg" />
    </div>
  );
};
export default Spinners;
