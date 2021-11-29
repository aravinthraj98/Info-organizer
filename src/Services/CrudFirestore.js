import React from 'react';
// import {firebase, db} from '../Database/firebase';
import {firebase} from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import {
  // addNewLogin,
  addNewCompany,
  addNewEmployee,
  addNewProject,
  addEmployeeToproject,
  sendInvite,
} from './addFirestore';
import {
  updateAllInvite,
  updateCompany,
  UpdateProjectLead,
} from './updateFirestore';
import {
  getAllProjects,
  checkLogin,
  getAllInvite,
  getAllEmployee,
  getProjectEmployee,
  getTaskDetails,
} from './getFirestore';
firebase.app();
const db = firestore();

export {
  db,
  addNewCompany,
  addNewEmployee,
  addNewProject,
  getAllProjects,
  checkLogin,
  sendInvite,
  getAllInvite,
  updateAllInvite,
  updateCompany,
  getAllEmployee,
  UpdateProjectLead,
  addEmployeeToproject,
  getProjectEmployee,
  getTaskDetails,
};
// async function addNewLogin(companyEmail, password, role, companyName, project) {
//   try {
//     await db
//       .collection('login')
//       .doc(companyEmail)
//       .set({Email: companyEmail, password, role, companyName, project});
//     return true;
//   } catch (error) {
//     return false;
//   }
// }

// async function addNewCompany(companyName, Email, password, companyDescription) {
//   console.log('funcrion called');
//   try {
//     console.log('funcrion called 1');
//     let data = await db
//       .collection('company')
//       .where('Email', '==', Email)
//       .get()
//       .then(querySnapShot => querySnapShot);
//     if (data.size == 0) {
//       data = await db
//         .collection('company')
//         .where('companyName', '==', companyName)
//         .get()
//         .then(querySnapShot => querySnapShot);
//     } else {
//       return 'company already registered';
//     }

//     if (data.size == 0) {
//       password = encrypt(password);
//       let isAdded = await addNewLogin(
//         Email,
//         password,
//         'manager',
//         companyName,
//         null,
//       );
//       if (!isAdded) return 'Some error occurred';

//       await db
//         .collection('company')
//         .add({Email, companyName, companyDescription});

//       return true;
//     } else {
//       return 'Company name already registered';
//     }
//   } catch (error) {
//     console.log('funcrion called 2');
//     console.log(error);
//     return 'Some error occured please try again later';
//   }
// }

// async function addNewEmployee(data) {
//   try {
//     data.Email = data.Email.trim();
//     const isData = await db
//       .collection('login')
//       .where('Email', '==', data.Email)
//       .get()
//       .then(querySnapShot => querySnapShot);
//     if (isData.size == 0) {
//       console.log('alert here');
//       let password = encrypt(data.password);
//       console.log(password + 'password');
//       let isAdded = await addNewLogin(data.Email, password, '', '', '');
//       if (!isAdded) return 'some error occured';
//       return true;
//     } else {
//       return 'Email registered already';
//     }
//   } catch (error) {
//     console.log(error);
//     return 'some error occured please try again later';
//   }
// }
// async function checkLogin(data) {
//   const isData = await db
//     .collection('login')
//     .where('Email', '==', data.email)
//     .get()
//     .then(querySnapShot => querySnapShot);

//   if (isData.size <= 0) {
//     console.log('email not found');
//     return {data: 'email not found', authorize: false};
//   }
//   let isMatch = false;

//   isData.forEach(snap => {
//     if (decrypt(snap.data().password, data.password) === true) {
//       console.log('password match successull');
//       let tempData = snap.data();
//       tempData.id = snap.id;

//       isMatch = tempData;
//     } else {
//       isMatch = false;
//     }
//   });
//   if (isMatch !== false) {
//     return {data: isMatch, authorize: true};
//   }

//   return {data: 'password misMatched', authorize: false};
// }
// async function addNewProject(data, type = null) {
//   if (type == null) {
//     type = 'projects';
//   }
//   try {
//     // console.log('AKKKKKKKKKKKKKKKKKKK');
//     await db.collection(type).add(data);

//     return true;
//   } catch (error) {
//     console.log('firebase error');
//     return 'some error occured ,try later';
//   }
// }
// async function getAllProjects(userDetail) {
//   try {
//     const project = db.collection('projects');

//     console.log({userDetail});
//     let projectDetail = project.where(
//       'companyName',
//       '==',
//       userDetail.companyName,
//     );
//     if (userDetail.role !== 'manager') {
//       console.log('heree inside');
//       projectDetail = projectDetail.where(
//         'projectName',
//         '==',
//         userDetail.project,
//       );
//     }
//     data = await projectDetail.get().then(snap => snap);
//     let temp = [];
//     data.docs.forEach(snapShot => {
//       temp.push(snapShot.data());
//     });
//     console.log(temp);
//     return temp;
//   } catch (err) {
//     console.log(err);
//     return null;
//   }
// }

// async function sendInvite(data) {
//   try {
//     await db.collection('invites').add(data);
//     return true;
//   } catch (err) {
//     console.log(err);
//     return 'some error occured while sending info';
//   }
// }
// async function getAllInvite(email) {
//   try {
//     console.log('Invitations');
//     let invites = await db
//       .collection('invites')
//       .where('email', '==', email)
//       .where('status', '==', null)
//       .get()
//       .then(snap => snap);
//     let data = [];
//     invites.forEach(snap => {
//       let tempData = snap.data();
//       tempData.id = snap.id;
//       data.push(tempData);
//     });
//     return data;
//   } catch (err) {
//     console.log(err);
//     return null;
//   }
// }
// async function updateAllInvite(status, id, invites) {
//   try {
//     if (id != null) await db.collection('invites').doc(id).update({status});

//     if (status != 'accepted') return true;
//     for (i in invites) {
//       if (id != null && invites[i].id == id) continue;
//       await db
//         .collection('invites')
//         .doc(invites[i].id)
//         .update({status: 'pending'});
//     }
//     return true;
//   } catch (err) {
//     console.log(err);
//     return 'Some error occured';
//   }
// }
// async function updateCompany(id, companyName) {
//   try {
//     await db.collection('login').doc(id).update({companyName});
//     return true;
//   } catch (err) {
//     console.log(err);
//     return 'some error occured';
//   }
// }
// async function getAllEmployee(companyName) {
//   try {
//     console.log({companyName});
//     let data = await db
//       .collection('login')
//       .where('role', '==', '')
//       .where('companyName', '==', companyName)
//       .get()
//       .then(snap => snap);
//     let newData = [];
//     data.forEach(snap => {
//       let tempData = snap.data();
//       tempData.id = snap.id;
//       newData.push(tempData);
//     });
//     return newData;
//   } catch (err) {
//     console.log(err);
//     return null;
//   }
// }
// async function getProjectEmployee(project, companyName) {
//   try {
//     let data = await db
//       .collection('login')
//       .where('companyName', '==', companyName)
//       .where('project', '==', project)
//       .get()
//       .then(snap => snap);
//     let newData = [];
//     data.forEach(snap => {
//       newData.push(snap.data());
//     });
//     return newData;
//   } catch (err) {
//     console.log(err);
//     return null;
//   }
// }

// async function getTaskDetails(detail) {
//   try {
//     let data = await db
//       .collection('projecttasks')
//       .where('assignedTo', '==', detail.Email)
//       .get()
//       .then(snap => snap);
//     let newData = [];
//     data.forEach(snap => {
//       let tempData = snap.data();
//       tempData.id = snap.id;
//       newData.push(tempData);
//     });
//     return newData;
//   } catch (err) {
//     console.log(err);
//     return null;
//   }
// }
// async function UpdateProjectLead(project, teamLead) {
//   try {
//     await db
//       .collection('login')
//       .doc(teamLead)
//       .update({role: 'teamLead', project});
//     return true;
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// }
// async function addEmployeeToproject(email, role, project) {
//   try {
//     await db.collection('login').doc(email).update({role, project});
//     return true;
//   } catch (err) {
//     console.log(err);
//     return 'some error occured';
//   }
// }
