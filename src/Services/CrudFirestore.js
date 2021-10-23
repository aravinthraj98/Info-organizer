import React from 'react';
import {firebase, db} from '../Database/firebase';
// const db =firebase.firestore();

async function addNewCompany(
  companyName,
  companyEmail,
  password,
  companyDescription,
) {
  console.log('funcrion called');
  try {
    console.log('funcrion called 1');
    await db.collection('company').add({companyEmail, companyName});
  } catch (error) {
    console.log('funcrion called 2');
    console.log(error);
  }
}

export {addNewCompany};
