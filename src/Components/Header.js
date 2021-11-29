import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Primary, Secondary} from '../Utils/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
function Header({title, navigation}) {
  return (
    <View
      style={{
        backgroundColor: Secondary,
        flexDirection: 'row',
        paddingTop: 3,
        marginTop: 4,
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          color: 'white',
          width: '10%',
        }}>
        <Text
          style={{color: 'white', fontSize: 30, marginTop: 20, marginLeft: 10}}>
          <Icon name="chevron-left" color={Primary} size={20} />
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          width: '80%',
          textAlign: 'center',
          fontSize: 20,
          marginTop: 20,
          padding: 4,
          color: Primary,
        }}>
        project: {title}
      </Text>
    </View>
  );
}
export default Header;
