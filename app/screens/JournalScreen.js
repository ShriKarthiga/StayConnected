import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';

const JournalScreen = () => {
  const [journalText, setJournalText] = useState('');
  const [entries, setEntries] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to get your coordinates.');
        return;
      }
    };

    requestLocationPermission();
  }, []);

  const handleAddEntry = async () => {
    if (!journalText.trim()) {
      Alert.alert('Error', 'Please enter some text.');
      return;
    }

    // Get Current Location
    let loc = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = loc.coords;

    // Create New Journal Entry
    const newEntry = {
      text: journalText,
      date: new Date().toLocaleString(),
      location: `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`,
    };

    setEntries([newEntry, ...entries]); // Add new entry at the top
    setJournalText(''); // Clear input field
    setLocation(`Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Journal</Text>

      {/* Journal Input */}
      <TextInput
        style={styles.input}
        placeholder="Write your journal entry here..."
        value={journalText}
        onChangeText={setJournalText}
        multiline
      />

      <Button title="Add Entry" onPress={handleAddEntry} color="#007AFF" />

      {/* Display Journal Entries */}
      <ScrollView style={styles.entryList}>
        {entries.map((entry, index) => (
          <View key={index} style={styles.entry}>
            <Text style={styles.entryDate}>{entry.date}</Text>
            <Text style={styles.entryLocation}>📍 {entry.location}</Text>
            <Text style={styles.entryText}>{entry.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ADD8E6', // Light Blue Background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  entryList: {
    marginTop: 20,
  },
  entry: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  entryDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  entryLocation: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 5,
  },
  entryText: {
    fontSize: 16,
    color: '#333',
  },
});

export default JournalScreen;
