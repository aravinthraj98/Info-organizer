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
        onPress={() => navigation.push('home')}
        style={{
          color: 'white',
          width: '10%',
          marginTop: 10,
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
        {title}
      </Text>
    </View>
  );
}
export default Header;
