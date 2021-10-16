import React, { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../Screens/Login';

const Stack = createNativeStackNavigator();
function MainScreen() {
    const [loggedIn,setLoggedIn] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home">{props => <Login {...props} />}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MainScreen;
