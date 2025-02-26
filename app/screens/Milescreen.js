import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const Milescreen = () => {
  const route = useRoute();
  const completedTasks = route.params?.completedTasks || 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Milestone Progress</Text>
      <Text style={styles.score}>Completed Tasks: {completedTasks}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  score: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2e8b57",
  },
});

export default Milescreen; // ✅ Make sure to export the component properly
