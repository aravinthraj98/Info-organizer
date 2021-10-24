import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import Header from '../Components/Header';
import HomePanel from '../Components/HomePanel';
import {Primary, Secondary} from '../Utils/Colors';

function Home({navigation}) {
  const InfoPanel = name => {
    console.log('name' + name);
    navigation.push('Information', {
      name,
    });
  };
  function handleNavigate(){
     navigation.push("createLeadAndProject")
  }
  return (
    <View style={{flex: 1, backgroundColor: Secondary}}>
      <View style={{flex: 10, backgroundColor: 'whitesmoke'}}>
        <HomePanel InfoPanel={InfoPanel} handleNavigate={handleNavigate} />
      </View>
      {/* <View style={{flex: 1, width: '100%'}}>
        <Header />
      </View> */}
    </View>
  );
}
export default Home;
