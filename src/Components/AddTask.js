import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Card, Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Primary, Secondary} from '../Utils/Colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {addNewProject, getProjectEmployee} from '../Services/CrudFirestore';
import {DetailContext} from '../Utils/DetailContext';
import {NavigationContainer} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';

function AddTask({navigation}) {
  const initialState = {
    companyName: '',
    projectName: '',
    taskName: '',
    taskDescription: '',
    taskDeadline: '',
    assignedTo: '',
  };
  const [taskDetail, setTaskDetail] = useState(initialState);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [detail, setDetail] = useContext(DetailContext);
  const [dropDownValues, setDropDownValues] = useState([]);

  useEffect(() => {
    getEmployee();
  }, []);

  const getEmployee = async () => {
    let data = await getProjectEmployee(detail.project, detail.companyName);
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
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    setTaskDetail({
      ...taskDetail,
      taskDeadline: String(date),
    });
    console.log('A date has been picked: ', String(date));
    hideDatePicker();
  };
  const handleChange = (name, value) => {
    setTaskDetail({...taskDetail, [name]: value});
  };
  const handleSubmit = async () => {
    let newDetail = {...taskDetail};
    // console.log({projectName});
    newDetail.projectName = detail.project;
    newDetail.companyName = detail.companyName;
    let isAdded = await addNewProject(newDetail, 'projecttasks');
    console.log('on the wy');
    if (isAdded === true) {
      alert('Task added successfully');
      setTaskDetail({...initialState});
    } else {
      alert(isAdded);
    }
  };
  return (
    <View
      onPress={() => setIsVisible(false)}
      style={{flex: 1, justifyContent: 'center', borderRadius: 20}}>
      <Card>
        <View>
          <Text style={{textAlign: 'right'}}>
            <Icon
              onPress={() => {
                console.log('go back');
                return navigation.goBack();
              }}
              name="times"
              size={20}
              style={{color: 'red'}}
            />
          </Text>
        </View>
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
            placeholder={'task name'}
            value={taskDetail.taskName}
            onChangeText={text => handleChange('taskName', text)}
            leftIcon={<Icon name="plus" size={24} color={Secondary} />}
          />
          <Input
            style={{backgroundColor: Secondary, color: Primary}}
            multiline={true}
            numberOfLines={3}
            placeholder={'task description'}
            value={taskDetail.taskDescription}
            onChangeText={text => handleChange('taskDescription', text)}
            leftIcon={<Icon name="info-circle" size={24} color={Secondary} />}
          />
          <Button
            title="Add dead Line to the project"
            onPress={showDatePicker}
            style={{margin: 10}}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            is24Hour={true}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <Text
            style={{
              width: '80%',
              padding: 2,
              backgroundColor: Secondary,
              color: Primary,
              margin: 5,
            }}>
            Deadline:
            {taskDetail.taskDeadline}
          </Text>

          <Dropdown
            data={dropDownValues}
            placeholder="choose lead"
            style={{color: 'black', margin: 1}}
            search
            labelField="label"
            valueField="value"
            containerStyle={{color: Secondary, backgroundColor: 'white'}}
            // search

            // searchPlaceholder="search.."

            maxHeight={170}
            // dropdownPosition={'auto'}
            placeholderStyle={{color: Primary}}
            searchPlaceholder={'search'}
            selectedTextStyle={{color: 'black'}}
            value={taskDetail.assignedTo}
            onChange={item =>
              setTaskDetail({...taskDetail, assignedTo: item.value})
            }
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
export default AddTask;
