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
  db,
} from '../Services/CrudFirestore';
import CountDown from 'react-native-countdown-component';
import {DetailContext} from '../Utils/DetailContext';
import firestore from '@react-native-firebase/firestore';
import {BottomSheet} from 'react-native-elements/dist/bottomSheet/BottomSheet';
import {NavigationContainer} from '@react-navigation/native';
// import { Button } from 'react-native-elements/dist/buttons/Button';
// const db = firestore();
function HomePanel({InfoPanel, handleNavigate}) {
  const [open, setOpen] = useState(false);
  const detail = [
    {projectName: 'hello', projectDeadLine: 'today', newInfo: true},
    {projectName: 'hello1', projectDeadLine: 'today', newInfo: false},
    {projectName: 'hello12', projectDeadLine: 'today', newInfo: true},
    {projectName: 'hello23', projectDeadLine: 'today', newInfo: false},
  ];
  const currentTime = Date.now();

  const [projectDetail, setProjectDetail] = useState([]);
  const [userDetail, setUserDetail] = useContext(DetailContext);
  const [invites, setInvites] = useState([]);
  useEffect(() => {
    // getProjects();
    async function getInvitation() {
      let data = await getAllInvite(userDetail.Email);
      setInvites(data);
      console.log(data);
    }
    // getProjects();
    getInvitation();
    if (userDetail.companyName != '') {
      let unsubscribe = db
        .collection('projects')
        .where('companyName', '==', userDetail.companyName);
      if (userDetail.role == 'teamLead') {
        unsubscribe = unsubscribe.where('teamLead', '==', userDetail.Email);
      } else if (userDetail.role === 'teamMember') {
        unsubscribe = unsubscribe.where(
          'projectName',
          '==',
          userDetail.project,
        );
      }

      unsubscribe = unsubscribe.onSnapshot(snap => {
        let project = [];

        snap.forEach(change => {
          let tempData = change.data();
          tempData.id = change.id;
          project.push(tempData);
        });
        setProjectDetail([...project]);
      });

      return () => {
        unsubscribe();
      };
    }
  }, []);
  async function respondInvite(status, id, companyName = '') {
    let data = await updateAllInvite(status, id, invites);

    if (data == true && status === 'accepted') {
      console.log(userDetail);
      let isUpdate = await updateCompany(userDetail.id, companyName);
      if (isUpdate == true) {
        setInvites([]);
        alert(
          'Your invitation response sent successfully,you will be logged out soon for new changes',
        );
        handleNavigate('login');
      } else {
        alert(isUpdate);
      }
    }
  }

  return (
    <View style={{flex: 1, padding: 10}}>
      <ScrollView>
        {projectDetail.map((value, index) => (
          <TouchableOpacity
            onPress={() => handleNavigate('taskScreen')}
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
                title={value.projectName.substring(0, 2).toLocaleUpperCase()}
                containerStyle={{backgroundColor: Secondary}}
                size="large"
                activeOpacity={1}
              />

              {/* {value.newInfo && (
                <Badge
                  status="warning"
                  // badgeStyle={{width: 12, height: 12}}
                  containerStyle={{
                    position: 'absolute',
                    top: 2,
                    right: 25,
                  }}
                />
              )} */}
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
                <Text style={{color: Primary}}>{value.projectName}</Text>
              </View>
              <View
                style={{
                  alignContent: 'space-between',
                  justifyContent: 'space-evenly',
                  flexDirection: 'row',
                }}>
                <Text style={{color: 'white'}}>project Name</Text>
                <Text style={{color: Primary}}>{value.projectName}</Text>
              </View>
              <View
                style={{
                  backgroundColor: Secondary,
                  marginTop: 5,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  marginHorizontal: 5,
                }}>
                <Text style={{color: 'white', textAlign: 'center'}}>
                  No of Employees: 5
                </Text>
              </View>
              <CountDown
                timetoShow={('H', 'M', 'S')}
                until={
                  (Number(new Date(value.projectDeadline)) - currentTime) / 1000
                }
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <BottomSheet
        isVisible={invites.length > 0}
        containerStyle={{
          backgroundColor: 'whitesmoke',
          flexDirection: 'column',
        }}>
        <View style={{flexDirection: 'row', padding: 2}}>
          <View style={{flex: 2, height: 60, padding: 4}}>
            <Button title="mark as read" />
          </View>
          <View
            style={{
              flex: 2,
              padding: 4,
              justifyContent: 'flex-end',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => setInvites([])}
              style={{
                height: 35,
                width: '25%',
              }}>
              <Text style={{color: 'red'}}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text
          style={{
            color: Primary,
            backgroundColor: Secondary,
            padding: 1,
            margin: 2,
          }}>
          Note:Acceptance will lead to leave your current roles and
          responsibilities
        </Text>
        {invites.map((value, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              margin: 10,
              marginBottom: 70,
            }}>
            <View style={{flex: 2}}>
              <Text style={{color: 'black'}}>
                {value.description}
                {'\n'}
              </Text>
            </View>
            <View style={{flex: 1, padding: 3}}>
              <Button
                onPress={() => respondInvite('accepted', value.id, value.from)}
                color={'green'}
                title={'accept'}
              />
            </View>
            <View style={{flex: 1, padding: 3}}>
              <Button
                onPress={() => respondInvite('rejected', value.id)}
                color={'red'}
                title={'reject'}
              />
            </View>
          </View>
        ))}
      </BottomSheet>
      <SpeedDial
        isOpen={open}
        buttonStyle={{backgroundColor: Secondary}}
        icon={{name: 'create', color: '#fff'}}
        openIcon={{name: 'close', color: '#fff'}}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}>
        <SpeedDial.Action
          buttonStyle={{backgroundColor: Primary}}
          icon={{name: 'add', color: Secondary}}
          title="Add Project"
          onPress={() => handleNavigate('addProject')}
        />
        <SpeedDial.Action
          buttonStyle={{backgroundColor: Primary}}
          icon={{name: 'people', color: Secondary}}
          title="Invite Employee"
          onPress={() => handleNavigate('addMember')}
        />
      </SpeedDial>
      {/* {userDetail.role == 'manager' && (
        <FAB
          // onPress={() => setSignUp(true)}
          onPress={handleNavigate}
          style={{justifyContent: 'flex-end'}}
          color={Primary}
          title={<Icon size={20} color={Secondary} name="plus" />}
        />
      )} */}
    </View>
  );
}

export default HomePanel;

//  async function getProjects() {
//    console.log('hello');
//    const projects = await getAllProjects(userDetail);

//    console.log('here');
//    console.log('current' + currentTime);
//    console.log({projects});
//    if (projects !== null) {
//      setProjectDetail(projects);
//      console.log(projects[0].projectDeadline);
//      console.log(projects[0]);
//      let diff = currentTime - Number(new Date(projects[0].projectDeadline));
//      console.log('diff' + diff);
//      console.log(Number(new Date(projects[0].projectDeadline) - currentTime));
//    }
//  }
