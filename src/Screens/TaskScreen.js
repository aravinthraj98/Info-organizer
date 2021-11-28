import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View, Button} from 'react-native';
import {Primary, Secondary} from '../Utils/Colors';
import {Avatar, Badge, FAB, SpeedDial} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  getAllInvite,
  getAllProjects,
  sendInvite,
  updateAllInvite,
  updateCompany,
} from '../Services/CrudFirestore';
import CountDown from 'react-native-countdown-component';
import {DetailContext} from '../Utils/DetailContext';
import firestore from '@react-native-firebase/firestore';
import {BottomSheet} from 'react-native-elements/dist/bottomSheet/BottomSheet';

function TaskScreen({navigation}) {
  const [taskDetail, setTaskDetail] = useState([]);
  const [open, setOpen] = useState(false);
  return (
    <View style={{flex: 1, padding: 10}}>
      <ScrollView>
        {taskDetail.map((value, index) => (
          <TouchableOpacity
            onPress={() => InfoPanel(value.projectName)}
            key={index}
            style={{
              flex: 1,
              backgroundColor: Secondary,
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
                <Text style={{color: 'white'}}>project Name</Text>
                <Text style={{color: Primary}}>{value.taskName}</Text>
              </View>
              <View
                style={{
                  alignContent: 'space-between',
                  justifyContent: 'space-evenly',
                  flexDirection: 'row',
                }}>
                <Text style={{color: 'white'}}>project Name</Text>
                <Text style={{color: Primary}}>{value.taskName}</Text>
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
          title="Add project"
          onPress={() => navigation.push('addTask')}
        />
        <SpeedDial.Action
          icon={{name: 'people', color: '#fff'}}
          title="invite lead"
          onPress={() => navigation.push('addMember', {role: 'teamMember'})}
        />
      </SpeedDial>
    </View>
  );
}
export default TaskScreen;
