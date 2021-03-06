import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View, Button} from 'react-native';
import {Primary, Secondary} from '../Utils/Colors';
import {Avatar, Badge, FAB, SpeedDial} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  db,
  getAllInvite,
  getAllProjects,
  getTaskDetails,
  sendInvite,
  updateAllInvite,
  updateCompany,
} from '../Services/CrudFirestore';
import CountDown from 'react-native-countdown-component';
import {DetailContext} from '../Utils/DetailContext';

function TaskPanel({navigation}) {
  const [taskDetail, setTaskDetail] = useState([]);
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useContext(DetailContext);
  const [currentTime, setCurrentTime] = useState(Date.now());
  useEffect(() => {
    // async function getAllTask() {

    //   let data = await getTaskDetails(detail);
    //   if (data === null) {
    //     alert('some error occured');
    //     return;
    //   } else {
    //     console.log(data);
    //     setTaskDetail(data);
    //   }
    // }
    // getAllTask();
    console.log('hello panel screen');
    setCurrentTime(Date.now());
    // setTaskDetail([]);
    var unsubscribe = db
      .collection('projecttasks')
      .where('companyName', '==', detail.companyName)
      .where('projectName', '==', detail.project);
    if (detail.role === 'teamMember') {
      unsubscribe = unsubscribe.where('assignedTo', '==', detail.Email);
    }
    unsubscribe = unsubscribe.onSnapshot(snap => {
      let newData = [];

      snap.forEach(change => {
        let tempData = change.data();
        tempData.id = change.id;
        newData.push(tempData);
      });
      console.log('here it came');
      // setTaskDetail([...newData, ...taskDetail]);
      setTaskDetail(newData);
      console.log([...newData, ...taskDetail]);
    });
    return () => unsubscribe();
  }, []);
  return (
    <View style={{flex: 1, padding: 5}}>
      {taskDetail.map((value, index) => (
        <View
          style={{
            minHeight: 110,
            padding: 5,
            margin: 5,
            backgroundColor: 'whitesmoke',
            borderRadius: 10,
          }}>
          <View style={{flex: 3}}>
            <View
              style={{
                // alignContent: 'space-between',
                // justifyContent: 'space-evenly',
                flexDirection: 'row',
              }}>
              <Text style={{color: Secondary}}>taskName:</Text>
              <Text style={{color: Secondary, fontWeight: 'bold'}}>
                {value.taskName}
              </Text>
            </View>
            <View
              style={{
                // alignContent: 'space-between',
                // justifyContent: 'space-evenly',
                flexDirection: 'row',
              }}>
              <Text style={{color: Secondary}}>taskTo: </Text>
              <Text style={{color: Secondary, fontWeight: 'bold'}}>
                {value.assignedTo}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: Secondary,
                marginTop: 5,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                marginHorizontal: 5,
              }}></View>
            <CountDown
              timetoShow={('H', 'M', 'S')}
              // running
              // digitStyle={{backgroundColor: 'lightblue'}}
              until={
                (Number(new Date(value.taskDeadline)) - currentTime) / 1000
              }
            />
          </View>
        </View>
      ))}
      <SpeedDial
        isOpen={open}
        buttonStyle={{backgroundColor: Secondary}}
        icon={{name: 'create', color: '#fff'}}
        openIcon={{name: 'close', color: '#fff'}}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}>
        <SpeedDial.Action
          icon={{name: 'add', color: '#fff'}}
          title="Add Task"
          onPress={() => navigation.push('addTask')}
        />
        <SpeedDial.Action
          icon={{name: 'people', color: '#fff'}}
          title="Add Team Member"
          onPress={() => navigation.push('addMember', {role: 'teamMember'})}
        />
      </SpeedDial>
    </View>
  );
  return (
    <View style={{flex: 1}}>
      <Text>task</Text>
      <ScrollView>
        {taskDetail.map((value, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flex: 1,
              backgroundColor:
                value.assignedTo === detail.Email ? 'lightgreen' : 'white',
              padding: 10,
              margin: 5,
              marginVertical: 10,
              minHeight: 70,
              flexDirection: 'row',
              borderRadius: 10,
            }}>
            <View style={{flex: 1}}>
              <Avatar
                rounded
                titleStyle={{color: Primary, fontSize: 40, fontWeight: 'bold'}}
                title={value.taskName.substring(0, 2).toLocaleUpperCase()}
                containerStyle={{backgroundColor: Secondary}}
                size="large"
                activeOpacity={1}
              />

              {value.newInfo && (
                <Badge
                  status="warning"
                  // badgeStyle={{width: 12, height: 12}}
                  containerStyle={{
                    position: 'absolute',
                    top: 2,
                    right: 25,
                  }}
                />
              )}
            </View>
            <View style={{flex: 3}}>
              <View
                style={{
                  alignContent: 'space-between',
                  justifyContent: 'space-evenly',
                  flexDirection: 'row',
                  padding: 5,
                }}>
                <Text style={{color: Secondary}}>taskName</Text>
                <Text style={{color: Secondary, fontWeight: 'bold'}}>
                  {value.taskName}
                </Text>
              </View>
              <View
                style={{
                  alignContent: 'space-between',
                  justifyContent: 'space-evenly',
                  flexDirection: 'row',
                }}>
                <Text style={{color: Secondary}}>taskTo</Text>
                <Text style={{color: Secondary, fontWeight: 'bold'}}>
                  {value.assignedTo}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: Secondary,
                  marginTop: 5,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  marginHorizontal: 5,
                }}></View>
              <CountDown
                timetoShow={('H', 'M', 'S')}
                // running
                // digitStyle={{backgroundColor: 'lightblue'}}
                until={
                  (Number(new Date(value.taskDeadline)) - currentTime) / 1000
                }
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <SpeedDial
        isOpen={open}
        buttonStyle={{backgroundColor: Secondary}}
        icon={{name: 'create', color: '#fff'}}
        openIcon={{name: 'close', color: '#fff'}}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}>
        <SpeedDial.Action
          icon={{name: 'add', color: '#fff'}}
          title="Add Task"
          onPress={() => navigation.push('addTask')}
        />
        <SpeedDial.Action
          icon={{name: 'people', color: '#fff'}}
          title="Add Team Member"
          onPress={() => navigation.push('addMember', {role: 'teamMember'})}
        />
      </SpeedDial>
    </View>
  );
}
export default TaskPanel;
