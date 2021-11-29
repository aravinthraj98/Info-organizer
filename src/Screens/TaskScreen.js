import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View, Button} from 'react-native';
import {Primary, Secondary} from '../Utils/Colors';
import {Avatar, Badge, FAB, SpeedDial} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  getAllInvite,
  getAllProjects,
  getTaskDetails,
  sendInvite,
  updateAllInvite,
  updateCompany,
} from '../Services/CrudFirestore';
import CountDown from 'react-native-countdown-component';
import {DetailContext} from '../Utils/DetailContext';
import firestore from '@react-native-firebase/firestore';
import {BottomSheet} from 'react-native-elements/dist/bottomSheet/BottomSheet';
import {Tab, TabView} from 'react-native-elements';
import TaskPanel from '../Components/TaskPanel';
import Header from '../Components/Header';

function TaskScreen({navigation}) {
  const [taskDetail, setTaskDetail] = useState([]);
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useContext(DetailContext);
  const currentTime = Date.now();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    async function getAllTask() {
      let data = await getTaskDetails(detail);
      if (data === null) {
        alert('some error occured');
        return;
      } else {
        console.log(data);
        setTaskDetail(data);
      }
    }
    getAllTask();
  }, []);
  return (
    <View style={{flex: 1, paddingTop: 10, backgroundColor: Secondary}}>
      <Header title={detail.project} navigation={navigation} />
      <Tab value={index} onChange={setIndex}>
        <Tab.Item title="tasks" titleStyle={{color: 'yellow'}} />
        <Tab.Item title="informations" titleStyle={{color: 'yellow'}} />
      </Tab>

      <TabView value={index} onChange={setIndex}>
        <TabView.Item style={{backgroundColor: 'white', width: '100%'}}>
          <TaskPanel navigation={navigation} />
        </TabView.Item>
        <TabView.Item style={{backgroundColor: 'blue', width: '100%'}}>
          <Text h1>Favorite</Text>
        </TabView.Item>
      </TabView>
    </View>
  );
}
export default TaskScreen;
