import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Card, Input, Icon, Button} from 'react-native-elements';
import {Primary, Secondary} from '../Utils/Colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {addNewProject} from '../Services/CrudFirestore';

function AddProject() {
  const initialState = {
    companyName: 'Company A',
    projectName: '',
    projectDescription: '',
    projectDeadline: '',
  };
  const [projectDetail, setProjectDetail] = useState(initialState);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    setProjectDetail({
      ...projectDetail,
      projectDeadline: String(date),
    });
    console.log('A date has been picked: ', String(date));
    hideDatePicker();
  };
  const handleChange = (name, value) => {
    setProjectDetail({...projectDetail, [name]: value});
  };
  const handleSubmit = async () => {
    console.log(projectDetail);
    let isAdded = await addNewProject(projectDetail);
    if (isAdded === true) {
      alert('Project added successfully');
      setProjectDetail({...initialState});
    } else {
      alert(isAdded);
    }
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
            Add Project
          </Text>
          <Input
            style={{backgroundColor: Secondary, color: Primary}}
            placeholder={'project name'}
            value={projectDetail.projectName}
            onChangeText={text => handleChange('projectName', text)}
            leftIcon={<Icon name="add" size={24} color={Secondary} />}
          />
          <Input
            style={{backgroundColor: Secondary, color: Primary}}
            multiline={true}
            numberOfLines={3}
            placeholder={'project description'}
            value={projectDetail.projectDescription}
            onChangeText={text => handleChange('projectDescription', text)}
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
            onPress={handleSubmit}
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
