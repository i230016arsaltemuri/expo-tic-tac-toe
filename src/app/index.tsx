import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

type Player = 'X' | 'O' | null;

export default function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);

  const calculateWinner = (squares: Player[]): Player => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handlePress = (index: number) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((cell) => cell !== null);
  
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = 'Draw!';
  } else {
    status = isXNext ? "Player X's Turn" : "Player O's Turn";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      
      <View style={styles.statusCard}>
        <Text style={styles.statusText}>{status}</Text>
      </View>

      <View style={styles.boardContainer}>
        <View style={styles.board}>
          {board.map((cell, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.cell,
                cell === 'X' ? styles.cellX : null,
                cell === 'O' ? styles.cellO : null,
              ]}
              onPress={() => handlePress(index)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.cellText,
                cell === 'X' ? styles.textX : null,
                cell === 'O' ? styles.textO : null,
              ]}>
                {cell}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>Play Again</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Name: YOUR NAME</Text>
        <Text style={styles.footerText}>Roll No: YOUR ROLL NUMBER</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6', // light gray background
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 20,
    letterSpacing: 1,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 30,
  },
  statusText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
  },
  boardContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    height: 300,
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  cell: {
    width: '31%',
    height: '31%',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  cellX: {
    borderColor: '#3B82F6', // blue border for X
    backgroundColor: '#EFF6FF',
  },
  cellO: {
    borderColor: '#EF4444', // red border for O
    backgroundColor: '#FEF2F2',
  },
  cellText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  textX: {
    color: '#3B82F6',
  },
  textO: {
    color: '#EF4444',
  },
  resetButton: {
    marginTop: 40,
    backgroundColor: '#10B981', // emerald green
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    fontWeight: '500',
  },
});
