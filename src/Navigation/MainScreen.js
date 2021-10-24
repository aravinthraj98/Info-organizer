import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../Screens/Login';
import SubScreen from './SubScreen';
import InformationScreen from '../Screens/InformationScreen';
import ManagerScreen from './ManagerScreen';
import AddMember from '../Components/AddMembers';

const Stack = createNativeStackNavigator();
function MainScreen() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {loggedIn && (
          <Stack.Screen name="Home">
            {props => <Login {...props} />}
          </Stack.Screen>
        )}
        <Stack.Screen name="Homes" component={SubScreen} />
        <Stack.Screen name="Information" component={InformationScreen} />
        <Stack.Screen name="createLeadAndProject" component={ManagerScreen} />
        <Stack.Screen name="createMember" component={AddMember} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MainScreen;
