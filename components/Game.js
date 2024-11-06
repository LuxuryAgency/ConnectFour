import React, { useState } from 'react';
import './Game.css';

const Game = () => {
  const initialBoard = () => Array(6).fill(Array(7).fill(null));
  const [board, setBoard] = useState(initialBoard());
  const [player, setPlayer] = useState('Red');
  const [winner, setWinner] = useState(null);

  const dropDisc = (col) => {
    if (winner) return; // Ne engedjünk több lépést, ha már van nyertes

    const newBoard = board.map(row => [...row]);

    for (let row = 5; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = player;
        break;
      }
    }

    setBoard(newBoard);

    if (checkWin(newBoard, player)) {
      setWinner(player);
    } else {
      setPlayer(player === 'Red' ? 'Yellow' : 'Red');
    }
  };

  const checkWin = (board, player) => {
    // Ellenőrizzük a vízszintes nyerést
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          board[row][col] === player &&
          board[row][col + 1] === player &&
          board[row][col + 2] === player &&
          board[row][col + 3] === player
        ) {
          return true;
        }
      }
    }

    // Ellenőrizzük a függőleges nyerést
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 7; col++) {
        if (
          board[row][col] === player &&
          board[row + 1][col] === player &&
          board[row + 2][col] === player &&
          board[row + 3][col] === player
        ) {
          return true;
        }
      }
    }

    // Ellenőrizzük az átlós nyerést (balról jobbra)
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          board[row][col] === player &&
          board[row + 1][col + 1] === player &&
          board[row + 2][col + 2] === player &&
          board[row + 3][col + 3] === player
        ) {
          return true;
        }
      }
    }

    // Ellenőrizzük az átlós nyerést (jobbról balra)
    for (let row = 3; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          board[row][col] === player &&
          board[row - 1][col + 1] === player &&
          board[row - 2][col + 2] === player &&
          board[row - 3][col + 3] === player
        ) {
          return true;
        }
      }
    }

    return false;
  };

  const resetGame = () => {
    setBoard(initialBoard());
    setPlayer('Red');
    setWinner(null);
  };

  return (
    <div className="game">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div key={colIndex} className="cell" onClick={() => dropDisc(colIndex)}>
              {cell && <div className={`disc ${cell.toLowerCase()}`}></div>}
            </div>
          ))}
        </div>
      ))}
      {winner ? <p>{winner} wins!</p> : <p>Current Player: {player}</p>}
      <button onClick={resetGame}>Újraindítás</button>
    </div>
  );
};

export default Game;
