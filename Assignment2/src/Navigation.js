import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CountryWeather from './CountryWeather';
import CountryDetails from './CountryDetails';
import CapitalWeather from './CapitalWeather';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={CountryWeather} />
        <Stack.Screen name="Details" component={CountryDetails} />
        <Stack.Screen name="CapitalWeather" component={CapitalWeather} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
