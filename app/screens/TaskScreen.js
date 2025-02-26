import React, { useState } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

const tasksList = [
  "Spend 15 minutes talking with your parents",
  "Help your parents with household chores",
  "Share a meal with your family",
  "Ask your parents about their day",
  "Watch a movie together",
  "Help in the kitchen",
  "Take a family selfie",
  "Go for a walk with a parent",
  "Write a thank-you note for your parents",
  "Play a game together",
];

const TaskScreen = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState(tasksList.map(task => ({ text: task, completed: false })));
  const [completedTasks, setCompletedTasks] = useState(0);

  const onCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    if (!updatedTasks[index].completed) {
      updatedTasks[index].completed = true;
      setTasks(updatedTasks);
      const newCount = completedTasks + 1;
      setCompletedTasks(newCount);

      // Navigate to Milestone page with updated task count
      navigation.navigate("Milestones", { completedTasks: newCount });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskItem}>
            <Text style={[styles.taskText, item.completed && styles.completedTask]}>{item.text}</Text>
            <Button
              title={item.completed ? "Done" : "Complete"}
              onPress={() => onCompleteTask(index)}
              disabled={item.completed}
            />
          </View>
        )}
      />
      <Text style={styles.footerText}>Tasks Completed: {completedTasks} / {tasks.length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f8ff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  footerText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TaskScreen;
