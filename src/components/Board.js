import React, { useReducer } from "react";
import "./Board.css";
import calculateWinner from "../utils/calculateWinner";

const initialSquares = Array(9).fill(null);

const gameReducer = (state, { type, payload }) => {
  const { squares, isXNext } = state;
  switch (type) {
    case "SELECT_SQUARE":
      const winner = calculateWinner(squares);

      if (winner || squares[payload.square]) {
        return state;
      }
      const squaresCopy = [...squares];
      squaresCopy[payload.square] = isXNext ? "X" : "O";
      return { squares: squaresCopy, isXNext: !isXNext };
    case "RESET_GAME":
      return {
        isXNext: true,
        squares: initialSquares
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

const Board = () => {
  const [{ squares, isXNext }, dispatch] = useReducer(gameReducer, {
    squares: initialSquares,
    isXNext: true
  });

  const winner = calculateWinner(squares);

  const selectSquare = square => {
    dispatch({
      type: "SELECT_SQUARE",
      payload: {
        square
      }
    });
  };

  const resetGame = () => {
    dispatch({
      type: "RESET_GAME"
    });
  };

  const renderTie = () => (
    <span>
      Tied
      <button className="new-game" onClick={() => resetGame()}>
        New Game
      </button>
    </span>
  );

  const renderWinner = () => (
    <span>
      {`Winner ${winner}`}
      <button className="new-game" onClick={() => resetGame()}>
        New Game
      </button>
    </span>
  );

  const renderSquare = index => (
    <button className="square" onClick={() => selectSquare(index)}>
      {squares[index]}
    </button>
  );

  const getStatus = (winner, squares) => {
    if (winner) {
      return renderWinner();
    } else if (squares.every(Boolean)) {
      return renderTie();
    } else {
      return `Next player is ${isXNext ? "X" : "O"}`;
    }
  };

  const status = getStatus(winner, squares);

  return (
    <div className="Board">
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
