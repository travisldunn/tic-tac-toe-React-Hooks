import React, { useState } from "react";
import "./App.css";
import { calculateWinner } from "./helper/calculateWinner";

const App = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);

  const handleClick = (i) => {
    const historyStep = history.slice(0, stepNumber + 1);
    const current = historyStep[historyStep.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = xIsNext ? "X" : "O";

    setHistory([...historyStep, { squares }]);
    setStepNumber(historyStep.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (i) => {
    setStepNumber(i);
    setXisNext(i % 2 === 0);
  };

  const renderSquare = (i) => {
    return (
      <button className="square" onClick={() => handleClick(i)}>
        {history[stepNumber].squares[i]}
      </button>
    );
  };

  const winner = calculateWinner(history[stepNumber].squares);

  return (
    <>
      <div className="game-board">
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
      <div className="game-info">
        <div>
          {winner
            ? `Winner ${winner}`
            : "Next player: " + (xIsNext ? "X" : "O")}
        </div>
        <ol>
          {history.map((step, i) => (
            <li key={i}>
              <button onClick={() => jumpTo(i)}>
                {i ? `Go to move# ${i}` : "Go to game start"}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default App;
