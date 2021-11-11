import React from 'react';
import {View, Text} from 'react-native';
import {FAB} from 'react-native-elements';
import {Primary, Secondary} from '../Utils/Colors';
function InformationPanel() {
  const data = [
    {
      TaskName: 'Designing',
      deadline: 'today',
    },
    {
      TaskName: 'Api',
      deadline: 'Tommorrow',
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: 'lightblue'}}>
      {data.map((value, index) => (
        <View
          style={{
            backgroundColor: Secondary,
            padding: 10,
            margin: 5,
            borderRadius: 100,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'white', width: '50%', textAlign: 'center'}}>
              TaskName{' '}
            </Text>
            <Text style={{color: Primary}}>{value.TaskName}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'white', width: '50%', textAlign: 'center'}}>
              deadline
            </Text>
            <Text style={{color: Primary}}>{value.deadline}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
export default InformationPanel;
