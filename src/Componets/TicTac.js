import { useState, useEffect, useRef } from "react";

// Square component
function Square({ value, onSquareClick, soundEffect }) {
  return (
    <button
      className="square"
      onClick={() => {
        soundEffect(); // Play sound effect
        onSquareClick(); // Handle the square click
      }}
    >
      {value}
    </button>
  );
}

// Main Board component
export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  // Using useRef to store the audio objects
  const clickSoundRef = useRef(null);
  const winSoundRef = useRef(null);

  // Initialize sound effects in useEffect
  useEffect(() => {
    clickSoundRef.current = new Audio(
      "http://127.0.0.1:5500/src/Componets/click.mp3"
    );
    winSoundRef.current = new Audio(
      "http://127.0.0.1:5500/src/Componets/winner.mp3"
    );

    // Preload the sounds
    clickSoundRef.current.preload = "auto";
    winSoundRef.current.preload = "auto";
  }, []); // Only run once when the component mounts

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleRestart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
    winSoundRef.current.play(); // Play the win sound when there's a winner
  } else if (squares.every(Boolean)) {
    status = "Draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="status">{status}</div>
        <div className="board-row">
          {squares.map((square, index) => (
            <Square
              key={index}
              value={square}
              onSquareClick={() => handleClick(index)}
              soundEffect={() => clickSoundRef.current.play()} // Play click sound
            />
          ))}
        </div>
        <button className="restart" onClick={handleRestart}>
          Restart Game
        </button>
      </div>
    </>
  );
}

// Function to calculate the winner
function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
