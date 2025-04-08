import React, { useState, useEffect } from "react";
import { View, Text, Image, Animated, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Milescreen = () => {
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [treeAnimation] = useState(new Animated.Value(0));
  const totalTasks = 7; // Total tasks for the week

  useEffect(() => {
    loadTaskProgress();
  }, []);

  useEffect(() => {
    if (tasksCompleted > 0 && tasksCompleted < totalTasks) {
      Animated.timing(treeAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [tasksCompleted]);

  const loadTaskProgress = async () => {
    const storedTasks = await AsyncStorage.getItem("completedTasks");
    if (storedTasks) {
      setTasksCompleted(JSON.parse(storedTasks).length);
    }
  };

  return (
    <View style={styles.container}>
      {tasksCompleted < totalTasks ? (
        <Animated.Text style={[styles.growthText, { opacity: treeAnimation }]}>
          🌱 Your tree is growing! ({tasksCompleted}/{totalTasks} tasks completed)
        </Animated.Text>
      ) : (
        <>
          <Text style={styles.congratulationsText}>🎉 Your tree has fully grown! 🎉</Text>
          <Image source={require("../../assets/tree.jpg")} style={styles.treeImage} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f4f4f4" },
  growthText: { fontSize: 20, fontWeight: "bold", marginBottom: 20, color: "#4CAF50" },
  congratulationsText: { fontSize: 24, fontWeight: "bold", color: "#2E8B57", textAlign: "center" },
  treeImage: { width: 200, height: 300, marginTop: 20 },
});

export default Milescreen;
