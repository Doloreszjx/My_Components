import React from "react";

import "./Square.css";

export default function Square(props) {
  const { number, handleItemClick } = props;

  return (
    <div className="square" onClick={handleItemClick}>
      {number}
    </div>
  );
}
