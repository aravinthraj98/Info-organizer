import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import Header from '../Components/Header';
import HomePanel from '../Components/HomePanel';
import {Primary, Secondary} from '../Utils/Colors';

function Home() {
  return (
    <View style={{flex: 1, backgroundColor: Secondary}}>
      <View style={{flex: 10, backgroundColor: Secondary}}>
        <HomePanel />
      </View>
      <View style={{flex: 1, width: '100%'}}>
        <Header />
      </View>
    </View>
  );
}
export default Home;
