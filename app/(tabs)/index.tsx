import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import TaskScreen from "../screens/TaskScreen";
import JournalScreen from "../screens/JournalScreen";
import MilestoneScreen from "../screens/Milescreen"; // ✅ Make sure this is correct
import { Ionicons } from "@expo/vector-icons";
import PuzzleGameScreen from "../screens/PuzzleGameScreen"; // Import game screen


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Tasks") {
            iconName = "checkmark-circle";
          } else if (route.name === "Journal") {
            iconName = "book";
          } else if (route.name === "Milestones") {
            iconName = "trophy";
          }else if (route.name === "Puzzle") {
            iconName = "extension-puzzle"; // Puzzle Icon
          }


          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tasks" component={TaskScreen} />
      <Tab.Screen name="Journal" component={JournalScreen} />
      <Tab.Screen name="Milestones" component={MilestoneScreen} /> 
      <Tab.Screen name="Puzzle" component={PuzzleGameScreen}/>
    </Tab.Navigator>
  );
}
