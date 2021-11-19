import React from 'react';
// import {firebase, db} from '../Database/firebase';
import {firebase} from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import {decrypt, encrypt} from './CryptoEncryptDecrypt';
firebase.app();
const db = firestore();
async function addNewLogin(companyEmail, password, role, companyName, team) {
  try {
    await db
      .collection('login')
      .add({Email: companyEmail, password, role, companyName, team});
    return true;
  } catch (error) {
    return false;
  }
}

async function addNewCompany(companyName, Email, password, companyDescription) {
  console.log('funcrion called');
  try {
    console.log('funcrion called 1');
    const data = await db
      .collection('company')
      .where('Email', '==', Email)
      .get()
      .then(querySnapShot => querySnapShot);

    if (data.size == 0) {
      password = encrypt(password);
      let isAdded = await addNewLogin(
        Email,
        password,
        'manager',
        companyName,
        null,
      );
      if (!isAdded) return 'Some error occurred';

      await db
        .collection('company')
        .add({Email, companyName, companyDescription});

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

async function addNewEmployee(data) {
  try {
    data.email = data.email.trim;
    const isData = await db
      .collection('login')
      .where('Email', '==', data.email)
      .get()
      .then(querySnapShot => querySnapShot);
    if (isData.size == 0) {
      console.log('alert here');
      let password = encrypt(data.password);
      console.log(password + 'password');
      let isAdded = await addNewLogin(data.email, password, '', '', '');
      if (!isAdded) return 'some error occured';
      return true;
    } else {
      return 'Email registered already';
    }
  } catch (error) {
    console.log(error);
    return 'some error occured please try again later';
  }
}
async function checkLogin(data) {
  const isData = await db
    .collection('login')
    .where('Email', '==', data.email)
    .get()
    .then(querySnapShot => querySnapShot);

  if (isData.size <= 0) {
    console.log('email not found');
    return {data: "email not found", authorize: false};
  }
  let isMatch = false;

  isData.forEach(snap => {
    if (decrypt(snap.data().password, data.password) === true) {
      console.log('password match successull');

      isMatch = snap.data();
    } else {
      isMatch = false;
    }
  });
  if (isMatch !==false) {
    return {data:isMatch,authorize:true};
  }

  return {data:"password misMatched", authorize: false};
}
async function addNewProject(data, type = null) {
  if (type == null) {
    type = 'projects';
  }
  try {
    // console.log('AKKKKKKKKKKKKKKKKKKK');
    await db.collection(type).add(data);

    return true;
  } catch (error) {
    console.log('firebase error');
    return 'some error occured ,try later';
  }
}
async function getAllProjects(companyName) {
  try {
    const data = await db
      .collection('projects')
      .where('companyName', '==', companyName)
      .get();
    let temp = [];
    data.docs.forEach(snapShot => {
      temp.push(snapShot.data());
    });
    console.log(temp);
    return temp;
  } catch (err) {
    console.log(err);
    return null;
  }
}
export {
  addNewCompany,
  addNewEmployee,
  addNewProject,
  getAllProjects,
  checkLogin,
};
