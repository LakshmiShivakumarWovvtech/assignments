/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Navigation from './src/Navigation';
import Route from './src/practise/Route';

AppRegistry.registerComponent(appName, () => Route);
