import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const gridSize = 3; // 3x3 puzzle

const generateGrid = () => {
  let numbers = Array.from({ length: gridSize * gridSize }, (_, i) => i);
  do {
    numbers = numbers.sort(() => Math.random() - 0.5);
  } while (!isSolvable(numbers)); // Shuffle until solvable
  return numbers;
};

const isSolvable = (arr) => {
  let invCount = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] && arr[j] && arr[i] > arr[j]) invCount++;
    }
  }
  return invCount % 2 === 0;
};

const PuzzleGameScreen = () => {
  const [tiles, setTiles] = useState(generateGrid());

  useEffect(() => {
    setTiles(generateGrid());
  }, []);

  const moveTile = (index) => {
    const emptyIndex = tiles.indexOf(0);
    const validMoves = [
      emptyIndex - 1, // Left
      emptyIndex + 1, // Right
      emptyIndex - gridSize, // Up
      emptyIndex + gridSize, // Down
    ];

    if (validMoves.includes(index)) {
      const newTiles = [...tiles];
      [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
      setTiles(newTiles);

      if (isGameWon(newTiles)) {
        Alert.alert("Congratulations!", "You solved the puzzle!", [{ text: "OK" }]);
      }
    }
  };

  const isGameWon = (arr) => arr.every((num, i) => num === (i + 1) % (gridSize * gridSize));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sliding Puzzle Game</Text>
      <View style={styles.grid}>
        {tiles.map((num, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tile, num === 0 && styles.emptyTile]}
            onPress={() => moveTile(index)}
            disabled={num === 0}
          >
            {num !== 0 && <Text style={styles.tileText}>{num}</Text>}
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={() => setTiles(generateGrid())}>
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  grid: { flexDirection: "row", flexWrap: "wrap", width: 210 },
  tile: { width: 70, height: 70, backgroundColor: "#3498db", justifyContent: "center", alignItems: "center", margin: 2 },
  emptyTile: { backgroundColor: "#ecf0f1" },
  tileText: { fontSize: 24, color: "white", fontWeight: "bold" },
  resetButton: { marginTop: 20, padding: 10, backgroundColor: "#e74c3c", borderRadius: 5 },
  resetText: { fontSize: 18, color: "white", fontWeight: "bold" },
});

export default PuzzleGameScreen;
