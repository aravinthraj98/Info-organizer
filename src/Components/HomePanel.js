import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Primary, Secondary} from '../Utils/Colors';
import {Avatar, Badge, FAB} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getAllProjects} from '../Services/CrudFirestore';
import CountDown from 'react-native-countdown-component';
function HomePanel({InfoPanel, handleNavigate}) {
  const detail = [
    {projectName: 'hello', projectDeadLine: 'today', newInfo: true},
    {projectName: 'hello1', projectDeadLine: 'today', newInfo: false},
    {projectName: 'hello12', projectDeadLine: 'today', newInfo: true},
    {projectName: 'hello23', projectDeadLine: 'today', newInfo: false},
  ];
  const currentTime = Date.now();

  const [projectDetail, setProjectDetail] = useState([]);
  useEffect(() => {
    async function getProjects() {
      console.log('hello');
      const projects = await getAllProjects('Company A');

      // console.log();
      // console.log('current' + currentTime);
      if (projects !== null) {
        setProjectDetail(projects);
        console.log(projects[0].projectDeadline);
        console.log(projects[0]);
        // let diff = currentTime - Number(new Date(projects[0].projectDeadline));
        // console.log('diff' + diff);
        // console.log(
        //   Number(new Date(projects[0].projectDeadline) - currentTime),
        // );
      }
    }

    getProjects();
  }, []);

  return (
    <View style={{flex: 1, padding: 10}}>
      <ScrollView>
        {projectDetail.map((value, index) => (
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
                title={value.projectName.substring(0, 2).toLocaleUpperCase()}
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
      <FAB
        // onPress={() => setSignUp(true)}
        onPress={handleNavigate}
        style={{justifyContent: 'flex-end'}}
        color={Primary}
        title={<Icon size={20} color={Secondary} name="plus" />}
      />
    </View>
  );
}

export default HomePanel;
