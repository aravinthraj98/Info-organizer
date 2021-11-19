/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
// import {PrimaryFont} from "./src/Utils/FontFamily"

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MainScreen from './src/Navigation/MainScreen';
import Home from './src/Screens/Home';
import Login from './src/Screens/Login';
import {Primary} from './src/Utils/Colors';
import {DetailContext} from './src/Utils/DetailContext';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [detail, setDetail] = useState([]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    //   <View style={{flex:1,backgroundColor:Primary}}>
    // <Text>Hello</Text>
    //   </View>
    <DetailContext.Provider value={[detail, setDetail]}>
      <MainScreen />
    </DetailContext.Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
