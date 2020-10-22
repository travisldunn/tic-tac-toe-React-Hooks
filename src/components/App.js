import React, { useState } from "react";
import "./App.css";
import { winner } from "./winner";

const App = () => {
  const [boards, setBoard] = useState([{ board: new Array(9).fill(null) }]);
  const [step, setstep] = useState(0);

  const handleClick = (i) => {
    const currentBoard = [...boards[step].board];

    if (currentBoard[i] || winner(currentBoard)) return;
    currentBoard[i] = step % 2 === 0 ? "X" : "0";

    setBoard([...boards.slice(0, step + 1), { board: currentBoard }]);
    setstep((step) => step + 1);
  };

  const renderSquare = (i) => {
    const square = boards[step].board[i];
    return <button onClick={() => handleClick(i)}>{square}</button>;
  };

  const won = winner(boards[step].board);

  return (
    <>
      <div className="board">
        <p>
          {!won
            ? `Player ${step % 2 === 0 ? "X's" : "O's"} turn`
            : `${won} wins!`}
        </p>
        <div>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="goTo">
        {boards.map((s, i) => {
          return (
            <div key={i} onClick={() => setstep(i)}>
              {i ? `Go to step# ${i}` : "Go to start"}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
