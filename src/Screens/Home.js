import React, {useContext} from 'react';
import {Text, View, ScrollView} from 'react-native';
import Header from '../Components/Header';
import HomePanel from '../Components/HomePanel';
import {Primary, Secondary} from '../Utils/Colors';
import {DetailContext} from '../Utils/DetailContext';

function Home({navigation}) {
  const InfoPanel = name => {
    console.log('name' + name);
    navigation.push('Information', {
      name,
    });
  };
  const [detail, setDetail] = useContext(DetailContext);
  console.log('detiaaa are');
  console.log({detail});
  function handleNavigate(name) {
    navigation.push(name);
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
