import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createTable, insertReminder, getReminders, updateReminder, deleteReminder } from '../services/database';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts } from '../styles/themes.js';
import ReminderCard from '../components/ReminderCard';

const ReminderScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reminders, setReminders] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    createTable();
    fetchReminders();
  }, []);

  const fetchReminders = () => {
    getReminders((result) => {
      setReminders(result);
    });
  };

  const handleAddReminder = () => {
    if (editingId) {
      updateReminder(editingId, title, description, date, 0, () => {
        fetchReminders();
        setTitle('');
        setDescription('');
        setEditingId(null);
      });
    } else {
      insertReminder(title, description, date, 0, () => {
        fetchReminders();
        setTitle('');
        setDescription('');
      });
    }
  };

  const handleEditReminder = (id, title, description) => {
    setEditingId(id);
    setTitle(title);
    setDescription(description);
  };

  const handleDeleteReminder = (id) => {
    deleteReminder(id, fetchReminders);
  };

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateButtonText}>Select Date</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
            />
          )}
          <Text style={styles.dateTitle}>Selected Date: {date.toDateString()}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter description"
            value={description}
            onChangeText={setDescription}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddReminder}>
            <Text style={styles.addButtonText}>{editingId ? "Update Reminder" : "Add Reminder"}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={reminders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.reminderItem}>
              <View style={styles.reminderHeader}>
                <Text style={styles.reminderDate}>{item.reminderDate}</Text>
                <Text style={styles.reminderTitle}>{item.title}</Text>
              </View>
              <Text style={styles.reminderDescription}>{item.description}</Text>
              <View style={styles.reminderActions}>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEditReminder(item.id, item.title, item.description)}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteReminder(item.id)}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 20,
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dateButton: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  dateButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: fonts.bold,
  },
  dateTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: colors.primary,
    fontFamily: fonts.bold,
  },
  input: {
    height: 40,
    borderColor: colors.gray,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 5,
    fontFamily: fonts.regular,
  },
  addButton: {
    backgroundColor: colors.accent,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: fonts.bold,
  },
  reminderItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    backgroundColor: colors.white,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  reminderDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: fonts.bold,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: fonts.bold,
  },
  reminderDescription: {
    fontSize: 14,
    color: colors.black,
    marginBottom: 10,
    fontFamily: fonts.regular,
  },
  reminderActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  editButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: fonts.bold,
  },
  deleteButton: {
    backgroundColor: colors.danger,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
  deleteButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: fonts.bold,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontFamily: fonts.regular,
  },
});

export default ReminderScreen;