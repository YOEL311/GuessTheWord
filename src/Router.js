import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import IntroPage from './screens/Intro';
import GamePage from './screens/Game';
import EndGame from './screens/EndGame';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="IntroPage">
        <Stack.Screen name="IntroPage" component={IntroPage} />
        <Stack.Screen name="Game" component={GamePage} />
        <Stack.Screen name="EndGame" component={EndGame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
