import { AppRegistry, UIManager } from 'react-native';
import App from './src/app';

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

AppRegistry.registerComponent('manager2', () => App);