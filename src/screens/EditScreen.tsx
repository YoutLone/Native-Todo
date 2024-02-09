import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { editTodo } from '../redux/slices/todoSlice';

const EditScreen: React.FC = ({ route, navigation }) => {
  const { todo } = route.params;
  const dispatch = useDispatch();

  // State for dynamic input values
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const handleUpdateTodo = () => {
    const updatedTodo = {
      ...todo,
      title: editedTitle,
      description: editedDescription,
    };

    // Dispatch action to update todo
    dispatch(editTodo(updatedTodo));

    // Navigate back to the HomeScreen
    navigation.navigate('Todo App');
  };

  const handleCancelEdit = () => {
    // Navigate back to the HomeScreen without updating
    navigation.navigate('Todo App');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Change Title :</Text>
        <TextInput
          style={styles.input}
          placeholder="Edit title"
          value={editedTitle}
          onChangeText={(text) => setEditedTitle(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Change Description :</Text>
        <TextInput
          style={styles.input}
          placeholder="Edit description"
          value={editedDescription}
          onChangeText={(text) => setEditedDescription(text)}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, styles.updateButton]}
        onPress={handleUpdateTodo}
      >
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={handleCancelEdit}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 15,
    width: '100%',
  },
  label: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderRadius: 0,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: 'green',
  },
  cancelButton: {
    backgroundColor: '#8f9e06',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default EditScreen;
