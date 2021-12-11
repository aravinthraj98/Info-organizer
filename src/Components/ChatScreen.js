import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';

function ChatScreen({navigation, name, room}) {
  const [show, setShow] = useState(false);
  useFocusEffect(() => {
    setShow(true);
    return () => setShow(false);
  });
  if (show === false) {
    return <View></View>;
  }
  return (
    <WebView
      source={{
        uri: `https://serene-headland-25597.herokuapp.com/chat.html?username=${name}&room=${room}`,
      }}
    />
  );
}

export default ChatScreen;
