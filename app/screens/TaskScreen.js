import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ Store progress

const generateWeeklyTasks = () => {
  const baseTasks = [
    ["Call your parents 📞", "Cook a meal 🍲", "Go for a walk 🚶‍♂️", "Share a memory 📖", "Write a thank-you note 📝", "Watch a movie 🎥", "Say 'I love you' ❤️"],
    ["Help clean the house 🧹", "Make them tea ☕", "Spend time without your phone 📵", "Ask about their childhood 👵", "Plan a weekend outing 🏞️", "Share a joke 😂", "Listen to their favorite music 🎵"],
    ["Help with shopping 🛒", "Do a chore 🏠", "Ask for advice 🗣️", "Write 3 things you love 💕", "Plan a surprise 🎉", "Give a compliment 😊", "Eat dinner together 🍽️"],
  ];

  let tasksForYear = [];
  for (let i = 0; i < 52; i++) {
    tasksForYear.push({
      week: i + 1,
      tasks: baseTasks[i % baseTasks.length], 
    });
  }
  return tasksForYear;
};

const TaskScreen = () => {
  const [weeklyTasks] = useState(generateWeeklyTasks());
  const [completedTasks, setCompletedTasks] = useState([]);
  const scaleAnim = new Animated.Value(1);

  useEffect(() => {
    loadCompletedTasks();
  }, []);

  const loadCompletedTasks = async () => {
    const storedTasks = await AsyncStorage.getItem("completedTasks");
    if (storedTasks) {
      setCompletedTasks(JSON.parse(storedTasks));
    }
  };

  const saveCompletedTasks = async (updatedTasks) => {
    await AsyncStorage.setItem("completedTasks", JSON.stringify(updatedTasks));
  };

  const getCurrentWeek = () => {
    const start = new Date(new Date().getFullYear(), 0, 1);
    const today = new Date();
    const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    return Math.ceil((diff + start.getDay() + 1) / 7);
  };

  const currentWeek = getCurrentWeek();
  const currentTasks = weeklyTasks.find((week) => week.week === currentWeek)?.tasks || [];

  const completeTask = async (task) => {
    if (!completedTasks.includes(task)) {
      const updatedTasks = [...completedTasks, task];
      setCompletedTasks(updatedTasks);
      await saveCompletedTasks(updatedTasks);

      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.2, duration: 150, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
      ]).start();
    }
  };

  const renderItem = ({ item, index }) => {
    const isCompleted = completedTasks.includes(item);

    return (
      <Animatable.View animation="fadeInRight" delay={index * 100} style={[styles.task, isCompleted && styles.completedTask]}>
        <Text style={[styles.taskText, isCompleted && styles.completedText]}>{item}</Text>
        <TouchableOpacity onPress={() => completeTask(item)}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Ionicons name={isCompleted ? "checkmark-circle" : "ellipse-outline"} size={24} color={isCompleted ? "green" : "gray"} />
          </Animated.View>
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.header}>Weekly Tasks (Week {currentWeek}) 🌟</Animatable.Text>
      <FlatList data={currentTasks} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
  header: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  completedTask: { backgroundColor: "#DFFFD6" },
  taskText: { fontSize: 16, flex: 1 },
  completedText: { textDecorationLine: "line-through", color: "gray" },
});

export default TaskScreen;
