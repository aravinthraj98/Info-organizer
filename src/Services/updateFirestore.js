import {db} from './CrudFirestore';
async function updateAllInvite(status, id, invites) {
  try {
    if (id != null) await db.collection('invites').doc(id).update({status});

    if (status != 'accepted') return true;
    for (i in invites) {
      if (id != null && invites[i].id == id) continue;
      await db
        .collection('invites')
        .doc(invites[i].id)
        .update({status: 'pending'});
    }
    return true;
  } catch (err) {
    console.log(err);
    return 'Some error occured';
  }
}
async function updateCompany(id, companyName) {
  try {
    await db.collection('login').doc(id).update({companyName});
    await db.collection('information').add({
      companyName,
      type: 'General',
      time: Date.now(),
      description: `New employee ${id} joined to our company`,
    });
    return true;
  } catch (err) {
    console.log(err);
    return 'some error occured';
  }
}
async function UpdateProjectLead(companyName, project, teamLead) {
  try {
    await db
      .collection('login')
      .doc(teamLead)
      .update({role: 'teamLead', project});
    await db.collection('information').add({
      companyName,
      type: 'General',
      time: Date.now(),
      description: `Employee ${teamLead} assigned as teamLead for project ${project} `,
    });

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export {updateAllInvite, updateCompany, UpdateProjectLead};
