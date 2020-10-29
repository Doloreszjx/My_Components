import React, { Component } from "react";

import Board from "./Board";
import "./Game.css";

class Game extends Component {
  // history数组中保存了历史的全部棋盘信息；
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
      stepNumber: 0,
    };
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.whoIsWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to step " + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.handleJumpTo(move)} className="step-word">
            {move === 0 ? `重新开始 --- ${desc}` : `第${move}步 --- ${desc}`}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner is: " + winner;
    } else {
      status = "Next one is:" + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game-wrapper">
        <div className="game-status">{status}</div>
        <div className="game-board">
          <Board
            squares={current.squares}
            handleItemClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">{moves}</div>
      </div>
    );
  }

  // 控制落子时间
  // xIsNext: 落X, !xIsNext: 落O
  // history: 记录了全部的历史棋盘
  // current: 当前棋盘
  // stepNumber: 第几步，从0开始。因此最新步数等于历史长度
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (this.whoIsWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  // 判断胜负
  // winner数组是所有可以获胜的棋盘
  // 如果三个落子是相同的，那么获胜
  whoIsWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
  // 历史棋盘回退
  handleJumpTo(stepNumber) {
    this.setState({
      stepNumber: stepNumber,
      xIsNext: stepNumber % 2 === 0,
    });
    console.log(this.state.xIsNext);
  }
}

export default Game;
