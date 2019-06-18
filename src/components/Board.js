import React, { useState, useCallback } from "react";
import "./Board.css";
import calculateWinner from "../utils/calculateWinner";

const Board = () => {
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);

  const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);
    const toggle = useCallback(() => setState(s => !s), []);
    return [state, toggle];
  };

  const [isXNext, toggleIsXNext] = useToggle(true);

  const winner = calculateWinner(squares);

  const selectSquare = square => {
    if (winner || squares[square]) {
      return;
    }
    setSquares(s => {
      const squaresCopy = [...s];
      squaresCopy[square] = isXNext ? "X" : "O";
      return squaresCopy;
    });
    toggleIsXNext();
  };

  const getStatus = (winner, squares) => {
    if (winner) {
      return renderWinner();
    } else if (squares.every(Boolean)) {
      return renderTie();
    } else {
      return `Next player is ${isXNext ? "X" : "O"}`;
    }
  };

  const renderSquare = index => (
    <button className="square" onClick={() => selectSquare(index)}>
      {squares[index]}
    </button>
  );

  const resetGame = () => {
    setSquares(() => initialSquares);
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

  return (
    <div className="Board">
      <div className="status">{getStatus(winner, squares)}</div>
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
