import React, {useState} from 'react';
import {Primary, Secondary} from '../Utils/Colors';
import {Card, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text, TouchableOpacity} from 'react-native';
import {addNewEmployee} from '../Services/CrudFirestore';
import Spinner from 'react-native-loading-spinner-overlay';

function EmployeeSignUp() {
  const initialState = {
    Email: '',
    password: '',
    confirmPassword: '',
    role: '',
    companyName: '',
    team: '',
  };
  const [loading, setLoading] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState(initialState);
  function handleChange(name, value) {
    setEmployeeDetails({...employeeDetails, [name]: value});
  }
  async function handleSubmit() {
    if (employeeDetails.password !== employeeDetails.confirmPassword) {
      alert('password and confirm password must be same');
      return;
    }
    if (
      employeeDetails.Email == '' ||
      employeeDetails.Email.split('@').length <= 1
    ) {
      alert('Not a valid email');
      return;
    }
    const isEmployee = await addNewEmployee(employeeDetails);
    if (isEmployee === true) {
      alert('registration successfull');
      setEmployeeDetails({...initialState});
    } else alert(isEmployee);
  }

  return (
    <Card wrapperStyle={{padding: 30, marginBottom: 50}}>
      <Spinner visible={loading} textContent={'signing up'} />
      <Input
        placeholder="Email"
        value={employeeDetails.Email}
        onChangeText={text => handleChange('Email', text)}
        errorStyle={{color: 'red'}}
        // errorMessage="ENTER A VALID ERROR HERE"
        leftIcon={<Icon name="user" size={24} color={Primary} />}
      />
      <Input
        placeholder="Password"
        value={employeeDetails.password}
        onChangeText={text => handleChange('password', text)}
        errorStyle={{color: 'red'}}
        secureTextEntry={true}
        leftIcon={<Icon name="lock" size={24} color={Secondary} />}
      />
      <Input
        placeholder="Confirm Password"
        value={employeeDetails.confirmPassword}
        onChangeText={text => handleChange('confirmPassword', text)}
        errorStyle={{color: 'red'}}
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
