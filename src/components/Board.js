import React, { useState, useCallback, useMemo } from "react";
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

  const resetGame = useCallback(() => {
    setSquares(() => initialSquares);
  }, [initialSquares]);

  const renderTie = useCallback(
    () => (
      <span>
        Tied
        <button className="new-game" onClick={() => resetGame()}>
          New Game
        </button>
      </span>
    ),
    [resetGame]
  );

  const renderWinner = useCallback(
    () => (
      <span>
        {`Winner ${winner}`}
        <button className="new-game" onClick={() => resetGame()}>
          New Game
        </button>
      </span>
    ),
    [resetGame, winner]
  );

  const getStatus = useCallback(
    (winner, squares) => {
      if (winner) {
        return renderWinner();
      } else if (squares.every(Boolean)) {
        return renderTie();
      } else {
        return `Next player is ${isXNext ? "X" : "O"}`;
      }
    },
    [isXNext, renderTie, renderWinner]
  );

  const renderSquare = index => (
    <button className="square" onClick={() => selectSquare(index)}>
      {squares[index]}
    </button>
  );

  const status = useMemo(() => getStatus(winner, squares), [
    getStatus,
    squares,
    winner
  ]);

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
