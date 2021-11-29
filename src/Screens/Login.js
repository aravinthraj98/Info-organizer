import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Primary, Secondary} from '../Utils/Colors';
import {Card, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {LinearTextGradient} from 'react-native-text-gradient';
import {BottomSheet} from 'react-native-elements/dist/bottomSheet/BottomSheet';
import SignUp from '../Components/SignUp';
import {FAB} from 'react-native-elements/dist/buttons/FAB';
import {checkLogin} from '../Services/CrudFirestore';
import Spinner from 'react-native-loading-spinner-overlay';
import {DetailContext} from '../Utils/DetailContext';

function Login({navigation, route, setLoggedIn}) {
  const [signUp, setSignUp] = useState(false);
  const logout = route.params?.logout;
  const [detail, setDetail] = useContext(DetailContext);
  console.log(navigation.getState());
  const initialState = {
    email: 'aravinth1@gmail.com',
    password: '12345678',
  };
  useEffect(() => {
    if (logout === true) {
      setDetail(null);
    }
  }, []);
  const [loginDetails, setLoginDetails] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    if (
      loginDetails.email.length < 0 ||
      loginDetails.email.split('@').length <= 1 ||
      loginDetails.password.length <= 6
    ) {
      alert('email or password not in valid format');
      setLoading(false);
      return;
    }

    let isLogin = await checkLogin(loginDetails);
    if (isLogin.authorize === true) {
      // setLoggedIn(true);
      setLoggedIn(isLogin.data);
      navigation.navigate('home');
    } else {
      alert(isLogin.data);
    }
    setLoading(false);
  };
  return (
    <LinearGradient
      colors={[Primary, Secondary]}
      style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}
      start={{x: 0.49, y: 0}}
      end={{x: 0.5, y: 0}}>
      <Spinner visible={loading} textContent={'Logging In'} />
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
            value={loginDetails.email}
            // errorMessage="ENTER A VALID ERROR HERE"
            onChangeText={text =>
              setLoginDetails({...loginDetails, email: text})
            }
            leftIcon={<Icon name="user" size={24} color={Primary} />}
          />
          <Input
            placeholder="Password"
            errorStyle={{color: 'red'}}
            // errorMessage="ENTER A VALID ERROR HERE"
            value={loginDetails.password}
            onChangeText={text =>
              setLoginDetails({...loginDetails, password: text})
            }
            secureTextEntry={true}
            leftIcon={<Icon name="lock" size={24} color={Secondary} />}
          />
          <TouchableOpacity
            onPress={handleSubmit}
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
