import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import SearchScreen from './src/screens/SearchScreen';
import EditScreen from './src/screens/EditScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Todo App"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#5e2feb',
              height: 70,
            },
            headerTitleStyle: {
              color: 'white',
              fontSize: 25,
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center', 
          }}
        >
          <Stack.Screen name="Todo App" component={HomeScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Edit" component={EditScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
