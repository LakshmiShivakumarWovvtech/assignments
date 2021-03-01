import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Nasatest from './Nasatest';
import NasaDetails from './NasaDetails';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Nasatest" component={Nasatest} />
        <Stack.Screen name="NasaDetails" component={NasaDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
