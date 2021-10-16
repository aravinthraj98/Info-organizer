import React from 'react';
import {Text, View} from 'react-native';
import {Primary} from '../Utils/Colors';
function Header() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'whitesmoke',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
      }}>
      <Text>hello header</Text>
    </View>
  );
}
export default Header;
