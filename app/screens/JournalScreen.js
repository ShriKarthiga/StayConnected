import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, Button, ScrollView, StyleSheet, Alert, 
  Image, TouchableOpacity 
} from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

const JournalScreen = () => {
  const [journalText, setJournalText] = useState('');
  const [entries, setEntries] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const requestPermissions = async () => {
      await Location.requestForegroundPermissionsAsync();
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    };
    requestPermissions();
  }, []);

  const handleAddEntry = async () => {
    if (!journalText.trim() && !image) {
      Alert.alert('Error', 'Please add a journal entry or an image.');
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = loc.coords;

    const newEntry = {
      text: journalText,
      date: new Date().toLocaleString(),
      location: `📍 Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`,
      image: image,
    };

    setEntries([newEntry, ...entries]);
    setJournalText('');
    setImage(null);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📘 My Journal</Text>

      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.uploadText}>📷 Upload Image</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.previewImage} />}

      <TextInput
        style={styles.input}
        placeholder="Write something cool... ✨"
        value={journalText}
        onChangeText={setJournalText}
        multiline
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddEntry}>
        <Text style={styles.addButtonText}>➕ Add Post</Text>
      </TouchableOpacity>

      <ScrollView style={styles.entryList}>
        {entries.map((entry, index) => (
          <View key={index} style={styles.entry}>
            <Text style={styles.entryDate}>📅 {entry.date}</Text>
            <Text style={styles.entryLocation}>{entry.location}</Text>
            {entry.image && <Image source={{ uri: entry.image }} style={styles.entryImage} />}
            <Text style={styles.entryText}>{entry.text} 😊</Text>
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
    backgroundColor: '#D6EAF8', // Light Blue Background
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2E86C1', // Dark Blue
    marginBottom: 15,
  },
  uploadButton: {
    backgroundColor: '#5DADE2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 100,
    borderColor: '#2980B9',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#2874A6',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  entryList: {
    marginTop: 10,
  },
  entry: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  entryDate: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
  },
  entryLocation: {
    fontSize: 14,
    color: '#2E86C1',
    marginBottom: 5,
  },
  entryImage: {
    width: '100%',
    height: 180,
    borderRadius: 5,
    marginBottom: 10,
  },
  entryText: {
    fontSize: 16,
    color: '#333',
  },
});

export default JournalScreen;

