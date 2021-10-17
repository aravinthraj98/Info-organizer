import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Primary, Secondary} from '../Utils/Colors';
function Header({title, navigation}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Secondary,
        flexDirection: 'row',
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          color: 'white',
          width: '10%',
        }}>
        <Text
          style={{color: 'white', fontSize: 30, marginTop: 10, marginLeft: 10}}>
          {'<'}
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          width: '80%',
          textAlign: 'center',
          fontSize: 40,
          color: Primary,
        }}>
        {title}
      </Text>
    </View>
  );
}
export default Header;
