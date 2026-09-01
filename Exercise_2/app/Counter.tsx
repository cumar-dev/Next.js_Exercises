"use client";
import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState<number>(0);
  const handleAdd = (): void => {
    setCount(count + 1);
  };
  return (
    <div>
      <h1>count: {count}</h1>
      <button onClick={handleAdd}>incriment</button>
    </div>
  );
};

export default Counter;
