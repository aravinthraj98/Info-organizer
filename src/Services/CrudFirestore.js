import React from 'react';
// import {firebase, db} from '../Database/firebase';
import {firebase} from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
firebase.app();
const db = firestore();
async function addNewLogin(companyEmail, password, role) {
  try {
    await db.collection('login').add({companyEmail, password, role});
    return true;
  } catch (error) {
    return false;
  }
}

async function addNewCompany(
  companyName,
  companyEmail,
  password,
  companyDescription,
) {
  console.log('funcrion called');
  try {
    console.log('funcrion called 1');
    const data = await db
      .collection('company')
      .where('companyEmail', '==', companyEmail)
      .get()
      .then(querySnapShot => querySnapShot);

    if (data.size == 0) {
      let isAdded = await addNewLogin(companyEmail, password, 'manager');
      if (!isAdded) return 'Some error occurred';

      await db
        .collection('company')
        .add({companyEmail, companyName, companyDescription});

      return true;
    } else {
      return 'Company email already registered';
    }
  } catch (error) {
    console.log('funcrion called 2');
    console.log(error);
    return 'Some error occured please try again later';
  }
}

export {addNewCompany};
