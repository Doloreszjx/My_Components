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
      lastIndex: 0,
      isSort: true,
    };
  }
  render() {
    const { history, xIsNext, stepNumber, isSort } = this.state;
    const current = history[stepNumber];
    const winner = this.whoIsWinner(current.squares);

    const moves = history.map((step, index) => {
      const desc = index
        ? "Go to step " +
          index +
          `最后落子点: (${parseInt(step.lastIndex / 3)}, ${step.lastIndex % 3})`
        : "Go to game start";
      return (
        <li key={index}>
          <button
            onClick={() => this.handleJumpTo(index)}
            className="step-word"
            style={{ fontWeight: index === stepNumber ? "700" : "" }}
          >
            {index === 0 ? `重新开始 --- ${desc}` : `第${index}步 --- ${desc}`}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner is: ${winner.winnerCharactor}!!!!`;
    } else if (history.length >= 9) {
      status = "No one is winner, it ends in a draw";
    } else {
      status = "Next one is:" + (xIsNext ? "X" : "O");
    }

    return (
      <div className="game-wrapper">
        <div className="game-status" style={{ color: winner ? "#ff7500" : "" }}>
          {status}
        </div>
        <div className="game-board">
          <Board
            winnerPosition={winner ? winner.winnerIndex : ""}
            squares={current.squares}
            handleItemClick={(index) => this.handleClick(index)}
          />
        </div>
        <div className="game-info">
          <button
            className="game-button"
            onClick={() => this.handleChangeSort()}
          >
            {isSort ? "倒序" : "正序"}
          </button>
          {isSort ? moves : moves.reverse()}
        </div>
      </div>
    );
  }

  // 控制落子时间
  // xIsNext: 落X, !xIsNext: 落O
  // history: 记录了全部的历史棋盘
  // current: 当前棋盘
  // stepNumber: 第几步，从0开始。因此最新步数等于历史长度
  handleClick(index) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (this.whoIsWinner(squares) || squares[index]) {
      return;
    }

    squares[index] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([
        {
          squares: squares,
          lastIndex: index,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  // 历史棋盘回退
  handleJumpTo(stepNumber) {
    this.setState({
      stepNumber: stepNumber,
      xIsNext: stepNumber % 2 === 0,
    });
  }

  //改变历史记录的排列顺序
  // isSort: 正序; !isSort: 逆序
  handleChangeSort() {
    this.setState({
      isSort: !this.state.isSort,
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
        return {
          winnerCharactor: squares[a],
          winnerIndex: [a, b, c],
        };
      }
    }
    return null;
  }
}

export default Game;
