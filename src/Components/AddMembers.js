import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Card, Input} from 'react-native-elements';
import {
  addEmployeeToproject,
  addNewEmployee,
  getAllEmployee,
  sendInvite,
} from '../Services/CrudFirestore';
import {Dropdown} from 'react-native-element-dropdown';
import {Primary, Secondary} from '../Utils/Colors';
import {DetailContext} from '../Utils/DetailContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './Header';
function AddMember({navigation, route}) {
  const [email, setEmail] = useState('');
  const [detail, setDetail] = useContext(DetailContext);
  const [dropDownValues, setDropDownValues] = useState([]);
  const role = route.params?.role;
  useEffect(() => {
    if (role === 'teamMember') {
      alert(role);
      getEmployee();
    }
  }, []);
  async function inviteEmployee() {
    let data = {
      id: Date.now(),
      email: email,
      description: `Invitation to join our firm`,
      status: null,
      from: detail.companyName,
    };
    let isInvite = await sendInvite(data);
    if (isInvite === true) {
      alert('invitation succesfull');
      setEmail('');
    } else {
      alert(isInvite);
    }
  }
  const getEmployee = async () => {
    let data = await getAllEmployee(detail.companyName);
    if (data == null) {
      alert('some error occured');
      return;
    }
    if (data.length == 0) {
      alert('no employee here please add employee and come back');
      navigation.goBack();

      return;
    }
    let dropData = [];
    for (let i in data) {
      let tempData = {
        label: data[i].Email,
        value: data[i].Email,
      };
      dropData.push(tempData);
    }

    setDropDownValues(dropData);
    console.log({dropData});
  };
  const addEmployee = async () => {
    let data = await addEmployeeToproject(
      email,
      role,
      detail.project,
      detail.companyName,
    );
    if (data === true) {
      alert('data added successfully');
      setEmail('');
      getEmployee();
    } else {
      alert(data);
    }
  };
  return (
    <>
      <Header title={'Invite people'} navigation={navigation} />
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: Secondary}}>
        <Card>
          <View style={{padding: 10}}>
            <Text
              style={{
                color: Secondary,
                fontSize: 25,
                padding: 10,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Add Member
            </Text>
            {role === 'teamMember' ? (
              <Dropdown
                data={dropDownValues}
                placeholder="choose lead"
                style={{color: 'white', margin: 1}}
                labelField="label"
                valueField="value"
                containerStyle={{color: Secondary, backgroundColor: 'white'}}
                // search

                // searchPlaceholder="search.."

                maxHeight={150}
                // dropdownPosition={'auto'}
                value={email}
                onChange={item => setEmail(item.value)}
              />
            ) : (
              <Input
                style={{backgroundColor: Secondary, color: Primary}}
                value={email}
                onChangeText={text => setEmail(text)}
                leftIcon={<Icon name="user-plus" size={24} color={Secondary} />}
              />
            )}
            {/* <Input
            style={{backgroundColor: Secondary, color: Primary}}
            onChangeText={text => handleChange('companyEmail', text)}
            leftIcon={<Icon name="password" size={24} color={Primary} />}
          /> */}

            <TouchableOpacity
              onPress={role !== 'teamMember' ? inviteEmployee : addEmployee}
              style={{
                backgroundColor: Primary,
                width: '60%',
                marginLeft: '25%',
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
                Invite to company
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </>
  );
}
export default AddMember;
