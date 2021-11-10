import React, {useState} from 'react';
import {Primary, Secondary} from '../Utils/Colors';
import {Card, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text, TouchableOpacity} from 'react-native';
import {addNewEmployee} from '../Services/CrudFirestore';

function EmployeeSignUp() {
  const initialState = {
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [employeeDetails, setEmployeeDetails] = useState(initialState);
  function handleChange(name, value) {
    setEmployeeDetails({...employeeDetails, [name]: value});
  }
  async function handleSubmit() {
    console.log('submitted');
    const isEmployee = await addNewEmployee(employeeDetails);
    if (isEmployee === true) alert('registration successfull');
    else alert(isEmployee);
  }

  return (
    <Card wrapperStyle={{padding: 30, marginBottom: 50}}>
      <Input
        placeholder="Email"
        onChangeText={text => handleChange('email', text)}
        errorStyle={{color: 'red'}}
        errorMessage="ENTER A VALID ERROR HERE"
        leftIcon={<Icon name="user" size={24} color={Primary} />}
      />
      <Input
        placeholder="Password"
        onChangeText={text => handleChange('password', text)}
        errorStyle={{color: 'red'}}
        errorMessage="ENTER A VALID ERROR HERE"
        secureTextEntry={true}
        leftIcon={<Icon name="lock" size={24} color={Secondary} />}
      />
      <Input
        placeholder="Confirm Password"
        onChangeText={text => handleChange('confirmPassword', text)}
        errorStyle={{color: 'red'}}
        errorMessage="ENTER A VALID ERROR HERE"
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
    </Card>
  );
}
export default EmployeeSignUp;
