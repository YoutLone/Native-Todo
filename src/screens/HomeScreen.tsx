import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addTodo } from '../redux/slices/todoSlice';

const HomeScreen: React.FC = ({ navigation }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todos);

  // State for dynamic input values
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTodo = () => {
    if (!title && !description) {
      // Show alert if both title and description are empty
      alert('Please enter title and description');
      return;
    }

    if (!title) {
      // Show alert if title is empty
      alert('Please enter a title');
      return;
    }

    if (!description) {
      // Show alert if description is empty
      alert('Please enter a description');
      return;
    }

    const newTodo = {
      id: todos.length + 1,
      title,
      description,
    };

    dispatch(addTodo(newTodo));

    // Clear input fields after adding todo
    setTitle('');
    setDescription('');
  };

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleAddTodo}
      >
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Search')}
      >
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <View style={styles.todoContainer}>
            <Text style={styles.todoTitle}>{item.title}</Text>
            <Text style={styles.todoDescription}>{item.description}</Text>
            <TouchableOpacity
                style={[styles.button, styles.detailsButton]} 
                onPress={() => navigation.navigate('Detail', { todo: item })}
            >
                <Text style={styles.buttonText}>Details</Text>
            </TouchableOpacity>
            </View>
        )}
        />
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 18,
    paddingHorizontal: 10,
  },
  button: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#5926f0',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  detailsButton: {
    width: 80,
    height: 45,
  },
  todoContainer: {
    borderWidth: 2,
    borderColor: '#7971f0',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#d0cdfa',
  },
  todoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  todoDescription: {
    marginBottom: 5,
    fontSize: 16,
  },
});

export default HomeScreen;
