import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Card, Input, Icon, Button} from 'react-native-elements';
import {Primary, Secondary} from '../Utils/Colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {addNewProject, getAllEmployee} from '../Services/CrudFirestore';
import {DetailContext} from '../Utils/DetailContext';
import {Dropdown} from 'react-native-element-dropdown';

function AddProject() {
  const initialState = {
    companyName: 'Company A',
    projectName: '',
    projectDescription: '',
    projectDeadline: '',
    teamLead: '',
  };
  useEffect(() => {
    getEmployee();
  }, []);
  const [companyDetail, setCompanyDetail] = useContext(DetailContext);
  const [projectDetail, setProjectDetail] = useState(initialState);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dropDownValues, setDropDownValues] = useState([]);
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
  const getEmployee = async () => {
    let data = await getAllEmployee(companyDetail.companyName);
    if (data == null) {
      alert('some error occured');
      return;
    }
    if (data.length == 0) {
      alert('no employee here please add employee and come back');
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
  const handleSubmit = async () => {
    console.log(projectDetail);
    let newDetail = {...projectDetail};
    newDetail.companyName = companyDetail.companyName;
    let isAdded = await addNewProject(newDetail);
    if (isAdded === true) {
      alert('Project added successfully');
      setProjectDetail({...initialState});
    } else {
      alert(isAdded);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', backgroundColor: Primary}}>
      <Card>
        <View style={{padding: 10, backgroundColor: Secondary}}>
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
            leftIcon={<Icon name="add" size={24} color={Primary} />}
          />
          <Input
            style={{backgroundColor: Secondary, color: Primary}}
            multiline={true}
            numberOfLines={3}
            placeholder={'project description'}
            value={projectDetail.projectDescription}
            onChangeText={text => handleChange('projectDescription', text)}
            leftIcon={<Icon name="add" size={24} color={Primary} />}
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
          <Text
            style={{
              backgroundColor: 'white',
              color: 'black',
              padding: 10,
              margin: 5,
            }}>
            DeadLine Added:{'\n'}
            {projectDetail.projectDeadline}
          </Text>
          {/* <Input
            style={{backgroundColor: Secondary, color: Primary}}
            onChangeText={text => handleChange('companyEmail', text)}
            leftIcon={<Icon name="password" size={24} color={Primary} />}
          /> */}
          <Dropdown
            data={dropDownValues}
            placeholder="choose lead"
            style={{color: 'black', margin: 1}}
            labelField="label"
            valueField="value"
            containerStyle={{color: Secondary, backgroundColor: Secondary}}
            // search

            // searchPlaceholder="search.."

            maxHeight={150}
            // dropdownPosition={'auto'}
            value={projectDetail.teamLead}
            onChange={item =>
              setProjectDetail({...projectDetail, teamLead: item.value})
            }
          />

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
