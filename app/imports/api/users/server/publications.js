import { Meteor } from 'meteor/meteor';
import Groups from '../../groups/groups';

// publish additional fields for current user
Meteor.publish('userData', function publishUserData() {
  if (this.userId) {
    return Meteor.users.find(
      { _id: this.userId },
      {
        fields: Meteor.users.selfFields,
      },
    );
  }
  return this.ready();
});

Meteor.publish('users.search', function publishFindUser({ search = '', exclude = [] }) {
  const regex = new RegExp(search, 'i');

  return Meteor.users.find(
    {
      $or: [{ _id: { $nin: exclude }, 'emails.address': { $regex: regex } }, { 'emails.address': { $eq: search } }],
    },
    { limit: 5, sort: { 'emails.address': 1 }, fields: { firstName: 1, lastName: 1, avatar: 1, emails: 1 } },
  );
});

Meteor.publish('users.groups', function publishUserFromGroup({ groupsIds = [] }) {
  const groups = Groups.find({ _id: { $in: groupsIds } }).fetch();
  const userIds = groups.reduce(
    (users, { admins, animators, members }) => [...users, ...admins, ...animators, ...members],
    [],
  );
  return Meteor.users.find(
    { _id: { $in: userIds } },
    { limit: 500, sort: { 'emails.address': 1 }, fields: { firstName: 1, lastName: 1, avatar: 1, emails: 1 } },
  );
});

// Meteor.publish('users.searchAll', function () {
//   return Meteor.users.find(
//     {},
//     {
//       sort: { 'emails.address': 1 },
//       fields: { emails: 1 },
//     },
//   );
// });
