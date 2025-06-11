import React, { useState } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinningLine(line);
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) setWinner(gameWinner);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine([]);
  };

  const renderSquare = (index) => {
    const value = board[index];
    const isWinning = winningLine.includes(index);
    return (
      <button
        key={index}
        className={`
          w-20 h-20 sm:w-24 sm:h-24
          ${isWinning ? 'bg-yellow-100 animate-pulse' : 'bg-gradient-to-br from-pink-50 to-gray-100'}
          hover:bg-pink-200 border-3 border-gray-300
          rounded-2xl flex items-center justify-center
          text-3xl sm:text-4xl font-bold
          transition-all duration-300 hover:scale-110 hover:shadow-lg
          active:scale-95
          ${!value && !winner ? 'hover:border-pink-400' : ''}
          ${winner ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
        onClick={() => handleClick(index)}
        disabled={!!winner || !!value}
        style={{
          boxShadow: isWinning ? '0 0 20px rgba(255, 215, 0, 0.6)' : '0 4px 15px rgba(0, 0, 0, 0.05)'
        }}
      >
        {value === 'X' && (
          <div className="select-none animate-bounce text-gray-700" style={{ fontSize: '2rem', textShadow: '2px 2px 4px rgba(75, 85, 99, 0.3)' }}>
            🐾
          </div>
        )}
        {value === 'O' && (
          <div className="select-none animate-bounce text-pink-500" style={{ fontSize: '2rem', textShadow: '2px 2px 4px rgba(236, 72, 153, 0.3)' }}>
            🐾
          </div>
        )}
      </button>
    );
  };

  const isDraw = !winner && board.every(square => square !== null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-pink-50 to-pink-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl opacity-20 animate-bounce">😸</div>
        <div className="absolute top-20 right-16 text-3xl opacity-25 animate-bounce" style={{ animationDelay: '1s' }}>🐾</div>
        <div className="absolute bottom-20 left-20 text-5xl opacity-15 animate-bounce" style={{ animationDelay: '2s' }}>😺</div>
        <div className="absolute bottom-32 right-12 text-3xl opacity-30 animate-bounce" style={{ animationDelay: '0.5s' }}>🐾</div>
        <div className="absolute top-1/2 left-8 text-4xl opacity-20 animate-bounce" style={{ animationDelay: '1.5s' }}>😻</div>
        <div className="absolute top-1/3 right-8 text-4xl opacity-25 animate-bounce" style={{ animationDelay: '3s' }}>😽</div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-300 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-5xl sm:text-6xl mb-3 animate-pulse">🐱</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
            Kitty Paw Battle
          </h1>
          <div className="flex items-center justify-center gap-3 text-lg">
            <div className="flex items-center gap-1">
              <span className="text-gray-700">🐾</span>
              <span className="font-medium text-gray-700">Grey</span>
            </div>
            <span className="text-gray-500 font-bold">VS</span>
            <div className="flex items-center gap-1">
              <span className="text-pink-500">🐾</span>
              <span className="font-medium text-pink-500">Pink</span>
            </div>
          </div>
        </div>

        <div className="mb-6 text-center">
          {winner ? (
            <div className="text-xl sm:text-2xl font-bold">
              <div className="text-4xl mb-3 animate-spin">🎉</div>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {winner === 'X' ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-gray-700">🐾</span>
                    <span>Grey Paws Win!</span>
                    <span className="text-gray-700">🐾</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-pink-500">🐾</span>
                    <span>Pink Paws Win!</span>
                    <span className="text-pink-500">🐾</span>
                  </div>
                )}
              </div>
            </div>
          ) : isDraw ? (
            <div className="text-xl sm:text-2xl font-bold text-pink-600">
              <div className="text-4xl mb-3">😸</div>
              <div>Purr-fect Draw!</div>
              <div className="text-sm text-gray-600">All cats are winners! 🏆</div>
            </div>
          ) : (
            <div className="text-lg sm:text-xl">
              <div className="text-3xl mb-2">😺</div>
              <div className="font-semibold">
                {isXNext ? (
                  <div className="flex items-center justify-center gap-2 text-gray-700">
                    <span>🐾</span>
                    <span>Grey Paws Turn</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-pink-500">
                    <span>🐾</span>
                    <span>Pink Paws Turn</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-gradient-to-br from-gray-50 to-pink-100 rounded-2xl border-2 border-gray-200">
          {board.map((_, index) => renderSquare(index))}
        </div>

        <div className="text-center">
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-2 mx-auto active:scale-95"
          >
            <span className="text-xl">🐱</span>
            <span>New Game</span>
            <span className="text-xl">🐱</span>
          </button>
        </div>
      </div>

      <div className="mt-6 text-center text-gray-600 text-sm bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-300">
        <span className="mr-2">💡</span>
        Did you know? Cats have 18 toes total - 5 on each front paw, 4 on each back paw!
      </div>
    </div>
  );
};

export default TicTacToe;