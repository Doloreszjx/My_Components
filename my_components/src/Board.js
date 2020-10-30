import React from "react";

import Square from "./Square";
import "./Board.css";

export default function Board(props) {
  const { squares, handleItemClick } = props;

  function renderSquare(index) {
    return (
      <Square
        key={index}
        number={squares[index]}
        handleItemClick={() => handleItemClick(index)}
      />
    );
  }
  return (
    <div className="board-wrapper">
      {Array(3)
        .fill(null)
        .map((itemx, x) => (
          <div className="board-row" key={x}>
            {Array(3)
              .fill(null)
              .map((itemy, y) => renderSquare(3 * x + y))}
          </div>
        ))}
    </div>
  );
}
