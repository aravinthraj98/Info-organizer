import React, {useContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../Screens/Login';
import SubScreen from './SubScreen';
import InformationScreen from '../Screens/InformationScreen';
import ManagerScreen from './ManagerScreen';
import AddMember from '../Components/AddMembers';
import {DetailContext} from '../Utils/DetailContext';
import AddProject from '../Components/AddProject';
import TaskScreen from '../Screens/TaskScreen';
import AddTask from '../Components/AddTask';
import Home from '../Screens/Home';

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
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="taskScreen" component={TaskScreen} />
        <Stack.Screen name="addTask" component={AddTask} />
        <Stack.Screen name="addMember" component={AddMember} />
        <Stack.Screen name="Information" component={InformationScreen} />
        <Stack.Screen name="createLeadAndProject" component={ManagerScreen} />
        <Stack.Screen name="addProject" component={AddProject} />
        <Stack.Screen name="createMember" component={AddMember} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MainScreen;
