import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Card, Input, Icon, Button} from 'react-native-elements';
import {Primary, Secondary} from '../Utils/Colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function AddProject() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    console.log('A date has been picked: ', new Date(String(date)).getDate());
    hideDatePicker();
  };
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
            placeholder={'project name'}
            // onChangeText={text => handleChange('companyEmail', text)}
            leftIcon={<Icon name="add" size={24} color={Secondary} />}
          />
          <Input
            style={{backgroundColor: Secondary, color: Primary}}
            placeholder={'project descriptiton'}
            // onChangeText={text => handleChange('companyEmail', text)}
            leftIcon={<Icon name="add" size={24} color={Secondary} />}
          />
          <Button
            title="Add dead Line to the project"
            onPress={showDatePicker}
            style={{margin: 10}}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            is24Hour={true}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          {/* <Input
            style={{backgroundColor: Secondary, color: Primary}}
            onChangeText={text => handleChange('companyEmail', text)}
            leftIcon={<Icon name="password" size={24} color={Primary} />}
          /> */}

          <TouchableOpacity
            // onPress={handleSubmit}
            style={{
              backgroundColor: Primary,
              width: '50%',
              marginLeft: '25%',
              marginTop: 20,

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
              ADD
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
}
export default AddProject;
