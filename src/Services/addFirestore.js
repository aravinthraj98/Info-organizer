import React from 'react';
import {decrypt, encrypt} from './CryptoEncryptDecrypt';
import {db} from './CrudFirestore';
async function addNewLogin(companyEmail, password, role, companyName, project) {
  try {
    await db
      .collection('login')
      .doc(companyEmail)
      .set({Email: companyEmail, password, role, companyName, project});
    return true;
  } catch (error) {
    return false;
  }
}

async function addNewCompany(companyName, Email, password, companyDescription) {
  console.log('funcrion called');
  try {
    console.log('funcrion called 1');
    let data = await db
      .collection('company')
      .where('Email', '==', Email)
      .get()
      .then(querySnapShot => querySnapShot);
    if (data.size == 0) {
      data = await db
        .collection('company')
        .where('companyName', '==', companyName)
        .get()
        .then(querySnapShot => querySnapShot);
    } else {
      return 'company already registered';
    }

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
      return 'Company name already registered';
    }
  } catch (error) {
    console.log('funcrion called 2');
    console.log(error);
    return 'Some error occured please try again later';
  }
}

async function addNewEmployee(data) {
  try {
    data.Email = data.Email.trim();
    const isData = await db
      .collection('login')
      .where('Email', '==', data.Email)
      .get()
      .then(querySnapShot => querySnapShot);
    if (isData.size == 0) {
      console.log('alert here');
      let password = encrypt(data.password);
      console.log(password + 'password');
      let isAdded = await addNewLogin(data.Email, password, '', '', '');
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

async function addNewProject(data, type = null) {
  if (type == null) {
    type = 'projects';
  }
  try {
    // console.log('AKKKKKKKKKKKKKKKKKKK');
    let infoData = {
      companyName: data.companyName,
      time: Date.now(),
      description: '',
      type: type === 'projects' ? 'General' : data.projectName,
    };
    if (type === 'projects') {
      infoData.description =
        'A new project started named as' + data.projectName;
    } else {
      infoData.description =
        'A new task created as' +
        data.taskName +
        ' and assigned to ' +
        data.assignedTo;
    }

    await db.collection('information').add(infoData);
    await db.collection(type).add(data);

    return true;
  } catch (error) {
    console.log('firebase error');
    return 'some error occured ,try later';
  }
}
async function addEmployeeToproject(email, role, project, companyName) {
  try {
    await db.collection('login').doc(email).update({role, project});
    await db.collection('information').add({
      companyName,
      description: `Employee ${email} joined ${project} as ${role}`,
      type: project,
      time: Date.now(),
    });
    return true;
  } catch (err) {
    console.log(err);
    return 'some error occured';
  }
}
async function sendInvite(data) {
  try {
    await db.collection('invites').add(data);
    return true;
  } catch (err) {
    console.log(err);
    return 'some error occured while sending info';
  }
}

export {
  addNewLogin,
  addNewCompany,
  addNewEmployee,
  addNewProject,
  addEmployeeToproject,
  sendInvite,
};
