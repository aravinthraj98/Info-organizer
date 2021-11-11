import React, {useState} from 'react';
import {View} from 'react-native';
import {FAB} from 'react-native-elements';

import {BottomSheet} from 'react-native-elements/dist/bottomSheet/BottomSheet';
import AddTask from '../Components/AddTask';
import Header from '../Components/Header';
import InformationPanel from '../Components/InformationPanel';
function InformationScreen({route, navigation}) {
  const [isVisible, setIsVisible] = useState(false);

  const projectName = route.params.name;

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Header title={projectName} navigation={navigation} />
      </View>
      <View style={{flex: 9}}>
        <InformationPanel />
      </View>
      <FAB
        title="add Info"
        style={{padding: 10}}
        onPress={() => setIsVisible(true)}
      />
      <BottomSheet isVisible={isVisible} >
        <AddTask projectName={projectName} setIsVisible={setIsVisible} />
      </BottomSheet>
    </View>
  );
}
export default InformationScreen;
