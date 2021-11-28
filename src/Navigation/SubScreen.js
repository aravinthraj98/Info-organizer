import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Home from '../Screens/Home';
import {Primary, Secondary} from '../Utils/Colors';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import AddMember from '../Components/AddMembers';

const Tab = createMaterialBottomTabNavigator();
function SubScreen({navigation}) {
  return (
    <Tab.Navigator
      activeColor={Primary}
      inactiveColor="white"
      barStyle={{
        backgroundColor: Secondary,
        borderWidth: 1,
        borderTopColor: Primary,
      }}>
      <Tab.Screen
        options={{tabBarIcon: ({color}) => <Icon name="home" color={color} />}}
        name="home3">
        {() => <Home navigation={navigation} />}
      </Tab.Screen>
      <Tab.Screen name="home2" component={AddMember} />
    </Tab.Navigator>
  );
}
export default SubScreen;
