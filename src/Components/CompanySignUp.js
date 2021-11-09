import React, { useState } from "react"
import {Primary, Secondary} from '../Utils/Colors';
import {Card, Input} from 'react-native-elements';  
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

function CompanySignUp(){
    
 const initialState = {
    companyName: '',
    companyEmail: '',
    password: '',
    confirmPassword: '',
    companyDescription: '',
  };
  const [companyDetails, setCompanyDetails] = useState(initialState);
  function handleChange(name, event) {
    setCompanyDetails({...companyDetails, [name]: event});
  }
  async function handleSubmit() {
    if (companyDetails.password != companyDetails.confirmPassword) {
      alert('Password  misMatch');
      return;
    }
    if (
      companyDetails.companyName.trim().length === 0 ||
      companyDetails.companyEmail.split('@').length < 2 ||
      companyDetails.companyDescription.length === 0
    ) {
      alert('come fields are invalid');
      return;
    }
    let res = await addNewCompany(
      companyDetails.companyName,
      companyDetails.companyEmail,
      companyDetails.password,
      companyDetails.companyDescription,
    );
    if (res === true) {
      alert('company added successfully');
      setCompanyDetails({...initialState});
    } else {
      alert('res');
    }
    console.log('Company added successfully');
    // console.log(companyDetails);
  }
    return(
      
    <Card >
        <ScrollView style={{flex: 1}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 30,
              color: Secondary,
              fontWeight: '400',
            }}>
            Sign
            <Text style={{color: Primary, fontWeight: '900'}}></Text>
          </Text>
          <Input
            onChangeText={text => handleChange('companyName', text)}
            placeholder="Company Name"
            errorStyle={{color: 'red'}}
            errorMessage=""
            value={companyDetails.companyName}
            leftIcon={<Icon name="user" size={24} color={Primary} />}
          />

          <Input
            onChangeText={text => handleChange('companyEmail', text)}
            placeholder="Company Email"
            errorStyle={{color: 'red'}}
            errorMessage=""
            value={companyDetails.companyEmail}
            leftIcon={<Icon name="user" size={24} color={Primary} />}
          />
          <Input
            onChangeText={text => handleChange('password', text)}
            placeholder="Password"
            errorStyle={{color: 'red'}}
            errorMessage=""
            secureTextEntry={true}
            value={companyDetails.password}
            leftIcon={<Icon name="lock" size={24} color={Secondary} />}
          />
          <Input
            onChangeText={text => handleChange('confirmPassword', text)}
            placeholder="Confirm Password"
            errorStyle={{color: 'red'}}
            errorMessage=""
            secureTextEntry={true}
            value={companyDetails.confirmPassword}
            leftIcon={<Icon name="lock" size={24} color={Secondary} />}
          />
          <Input
            onChangeText={text => handleChange('companyDescription', text)}
            multiline={true}
            numberOfLines={5}
            placeholder="company Description"
            errorStyle={{color: 'red'}}
            errorMessage=""
            value={companyDetails.companyDescription}
            leftIcon={<Icon name="lock" size={24} color={Secondary} />}
          />
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: Primary,
              width: '80%',
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
              Register Company Profile
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Card>
   
    )
}
export default CompanySignUp;