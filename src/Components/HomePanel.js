import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Primary, Secondary} from '../Utils/Colors';
function HomePanel() {
  const detail = [
    {projectName: 'hello', projectDeadLine: 'today', newInfo: true},
    {projectName: 'hello1', projectDeadLine: 'today', newInfo: false},
    {projectName: 'hello12', projectDeadLine: 'today', newInfo: true},
    {projectName: 'hello23', projectDeadLine: 'today', newInfo: false},
  ];

  return (
    <View style={{flex: 1, padding: 10}}>
      <ScrollView>
        {detail.map((value, index) => (
          <View
            style={{
              backgroundColor: 'white',

              margin: 5,
              marginVertical: 10,
              minHeight: 0,
              borderRadius: 10,

              borderColor: 'white',
            }}>
            <View
              style={{
                alignContent: 'space-between',
                justifyContent: 'space-evenly',
                flexDirection: 'row',
                padding: 5,
              }}>
              <Text style={{color: 'black'}}>project Name</Text>
              <Text style={{color: Secondary}}>{value.projectName}</Text>
            </View>
            <View
              style={{
                alignContent: 'space-between',
                justifyContent: 'space-evenly',
                flexDirection: 'row',
              }}>
              <Text style={{color: 'black'}}>project Name</Text>
              <Text style={{color: Secondary}}>{value.projectName}</Text>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                marginTop: 5,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                marginHorizontal: 5,
              }}>
              <Text>No of Employees: 5</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
export default HomePanel;
