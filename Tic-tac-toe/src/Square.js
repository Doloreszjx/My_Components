import React from "react";

import "./Square.css";

export default function Square(props) {
  const { number, winnerPosition, handleItemClick } = props;

  for (let i of winnerPosition) {
    document.getElementsByClassName("square")[i].style =
      "background: #e2e2; color: #ff7500";
  }

  return (
    <div className="square" onClick={handleItemClick}>
      {number}
    </div>
  );
}
