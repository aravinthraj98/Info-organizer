import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Primary, Secondary} from '../Utils/Colors';
import {Card, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {LinearTextGradient} from 'react-native-text-gradient';
import {BottomSheet} from 'react-native-elements/dist/bottomSheet/BottomSheet';
import SignUp from '../Components/SignUp';
import {FAB} from 'react-native-elements/dist/buttons/FAB';

function Login() {
  const [signUp, setSignUp] = useState(false);
  return (
    <LinearGradient
      colors={[Primary, Secondary]}
      style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}
      start={{x: 0.49, y: 0}}
      end={{x: 0.5, y: 0}}>
      <View style={{flex: 9, alignContent: 'center', justifyContent: 'center'}}>
        <Card>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 30,
              color: Secondary,
              fontWeight: '400',
            }}>
            LOG
            <Text style={{color: Primary, fontWeight: '900'}}>IN</Text>
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
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{textAlign: 'center', padding: 10}}>
            <Text style={{textAlign: 'center', color: Secondary}}>
              forgot password
            </Text>
          </TouchableOpacity>
        </Card>
      </View>
      <BottomSheet
        isVisible={signUp}
        containerStyle={{backgroundColor: Secondary}}>
        <SignUp setSignUp={setSignUp} />
      </BottomSheet>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          padding: 10,
        }}>
        <FAB
          onPress={() => setSignUp(true)}
          color={Primary}
          title={<Icon size={20} color={Secondary} name="arrow-up" />}
        />
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 15,
          }}>
          signUp
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Login;
