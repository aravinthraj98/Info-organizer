import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card, Input, FAB} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Primary, Secondary} from '../Utils/Colors';
function SignUp({setSignUp}) {
  return (
    <View style={{flex: 1}}>
      <Card>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 30,
            color: Secondary,
            fontWeight: '400',
          }}>
          Sign
          <Text style={{color: Primary, fontWeight: '900'}}>UP</Text>
        </Text>
        <Input
          placeholder="Email"
          errorStyle={{color: 'red'}}
          errorMessage="ENTER A VALID ERROR HERE"
          leftIcon={<Icon name="user" size={24} color={Primary} />}
        />
        <Input
          placeholder="Password"
          errorStyle={{color: 'red'}}
          errorMessage="ENTER A VALID ERROR HERE"
          secureTextEntry={true}
          leftIcon={<Icon name="lock" size={24} color={Secondary} />}
        />
        <Input
          placeholder="Confirm Password"
          errorStyle={{color: 'red'}}
          errorMessage="ENTER A VALID ERROR HERE"
          secureTextEntry={true}
          leftIcon={<Icon name="lock" size={24} color={Secondary} />}
        />
        <TouchableOpacity
          style={{
            backgroundColor: Primary,
            width: '70%',
            marginLeft: '15%',
            borderRadius: 20,
            height: 30,
          }}>
          <Text
            style={{
              color: Secondary,
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            SignUp
          </Text>
        </TouchableOpacity>
      </Card>
      <TouchableOpacity style={{padding: 30}}>
        <FAB
          onPress={() => setSignUp(false)}
          color={Secondary}
          titleStyle={{color: Primary}}
          title={<Icon color={Primary} size={20} name="arrow-down" />}
        />
      </TouchableOpacity>
    </View>
  );
}
export default SignUp;
