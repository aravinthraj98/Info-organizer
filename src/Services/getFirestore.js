import {decrypt, encrypt} from './CryptoEncryptDecrypt';
import {db} from './CrudFirestore';
async function getAllProjects(userDetail) {
  try {
    const project = db.collection('projects');

    console.log({userDetail});
    let projectDetail = project.where(
      'companyName',
      '==',
      userDetail.companyName,
    );
    if (userDetail.role !== 'manager') {
      console.log('heree inside');
      projectDetail = projectDetail.where(
        'projectName',
        '==',
        userDetail.project,
      );
    }
    data = await projectDetail.get().then(snap => snap);
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

async function checkLogin(data) {
  const isData = await db
    .collection('login')
    .where('Email', '==', data.email)
    .get()
    .then(querySnapShot => querySnapShot);

  if (isData.size <= 0) {
    console.log('email not found');
    return {data: 'email not found', authorize: false};
  }
  let isMatch = false;

  isData.forEach(snap => {
    if (decrypt(snap.data().password, data.password) === true) {
      console.log('password match successull');
      let tempData = snap.data();
      tempData.id = snap.id;

      isMatch = tempData;
    } else {
      isMatch = false;
    }
  });
  if (isMatch !== false) {
    return {data: isMatch, authorize: true};
  }

  return {data: 'password misMatched', authorize: false};
}
async function getAllInvite(email) {
  try {
    console.log('Invitations');
    let invites = await db
      .collection('invites')
      .where('email', '==', email)
      .where('status', '==', null)
      .get()
      .then(snap => snap);
    let data = [];
    invites.forEach(snap => {
      let tempData = snap.data();
      tempData.id = snap.id;
      data.push(tempData);
    });
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
async function getAllEmployee(companyName) {
  try {
    console.log({companyName});
    let data = await db
      .collection('login')
      .where('role', '==', '')
      .where('companyName', '==', companyName)
      .get()
      .then(snap => snap);
    let newData = [];
    data.forEach(snap => {
      let tempData = snap.data();
      tempData.id = snap.id;
      newData.push(tempData);
    });
    return newData;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getProjectEmployee(project, companyName) {
  try {
    let data = await db
      .collection('login')
      .where('companyName', '==', companyName)
      .where('project', '==', project)
      .get()
      .then(snap => snap);
    let newData = [];
    data.forEach(snap => {
      newData.push(snap.data());
    });
    return newData;
  } catch (err) {
    console.log(err);
    return null;
  }
}
async function getTaskDetails(detail) {
  try {
    let data = await db
      .collection('projecttasks')
      .where('assignedTo', '==', detail.Email)
      .get()
      .then(snap => snap);
    let newData = [];
    data.forEach(snap => {
      let tempData = snap.data();
      tempData.id = snap.id;
      newData.push(tempData);
    });
    return newData;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export {
  getAllProjects,
  checkLogin,
  getAllInvite,
  getAllEmployee,
  getProjectEmployee,
  getTaskDetails,
};
