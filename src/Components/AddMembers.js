import React, {useContext, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Card, Input, Icon} from 'react-native-elements';
import {sendInvite} from '../Services/CrudFirestore';

import {Primary, Secondary} from '../Utils/Colors';
import {DetailContext} from '../Utils/DetailContext';
function AddMember() {
  const [email, setEmail] = useState('');
  const [detail, setDetail] = useContext(DetailContext);
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
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
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
          <Input
            style={{backgroundColor: Secondary, color: Primary}}
            value={email}
            onChangeText={text => setEmail(text)}
            leftIcon={<Icon name="add" size={24} color={Secondary} />}
          />
          {/* <Input
            style={{backgroundColor: Secondary, color: Primary}}
            onChangeText={text => handleChange('companyEmail', text)}
            leftIcon={<Icon name="password" size={24} color={Primary} />}
          /> */}

          <TouchableOpacity
            onPress={inviteEmployee}
            style={{
              backgroundColor: Primary,
              width: '50%',
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
  );
}
export default AddMember;
