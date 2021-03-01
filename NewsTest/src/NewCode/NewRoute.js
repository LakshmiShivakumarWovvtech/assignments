import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import NewsTest from './NewsTest';
// import NewsDetails from './NewsDetails';
// import HomePage from './Home';
// import Details from './Details';
// import Home from './Home';
// import News from './News';
import NewHome from './NewHome';
import Info from './Info';
// import News from './News';

const Stack = createStackNavigator();

const NewRoute = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={NewHome} />
        <Stack.Screen name="Info" component={Info} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default NewRoute;
