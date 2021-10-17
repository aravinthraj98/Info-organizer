import React from 'react';
import {View} from 'react-native';
import Header from '../Components/Header';
import InformationPanel from '../Components/InformationPanel';
function InformationScreen({route, navigation}) {
  const projectName = route.params.name;

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Header title={projectName} navigation={navigation} />
      </View>
      <View style={{flex: 9}}>
        <InformationPanel />
      </View>
    </View>
  );
}
export default InformationScreen;
