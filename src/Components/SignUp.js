import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card, Input, FAB,Button} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
import {addNewCompany} from '../Services/CrudFirestore';
import {Primary, Secondary} from '../Utils/Colors';
import CompanySignUp from './CompanySignUp';
import EmployeeSignUp from './EmployeeSignUp';
function SignUp({setSignUp}) {
    const [registerCompany,setRegisterCompany] = useState(false);
  return (
    <View style={{flex: 1}}>
     <View style={{flexDirection:"row",alignContent:"center",justifyContent:"center",padding:10}}>
       <Button title={"New Employee"} buttonStyle={{color:registerCompany?Primary:Secondary,backgroundColor:registerCompany?"transparent":Primary}} titleStyle={{color:registerCompany?Primary:"white"}} onPress={()=>setRegisterCompany(false)} />
       <Button title={"New Company"} buttonStyle={{color:!registerCompany?Primary:Secondary,backgroundColor:!registerCompany?"transparent":Primary}} titleStyle={{color:!registerCompany?Primary:"white"}}  onPress={()=>setRegisterCompany(true)} />
     </View>
    

  
     {registerCompany?<CompanySignUp />:<EmployeeSignUp />}
       
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
