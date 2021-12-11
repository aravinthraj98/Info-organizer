import React, {useContext, useState} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
// import Header from '../Components/Header';
import HomePanel from '../Components/HomePanel';
import {Primary, Secondary} from '../Utils/Colors';
import {DetailContext} from '../Utils/DetailContext';
import {TabView, Tab, Header, ListItem} from 'react-native-elements';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import InfoPanel from '../Components/InfoPanel';
import ChatScreen from '../Components/ChatScreen';

function Home({navigation}) {
  const [index, setIndex] = useState(0);
  const [detail, setDetail] = useContext(DetailContext);
  // console.log('detiaaa are');
  // console.log({detail});
  function handleNavigate(name) {
    console.log('navigation' + name);
    navigation.push(name);
  }
  return (
    <View style={{flex: 1, backgroundColor: Secondary}}>
      {index < 2 && (
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
                  {
                    text: 'OK',
                    onPress: () => {
                      navigation.navigate('login', {logout: true});
                    },
                  },
                ])
              }
              style={{flexDirection: 'row'}}>
              <Icon name="lock" color="red"></Icon>
            </TouchableOpacity>
          }
        />
      )}

      <Tab value={index} onChange={setIndex}>
        <Tab.Item title="Projects" />
        <Tab.Item title="info" />
        <Tab.Item title="chat" />
      </Tab>
      <TabView value={index} onChange={setIndex}>
        <TabView.Item style={{backgroundColor: 'red', width: '100%'}}>
          <View style={{flex: 10, backgroundColor: 'whitesmoke'}}>
            <HomePanel handleNavigate={handleNavigate} />
          </View>
        </TabView.Item>
        <TabView.Item style={{backgroundColor: 'white', width: '100%'}}>
          <InfoPanel type="General" />
        </TabView.Item>
        <TabView.Item style={{backgroundColor: 'white', width: '100%'}}>
          <ChatScreen
            navigation={navigation}
            room={'company@' + detail.companyName}
            name={detail.Email}
          />
        </TabView.Item>
      </TabView>

      {/* <View style={{flex: 1, width: '100%'}}>
        <Header />
      </View> */}
    </View>
  );
}
export default Home;
