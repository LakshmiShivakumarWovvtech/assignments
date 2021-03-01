/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';
// import Navigation from './src/Navigation';
import NewRoute from './src/NewCode/NewRoute';

AppRegistry.registerComponent(appName, () => NewRoute);
