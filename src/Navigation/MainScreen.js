import React, {useContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../Screens/Login';
import SubScreen from './SubScreen';
import InformationScreen from '../Screens/InformationScreen';
import ManagerScreen from './ManagerScreen';
import AddMember from '../Components/AddMembers';
import {DetailContext} from '../Utils/DetailContext';

const Stack = createNativeStackNavigator();
function MainScreen() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [detail, setDetail] = useContext(DetailContext);
  console.log({detail});
  return (
    <NavigationContainer>
      <Stack.Navigator
        // screenListeners={() => 'hello'}

        screenOptions={{headerShown: false}}>
        {detail && (
          <Stack.Screen name="login">
            {props => <Login {...props} setLoggedIn={setDetail} />}
          </Stack.Screen>
        )}
        <Stack.Screen name="home" component={SubScreen} />
        <Stack.Screen name="Information" component={InformationScreen} />
        <Stack.Screen name="createLeadAndProject" component={ManagerScreen} />
        <Stack.Screen name="createMember" component={AddMember} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MainScreen;
