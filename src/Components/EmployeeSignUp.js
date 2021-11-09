import React from "react"
import {Primary, Secondary} from '../Utils/Colors';
import {Card, Input} from 'react-native-elements';  
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, TouchableOpacity } from "react-native";

function EmployeeSignUp(){

    return(
       <Card wrapperStyle={{padding:30,marginBottom:50}}>
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
           
       </Card>
    )
}
export default EmployeeSignUp;