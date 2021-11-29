import React, {useContext, useState} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
// import Header from '../Components/Header';
import HomePanel from '../Components/HomePanel';
import {Primary, Secondary} from '../Utils/Colors';
import {DetailContext} from '../Utils/DetailContext';
import {TabView, Tab, Header, ListItem} from 'react-native-elements';
import {Icon} from 'react-native-elements/dist/icons/Icon';

function Home({navigation}) {
  const InfoPanel = name => {
    console.log('name' + name);
    navigation.push('Information', {
      name,
    });
  };
  const [index, setIndex] = useState(0);
  const [detail, setDetail] = useContext(DetailContext);
  // console.log('detiaaa are');
  // console.log({detail});
  function handleNavigate(name) {
    navigation.push(name);
  }
  return (
    <View style={{flex: 1, backgroundColor: Secondary}}>
      <Header
        placement="left"
        // leftComponent={{
        //   icon: 'menu',
        //   color: '#fff',
        //   onPress: () => console.log('hellllll'),
        // }}
        centerComponent={{text: detail.companyName, style: {color: '#fff'}}}
        rightComponent={
          <TouchableOpacity
            onPress={() =>
              Alert.alert('LOGOUT ', 'Are u sure want to log out', [
                {
                  text: 'Ask me later',
                  onPress: () => console.log('Ask me later pressed'),
                },
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ])
            }
            style={{flexDirection: 'row'}}>
            <Icon name="lock" color="red"></Icon>
          </TouchableOpacity>
        }
      />

      <Tab value={index} onChange={setIndex}>
        <Tab.Item title="recent" />
        <Tab.Item title="favorite" />
        {/* <Tab.Item title="cart" /> */}
      </Tab>
      <TabView value={index} onChange={setIndex}>
        <TabView.Item style={{backgroundColor: 'red', width: '100%'}}>
          <View style={{flex: 10, backgroundColor: 'whitesmoke'}}>
            <HomePanel InfoPanel={InfoPanel} handleNavigate={handleNavigate} />
          </View>
        </TabView.Item>
        <TabView.Item style={{backgroundColor: 'blue', width: '100%'}}>
          <Text h1>Favorite</Text>
        </TabView.Item>
        <TabView.Item style={{backgroundColor: 'green', width: '100%'}}>
          <Text h1>Cart</Text>
        </TabView.Item>
      </TabView>

      {/* <View style={{flex: 1, width: '100%'}}>
        <Header />
      </View> */}
    </View>
  );
}
export default Home;
