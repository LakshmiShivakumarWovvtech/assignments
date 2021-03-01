import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NewsTest from './NewsTest';
import NewsDetails from './NewsDetails';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={NewsTest} />
        <Stack.Screen name="Info" component={NewsDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
