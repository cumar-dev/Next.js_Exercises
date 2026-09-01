import React from "react";

const Real_Time = () => {
  const now = new Date().toLocaleTimeString();
  return <p>Current server time: {now}</p>;
};

export default Real_Time;
