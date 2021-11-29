import React, {useContext, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {ListItem} from 'react-native-elements';
import {db} from '../Services/CrudFirestore';
import {DetailContext} from '../Utils/DetailContext';

function InfoPanel({type}) {
  const [detail, setDetail] = useContext(DetailContext);
  const [infoList, setInfoList] = useState([]);

  useEffect(() => {
    let unsubscribe = db
      .collection('information')
      .where('companyName', '==', detail.companyName)
      .where('type', '==', type);

    unsubscribe = unsubscribe.onSnapshot(snap => {
      let newData = [];

      snap.docChanges().forEach(change => {
        if (change.type === 'added') {
          let tempData = change.doc.data();
          tempData.id = change.doc.id;
          newData.push(tempData);
        }
      });

      setInfoList([...newData, ...infoList]);
    });
    return () => unsubscribe();
  }, []);
  return (
    <ScrollView style={{flex: 1}}>
      {infoList.map((l, i) => (
        <ListItem key={i} bottomDivider>
          {/* <Avatar source={{uri: l.avatar_url}} /> */}
          <ListItem.Content>
            <ListItem.Title>{l.description}</ListItem.Title>
            <ListItem.Subtitle>
              {new Date(l.time).toTimeString()}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </ScrollView>
  );
}
export default InfoPanel;
