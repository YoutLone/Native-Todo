import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../redux/slices/todoSlice';

const DetailScreen: React.FC = ({ route, navigation }) => {
  const { todo } = route.params;
  const dispatch = useDispatch();

  const handleDeleteTodo = () => {
    dispatch(deleteTodo(todo.id));
    // Show success message
    alert('Successfully deleted the task');
    // Navigate back to the HomeScreen
    navigation.goBack();
  };

  const handleEditTodo = () => {
    navigation.navigate('Edit', { todo });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.todoText}>Title : {todo.title}</Text>
      <Text style={styles.todoText}>Description : {todo.description}</Text>
      <TouchableOpacity
        style={[styles.button, styles.editButton]}
        onPress={handleEditTodo}
      >
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={handleDeleteTodo}
      >
        <Text style={styles.buttonText}>Delete</Text>
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
  todoText: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#c8e330',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default DetailScreen;
