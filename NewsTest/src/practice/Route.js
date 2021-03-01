import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import NewsTest from './NewsTest';
// import NewsDetails from './NewsDetails';
import HomePage from './Home';
import Details from './Details';
import Home from './Home';
import News from './News';
// import News from './News';

const Stack = createStackNavigator();

const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={News} />
        <Stack.Screen name="Info" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Route;
