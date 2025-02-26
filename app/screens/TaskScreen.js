import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Generate weekly tasks for a year
const generateWeeklyTasks = () => {
  const baseTasks = [
    ["Call your parents and ask about their day 📞", "Cook a meal for your family 🍲", "Go for a walk with your parents 🚶‍♂️", "Share a childhood memory 📖", "Write a thank-you note for them 📝", "Watch a movie together 🎥", "Say 'I love you' to your family ❤️"],
    ["Help clean the house 🧹", "Make them a cup of tea ☕", "Spend time without your phone 📵", "Ask about their childhood 👵", "Plan a weekend outing 🏞️", "Share a joke and make them laugh 😂", "Listen to their favorite music 🎵"],
    ["Help with grocery shopping 🛒", "Do a chore without being asked 🏠", "Ask for their advice on something 🗣️", "Write down 3 things you love about them 💕", "Plan a surprise for them 🎉", "Give them a heartfelt compliment 😊", "Eat dinner together at the table 🍽️"],
    // Repeat similar structure for 52 weeks...
  ];

  let tasksForYear = [];
  for (let i = 0; i < 52; i++) {
    tasksForYear.push({
      week: i + 1,
      tasks: baseTasks[i % baseTasks.length], // Cycle through predefined tasks
    });
  }
  return tasksForYear;
};

const TaskScreen = () => {
  const [weeklyTasks] = useState(generateWeeklyTasks());
  const [completedTasks, setCompletedTasks] = useState([]);

  // Get current week of the year
  const getCurrentWeek = () => {
    const start = new Date(new Date().getFullYear(), 0, 1);
    const today = new Date();
    const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    return Math.ceil((diff + start.getDay() + 1) / 7);
  };

  const currentWeek = getCurrentWeek();
  const currentTasks = weeklyTasks.find((week) => week.week === currentWeek)?.tasks || [];

  const completeTask = (task) => {
    if (!completedTasks.includes(task)) {
      setCompletedTasks([...completedTasks, task]);
    }
  };

  const renderItem = ({ item }) => {
    const isCompleted = completedTasks.includes(item);

    return (
      <TouchableOpacity
        style={[styles.task, isCompleted && styles.completedTask]}
        onPress={() => completeTask(item)}
      >
        <Text style={[styles.taskText, isCompleted && styles.completedText]}>
          {item}
        </Text>
        {isCompleted ? (
          <Ionicons name="checkmark-circle" size={24} color="green" />
        ) : (
          <Ionicons name="ellipse-outline" size={24} color="gray" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weekly Tasks (Week {currentWeek}) 🌟</Text>

      <FlatList
        data={currentTasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
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
  completedTask: {
    backgroundColor: "#DFFFD6",
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});

export default TaskScreen;
