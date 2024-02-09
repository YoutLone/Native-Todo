import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const SearchScreen: React.FC = ({ navigation }) => {
  const todos = useSelector((state: RootState) => state.todo.todos);
  const [searchText, setSearchText] = React.useState('');

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <Text style={styles.title}>Search Todo</Text>
        <TextInput
          style={styles.input}
          placeholder="Type title to search"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.todoContainer}>
              <Text style={styles.todoTitle}>{item.title}</Text>
              <Text style={styles.todoDescription}>{item.description}</Text>
              <TouchableOpacity
                style={[styles.button, styles.detailsButton]} // Combine styles for the button
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
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 18,
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

export default SearchScreen;
